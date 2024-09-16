import { ChallengePrimitive, CreateChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC, useEffect, useMemo, useState } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { CreateChallengeTemplate, useGetCreateChallengeTemplates } from "../../../../../../hooks/useGetCreateChallengeTemplates";
import { ActionIcon, Box, Button, Card, Center, Checkbox, Grid, Loader, Modal, NumberInput, Select, Space, Table, Text, TextInput, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { DatePickerInput } from '@mantine/dates';
import { getChallengePrizeMaxPosition, getChallengePrizeMinPosition, isPrimitiveSpecificPositionPrize, isPrimitiveThresholdPrize, isPrimitiveThresholdWithoutLimitPrize, sortPrizes } from "../../../../../_utils/challengePrizes";
import { ChallengePrizePrimitive } from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import { formatPrice, getPriceInUSD } from "../../../../../_utils/formatPrice";
import { IconCircleCheckFilled, IconPlus, IconTrash } from "@tabler/icons-react";
import { AddChallengePrizeModal } from "./AddChallengePrizeModal";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { debounce } from "../../../../../_utils/debounce";
import { useGetChallengeById } from "../../../../../../hooks/useGetChallengeById";
import { ChallengeDescriptionEditor } from "./ChallengeDescriptionEditor/ChallengeDescriptionEditor";
import { formatDateTime } from "../../../../../_utils/formatDate";

interface DraftChallengeCreatorDataProps {
    challenge: ChallengePrimitive;
    creator: UserAuthDTO;
}

export const DraftChallengeCreatorData: FC<DraftChallengeCreatorDataProps> = ({ challenge: initialChallenge, creator }) => {
    const { challenge, reloadChallenge } = useGetChallengeById({ challengeId: initialChallenge.id, initialChallenge, revalidateOnFocus: true });

    const { templates, isLoadingTemplates } = useGetCreateChallengeTemplates();
    const [isModalToSelectTemplateOpen, { close: closeModalToSelectTemplate, open: openModalToSelectTemplate }] = useDisclosure()
    const [isModalToAddPrizeOpen, { close: closeAddPrizeModal, open: openAddPrizeModal }] = useDisclosure();
    const [isUpdatingDraft, setIsUpdatingDraft] = useState(false);

    const [selectedTemplate, setSelectedTemplate] = useState<CreateChallengeTemplate | null>(null);

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
        } finally {
            setIsUpdatingDraft(false);
        }
    }

    const debouncedOnUpdateDraft = debounce(onUpdateDraft, 2000);

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
            setIsUpdatingDraft(true);
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
                <Center style={{ alignItems: 'baseline' }}>
                    <Text
                        style={{ textAlign: 'center', fontSize: "2rem", fontWeight: "bold", marginRight: '1rem' }}
                    >
                        Configure your challenge
                    </Text>

                    {
                        isUpdatingDraft
                        &&
                        <Tooltip label="Saving changes...">
                            <Loader size={18} />
                        </Tooltip>
                    }
                    {
                        !isUpdatingDraft
                        &&
                        <Tooltip label={`Updated at ${formatDateTime(challenge ? new Date(challenge.updatedAt) : new Date())}`}>
                            <IconCircleCheckFilled size={18} />
                        </Tooltip>
                    }
                </Center>

                <Box style={{ padding: '0 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                            onClick={openModalToSelectTemplate}
                            loading={isLoadingTemplates}
                            disabled={isLoadingTemplates}
                            color="indigo"
                            variant="outline"
                        >
                            Use template
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
                                                            <PrizeRow prize={prize} onRemovePrize={() => onRemovePrize(index)} isLastRow={(index + 1) === prizes.length} />
                                                        </Table.Tr>
                                                    ))}
                                                </Table.Tbody>
                                            </Table>
                                        </Table.ScrollContainer>
                                    </Center>
                                </Card>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12 }}>
                                <ChallengeDescriptionEditor onChange={(description) => form.setFieldValue('title', description)} />
                            </Grid.Col>
                        </Grid>


                        <Space h={'2rem'} />
                    </form>


                </Box>

                <Space h={'1rem'} />

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        onClick={() => { }}
                        variant="gradient"
                        disabled={isUpdatingDraft}
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

const PrizeRow: FC<{ prize: ChallengePrizePrimitive, onRemovePrize: () => void; isLastRow: boolean }> = ({ prize, onRemovePrize, isLastRow }) => {
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

                {
                    isLastRow &&
                    <Tooltip label="Remove prize">
                        <ActionIcon variant="light" aria-label="Remove prize" color="red" onClick={onRemovePrize}>
                            <IconTrash size={18} />
                        </ActionIcon>
                    </Tooltip>
                }
            </Table.Td>

        </>
    )
}

