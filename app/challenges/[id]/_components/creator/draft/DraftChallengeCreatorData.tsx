import { ChallengePrimitive, CreateChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC, useEffect, useMemo, useState } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { CreateChallengeTemplate, useGetCreateChallengeTemplates } from "../../../../../../hooks/useGetCreateChallengeTemplates";
import { ActionIcon, Button, Card, Center, Checkbox, Grid, Modal, NumberInput, Select, Space, Table, Text, Textarea, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { DatePickerInput } from '@mantine/dates';
import { getChallengePrizeMaxPosition, getChallengePrizeMinPosition, isPrimitiveSpecificPositionPrize, isPrimitiveThresholdPrize, isPrimitiveThresholdWithoutLimitPrize, sortPrizes } from "../../../../../_utils/challengePrizes";
import { ChallengePrizePrimitive } from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import { formatPrice, getPriceInUSD } from "../../../../../_utils/formatPrice";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { AddChallengePrizeModal } from "./AddChallengePrizeModal";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { debounce } from "../../../../../_utils/debounce";
import { useGetChallengeById } from "../../../../../../hooks/useGetChallengeById";

interface DraftChallengeCreatorDataProps {
    challenge: ChallengePrimitive;
    creator: UserAuthDTO;
}

export const DraftChallengeCreatorData: FC<DraftChallengeCreatorDataProps> = ({ challenge: initialChallenge, creator }) => {
    const { challenge, reloadChallenge } = useGetChallengeById({ challengeId: initialChallenge.id, initialChallenge, revalidateOnFocus: true });

    const { templates, isLoadingTemplates } = useGetCreateChallengeTemplates();
    const [isModalToSelectTemplateOpen, { close: closeModalToSelectTemplate, open: openModalToSelectTemplate }] = useDisclosure()
    const [isModalToAddPrizeOpen, { close: closeAddPrizeModal, open: openAddPrizeModal }] = useDisclosure();

    const [selectedTemplate, setSelectedTemplate] = useState<CreateChallengeTemplate | null>(null);

    const form = useForm<CreateChallengeDTO>({
        mode: 'uncontrolled',
        initialValues: {
            title: challenge?.title ?? initialChallenge.title,
            configuration: {
                ...challenge?.configuration ?? initialChallenge.configuration,
                budget: challenge?.configuration.budget ? { unit: 'USD', value: getPriceInUSD(challenge.configuration.budget) } : initialChallenge.configuration.budget
            },
        },
        onValuesChange: (values) => {
            debouncedOnUpdateDraft(initialChallenge.id, values, reloadChallenge)
        }
    });

    function onChangeTemplate(value: string | null) {
        const template = templates.find(template => template.label === value);

        setSelectedTemplate(template ?? null)
    }

    function applyTemplate() {
        if (selectedTemplate) {
            form.setValues(selectedTemplate.template);
        }

        closeModalToSelectTemplate();
    }

    function onNewPrize(newPrize: ChallengePrizePrimitive) {
        const newPrizes = [...form.getValues().configuration.prizes, newPrize];
        form.setFieldValue('configuration.prizes', sortPrizes(newPrizes))
    }

    function onRemovePrize(indexPrizeToRemove: number) {
        const newPrizes = form.getValues().configuration.prizes.filter((_, i) => i !== indexPrizeToRemove);
        form.setFieldValue('configuration.prizes', sortPrizes(newPrizes))
    }

    const prizes = useMemo(() => sortPrizes(form.getValues().configuration.prizes), [form.getValues()]);

    useEffect(() => {
        if (challenge) {
            form.setInitialValues({
                title: challenge.title,
                configuration: challenge.configuration,
            })
        }
    }, [challenge])

    return (
        <>
            <section style={{ height: 'auto' }}>
                <Center>
                    <Text
                        style={{ textAlign: 'center', padding: '0 0 20px', fontSize: "2rem", fontWeight: "bold" }}
                    >
                        Configure your challenge
                    </Text>
                </Center>

                <Card withBorder shadow="md" radius='md' padding='2rem'>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                            onClick={openModalToSelectTemplate}
                            loading={isLoadingTemplates}
                            disabled={isLoadingTemplates}
                            color="indigo"
                            variant="outline"
                        >
                            Use a template
                        </Button>
                    </div>

                    <Space h={'1rem'} />

                    <form>
                        <Grid h={'100%'} gutter={'2rem'}>
                            <Grid.Col span={{ base: 12 }}>
                                <TextInput
                                    label="Title"
                                    placeholder="Descriptive title of the challenge"
                                    key={form.key('title')}
                                    {...form.getInputProps('title')}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <DatePickerInput
                                    label="Deadline"
                                    placeholder="The challenge will be automatically closed on this date"
                                    clearable={true}
                                    key={form.key('configuration.deadline')}
                                    value={form.getValues().configuration.deadline ? new Date(form.getValues().configuration.deadline as number) : null}
                                    onChange={(value) => form.setFieldValue('configuration.deadline', value ? value.getTime() : null)}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <NumberInput
                                    label="Max. budget (USD)"
                                    placeholder="Enter the max amount of money you want to spend in prizes (USD)"
                                    prefix="$"
                                    key={form.key('configuration.budget.value')}
                                    {...form.getInputProps('configuration.budget.value')}
                                    onChange={(value) => form.setFieldValue('configuration.budget', value ? { unit: 'USD', value: +value } : null)}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <NumberInput
                                    label="Limit of participations"
                                    placeholder="Enter the max amount of participations you want to allow"
                                    key={form.key('configuration.limitOfParticipations')}
                                    {...form.getInputProps('configuration.limitOfParticipations')}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Checkbox
                                    mt="xl"
                                    label="Allow multiple participations per user"
                                    checked={form.getValues().configuration.allowMultipleParticipationsPerUser}
                                    onChange={(event) => form.setFieldValue('configuration.allowMultipleParticipationsPerUser', event.target.checked)}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12 }} mt='1rem'>
                                <Card withBorder shadow="md" >
                                    <Center>
                                        <Text
                                            style={{ textAlign: 'center', fontSize: "1.4rem", fontWeight: "bold" }}
                                        >
                                            Prizes
                                        </Text>
                                    </Center>

                                    <Space h={'1rem'} />

                                    <Center>
                                        <Button
                                            leftSection={<IconPlus size={18} />}
                                            variant='light'
                                            onClick={openAddPrizeModal}
                                        >
                                            Add prize
                                        </Button>

                                        <AddChallengePrizeModal
                                            currentPrizes={prizes}
                                            isOpened={isModalToAddPrizeOpen}
                                            onClose={closeAddPrizeModal}
                                            onNewPrize={onNewPrize}
                                        />
                                    </Center>

                                    <Space h={'1rem'} />

                                    <Center>
                                        <Table.ScrollContainer minWidth={400}>
                                            <Table verticalSpacing="md">
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th ta={'center'}>Position</Table.Th>
                                                        <Table.Th ta={'center'}>Amount</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>

                                                <Table.Tbody ta={'center'}>
                                                    {prizes.map((prize, index) => (
                                                        <Table.Tr key={index}>
                                                            <PrizeRow prize={prize} onRemovePrize={() => onRemovePrize(index)} />
                                                        </Table.Tr>
                                                    ))}
                                                </Table.Tbody>
                                            </Table>
                                        </Table.ScrollContainer>
                                    </Center>
                                </Card>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12 }}>
                                <Textarea
                                    label="Description"
                                    rows={10}
                                    resize="vertical"
                                    placeholder="Include descriptive instructions about how to participate and win the challenge prizes"
                                />
                            </Grid.Col>
                        </Grid>


                        <Space h={'2rem'} />
                    </form>


                </Card>

                <Space h={'1rem'} />

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        onClick={() => { }}
                        variant="gradient"
                        disabled={true}
                    >
                        Publish challenge
                    </Button>
                </div>
            </section >

            <Modal
                opened={isModalToSelectTemplateOpen}
                onClose={closeModalToSelectTemplate}
                title="Choose a template to apply to your challenge"
                centered
            >
                <Space h={'1rem'} />

                <Select
                    label="Available templates"
                    placeholder="Select a template"
                    data={templates.map(template => ({ label: template.label, value: template.label }))}
                    value={selectedTemplate?.label}
                    onChange={onChangeTemplate}
                />

                <Space h={'1rem'} />

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        onClick={applyTemplate}
                        color="indigo"
                        variant="filled"
                    >
                        Apply selected template
                    </Button>
                </div>
            </Modal>
        </>
    );
};

const PrizeRow: FC<{ prize: ChallengePrizePrimitive, onRemovePrize: () => void; }> = ({ prize, onRemovePrize }) => {
    const isSpecificPositionPrize = isPrimitiveSpecificPositionPrize(prize)
    const isThresholdPrize = isPrimitiveThresholdPrize(prize)
    const isThresholdWithoutLimitPrize = isPrimitiveThresholdWithoutLimitPrize(prize)

    return (
        <>
            <Table.Td>
                {isSpecificPositionPrize && `${getChallengePrizeMinPosition(prize)}`}
                {isThresholdPrize && `From ${getChallengePrizeMinPosition(prize)} to ${getChallengePrizeMaxPosition(prize)}`}
                {isThresholdWithoutLimitPrize && `From ${getChallengePrizeMinPosition(prize)} onwards`}
            </Table.Td>

            <Table.Td>
                {formatPrice(prize.amount)}
            </Table.Td>

            <Table.Td>
                <Tooltip label="Remove prize">
                    <ActionIcon variant="light" aria-label="Remove prize" color="red" onClick={onRemovePrize}>
                        <IconTrash size={18} />
                    </ActionIcon>
                </Tooltip>
            </Table.Td>

        </>
    )
}

async function onUpdateDraft(challengeId: string, draft: CreateChallengeDTO, onDraftUpdated: () => void) {
    try {
        await clientCustomFetch(API_ROUTES.CHALLENGES.EDIT_DRAFT(challengeId), {
            method: 'PUT',
            body: {
                challenge: draft,
            },
        })
        onDraftUpdated();
    } catch (error) {
        console.error('Error while saving the draft challenge', { error })
    }
}

const debouncedOnUpdateDraft = debounce(onUpdateDraft, 2000);