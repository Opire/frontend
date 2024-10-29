import {
    ChallengeDTO,
    CreateChallengeDTO,
} from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC, useEffect, useMemo, useState } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import {
    CreateChallengeTemplate,
} from "../../../../../../hooks/useGetCreateChallengeTemplates";
import {
    ActionIcon,
    Affix,
    Alert,
    Box,
    Button,
    Card,
    Center,
    Checkbox,
    em,
    Fieldset,
    Flex,
    Grid,
    Loader,
    NumberInput,
    Space,
    Table,
    Text,
    Textarea,
    TextInput,
    Tooltip,
    Transition,
} from "@mantine/core";
import { useDebouncedCallback, useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import {
    getChallengePrizeMaxPosition,
    getChallengePrizeMinPosition,
    isPrimitiveSpecificPositionPrize,
    isPrimitiveThresholdPrize,
    isPrimitiveThresholdWithoutLimitPrize,
    sortPrizes,
} from "../../../../../_utils/challengePrizes";
import { ChallengePrizePrimitive } from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import {
    IconCircleCheckFilled,
    IconEdit,
    IconInfoCircle,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { AddChallengePrizeModal } from "./AddChallengePrizeModal";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { formatDateTime } from "../../../../../_utils/formatDate";
import { EditChallengePrizeModal } from "./EditChallengePrizeModal";
import { ApplyTemplateModal } from "./ApplyTemplateModal";
import { PublishChallengeForm } from "./PublishChallengeForm";
import { useGetChallenge } from "../../../../../../hooks/useGetChallenge";
import { PrizeDisplay } from "../../shared/PrizeDisplay";

interface DraftChallengeCreatorDataProps {
    challenge: ChallengeDTO;
    creator: UserAuthDTO;
}

export const DraftChallengeCreatorData: FC<DraftChallengeCreatorDataProps> = ({
    challenge: initialChallenge,
    creator,
}) => {
    const [scroll] = useWindowScroll();
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    const { challenge, reloadChallenge } = useGetChallenge({
        initialChallenge,
        revalidateOnFocus: true,
    });

    const [
        isModalToAddPrizeOpen,
        { close: closeAddPrizeModal, open: openAddPrizeModal },
    ] = useDisclosure();

    const [
        isModalToEditPrizeOpen,
        { close: closeEditPrizeModal, open: openEditPrizeModal },
    ] = useDisclosure();


    const [isUpdatingDraft, setIsUpdatingDraft] = useState(false);
    const [indexPrizeToUpdate, setIndexPrizeToUpdate] = useState<number | null>(
        null
    );

    const debouncedOnUpdateDraft = useDebouncedCallback(
        async (...params: Parameters<typeof onUpdateDraft>) => {
            await onUpdateDraft(...params);
            setIsUpdatingDraft(false);
        },
        2000
    );

    const form = useForm<CreateChallengeDTO>({
        mode: "uncontrolled",
        initialValues: {
            title: challenge.title,
            summary: challenge.summary,
            mainObjetive:
                challenge.mainObjetive,
            otherObjetives:
                challenge.otherObjetives,
            requirements:
                challenge.requirements,
            evaluationCriteria:
                challenge.evaluationCriteria,
            contactInformation:
                challenge.contactInformation,
            additionalComments:
                challenge.additionalComments,
            configuration: challenge.configuration,
        },
        onValuesChange: (values) => {
            setIsUpdatingDraft(true);
            debouncedOnUpdateDraft(
                challenge.id,
                values,
                reloadChallenge
            );
        },
    });

    function applyTemplate(selectedTemplate: CreateChallengeTemplate) {
        form.setValues(selectedTemplate.template);
    }

    function onNewPrize(newPrize: ChallengePrizePrimitive) {
        const newPrizes = [...form.getValues().configuration.prizes, newPrize];
        form.setFieldValue("configuration.prizes", sortPrizes(newPrizes));
    }

    function onPrizeUpdated(updatedPrize: ChallengePrizePrimitive) {
        const newPrizes = [
            ...form
                .getValues()
                .configuration.prizes.filter(
                    (_, i) => i !== indexPrizeToUpdate
                ),
            updatedPrize,
        ];

        form.setFieldValue("configuration.prizes", sortPrizes(newPrizes));
        setIndexPrizeToUpdate(null);
        closeEditPrizeModal();
    }

    function onRemovePrize(indexPrizeToRemove: number) {
        const newPrizes = form
            .getValues()
            .configuration.prizes.filter((_, i) => i !== indexPrizeToRemove);
        form.setFieldValue("configuration.prizes", sortPrizes(newPrizes));
    }

    function onEditPrize(indexPrizeToUpdate: number) {
        setIndexPrizeToUpdate(indexPrizeToUpdate);
        openEditPrizeModal();
    }

    function previewPublishedChallenge() {
        window.open(`/challenges/${challenge.id}/preview`, '_blank')?.focus();
    }

    const prizes = useMemo(
        () => sortPrizes(form.getValues().configuration.prizes),
        [form.getValues()]
    );

    const { prizeToUpdate, otherPrizes } = useMemo(() => {
        if (indexPrizeToUpdate === null) {
            return { prizeToUpdate: null, otherPrizes: prizes };
        }

        const prizeToUpdate = prizes[indexPrizeToUpdate];
        const otherPrizes = prizes.filter((_, i) => i !== indexPrizeToUpdate);

        return { prizeToUpdate, otherPrizes };
    }, [prizes, indexPrizeToUpdate]);

    useEffect(() => {
        if (challenge) {
            form.setInitialValues({
                title: challenge.title,
                summary: challenge.summary,
                mainObjetive: challenge.mainObjetive,
                otherObjetives: challenge.otherObjetives,
                requirements: challenge.requirements,
                evaluationCriteria: challenge.evaluationCriteria,
                contactInformation: challenge.contactInformation,
                additionalComments: challenge.additionalComments,
                configuration: challenge.configuration,
            });
        }
    }, [challenge]);

    return (
        <>
            <section style={{ height: "auto" }}>
                <Center>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: isMobile ? "1.4rem" : "2rem",
                            fontWeight: "bold",
                            marginRight: "1rem",
                        }}
                    >
                        Configure your challenge
                    </Text>

                    {!isUpdatingDraft && (
                        <Tooltip
                            label={`Updated at ${formatDateTime(
                                challenge
                                    ? new Date(challenge.updatedAt)
                                    : new Date()
                            )}`}
                        >
                            <IconCircleCheckFilled size={24} />
                        </Tooltip>
                    )}

                    {isUpdatingDraft && (
                        <Tooltip label="Saving changes...">
                            <Loader size={24} />
                        </Tooltip>
                    )}

                    {isUpdatingDraft &&
                        <Affix position={{ top: 16, right: isMobile ? '60px' : '80px' }}>
                            <Transition transition="slide-up" mounted={scroll.y > 10}>
                                {(transitionStyles) => (
                                    <Tooltip label="Saving changes..." style={transitionStyles}>
                                        <Loader size={24} />
                                    </Tooltip>
                                )}
                            </Transition>
                        </Affix>
                    }
                </Center>

                <Box style={{ padding: "1rem 2rem" }}>
                    <ApplyTemplateModal applyTemplate={applyTemplate} />

                    <Space h={"1rem"} />

                    <Alert
                        variant="light"
                        color="blue"
                        title="Public content"
                        icon={<IconInfoCircle />}
                    >
                        <span>
                            The content you fill in the following form{" "}
                            <strong>will be visible for everyone</strong> once
                            the challenge is published.
                        </span>

                        <p>
                            Make sure you follow our{" "}
                            <a
                                href="https://github.com/opire/.github/blob/main/CODE_OF_CONDUCT.md"
                                target="_blank"
                            >
                                code of conduct
                            </a>
                            , while ensuring you provide clear and detailed
                            information in each of the sections.
                        </p>
                    </Alert>

                    <Space h={"1rem"} />

                    <form>
                        <Grid h={"100%"} gutter={"2rem"}>
                            <Grid.Col span={{ base: 12 }}>
                                <TextInput
                                    label="Title"
                                    description="Descriptive title of the challenge"
                                    key={form.key("title")}
                                    {...form.getInputProps("title")}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <DatePickerInput
                                    label="Deadline"
                                    description="The challenge will be automatically closed on this date"
                                    clearable={true}
                                    key={form.key("configuration.deadline")}
                                    value={
                                        form.getValues().configuration.deadline
                                            ? new Date(
                                                form.getValues().configuration
                                                    .deadline as number
                                            )
                                            : null
                                    }
                                    onChange={(value) =>
                                        form.setFieldValue(
                                            "configuration.deadline",
                                            value ? value.getTime() : null
                                        )
                                    }
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <NumberInput
                                    label="Limit of participations"
                                    description="Will take into account both approved and pending of approval"
                                    min={0}
                                    key={form.key(
                                        "configuration.limitOfParticipations"
                                    )}
                                    {...form.getInputProps(
                                        "configuration.limitOfParticipations"
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 4 }}>
                                <Checkbox
                                    label="Allow multiple participations per user"
                                    description="If allowed, you may want to limit the number of participations to avoid facing an unmanageable amount of them"
                                    checked={
                                        form.getValues().configuration
                                            .allowMultipleParticipationsPerUser
                                    }
                                    onChange={(event) =>
                                        form.setFieldValue(
                                            "configuration.allowMultipleParticipationsPerUser",
                                            event.target.checked
                                        )
                                    }
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12 }} mt="1rem">
                                <Card withBorder shadow="md">
                                    <Center>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: "1.4rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Prizes
                                        </Text>
                                    </Center>

                                    <Space h={"1rem"} />

                                    <Center>
                                        <Button
                                            leftSection={<IconPlus size={18} />}
                                            variant="light"
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

                                    <Space h={"1rem"} />

                                    <Center>
                                        <Table.ScrollContainer minWidth={400}>
                                            <Table verticalSpacing="md" highlightOnHover>
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th ta={"center"}>
                                                            Position
                                                        </Table.Th>
                                                        <Table.Th ta={"center"}>
                                                            Amount
                                                        </Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>

                                                <Table.Tbody ta={"center"}>
                                                    {prizes.map(
                                                        (prize, index) => (
                                                            <Table.Tr
                                                                key={index}
                                                            >
                                                                <PrizeRow
                                                                    prize={
                                                                        prize
                                                                    }
                                                                    onRemovePrize={() =>
                                                                        onRemovePrize(
                                                                            index
                                                                        )
                                                                    }
                                                                    onEditPrize={() =>
                                                                        onEditPrize(
                                                                            index
                                                                        )
                                                                    }
                                                                    isLastRow={
                                                                        index +
                                                                        1 ===
                                                                        prizes.length
                                                                    }
                                                                />
                                                            </Table.Tr>
                                                        )
                                                    )}
                                                </Table.Tbody>
                                            </Table>
                                        </Table.ScrollContainer>
                                    </Center>
                                </Card>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12 }}>
                                <Fieldset legend="Challenge description">
                                    <Grid h={"100%"} gutter={"2rem"}>
                                        <Grid.Col span={{ base: 12 }}>
                                            <Textarea
                                                label="Introduction / brief summary"
                                                description="Explain to the potential participants what this challenge is about"
                                                withAsterisk
                                                autosize
                                                minRows={4}
                                                key={form.key("summary")}
                                                {...form.getInputProps(
                                                    "summary"
                                                )}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Main objetive"
                                                description="One-liner. What's the really important thing to do in this challenge?"
                                                withAsterisk
                                                autosize
                                                minRows={1}
                                                key={form.key("mainObjetive")}
                                                {...form.getInputProps(
                                                    "mainObjetive"
                                                )}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Other objetives"
                                                description="Nice-to-have, or things to consider, but not the essence of the challenge"
                                                autosize
                                                minRows={1}
                                                key={form.key("otherObjetives")}
                                                {...form.getInputProps(
                                                    "otherObjetives"
                                                )}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Requirements"
                                                description="What the participants need to do in order to have their solution considered as a potential winner"
                                                withAsterisk
                                                autosize
                                                minRows={4}
                                                key={form.key("requirements")}
                                                {...form.getInputProps(
                                                    "requirements"
                                                )}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Evaluation criteria"
                                                description="What will be taken into account to decide if a solution is approved and which prize does it deserve"
                                                withAsterisk
                                                autosize
                                                minRows={4}
                                                key={form.key(
                                                    "evaluationCriteria"
                                                )}
                                                {...form.getInputProps(
                                                    "evaluationCriteria"
                                                )}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Contact information"
                                                description={`Communication channels for participants to contact you in case of doubts, questions, feedback...`}
                                                placeholder={`e.g. ${creator.email}`}
                                                withAsterisk
                                                autosize
                                                minRows={2}
                                                key={form.key(
                                                    "contactInformation"
                                                )}
                                                {...form.getInputProps(
                                                    "contactInformation"
                                                )}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Textarea
                                                label="Additional comments"
                                                description="Anything you want to add in order to clarify any aspect of the challenge"
                                                autosize
                                                minRows={2}
                                                key={form.key(
                                                    "additionalComments"
                                                )}
                                                {...form.getInputProps(
                                                    "additionalComments"
                                                )}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </Fieldset>
                            </Grid.Col>
                        </Grid>

                        <Space h={"2rem"} />
                    </form>
                </Box>

                <Space h={"1rem"} />

                <div style={{ display: "flex", justifyContent: "flex-end", gap: '1rem' }}>
                    <Button
                        onClick={previewPublishedChallenge}
                        variant="light"
                        disabled={isUpdatingDraft}
                        loading={isUpdatingDraft}
                    >
                        Preview published version
                    </Button>

                    <PublishChallengeForm
                        challengeId={challenge.id}
                        isDisabled={isUpdatingDraft || !challenge?.canBePublished}
                        isLoading={isUpdatingDraft}
                    />
                </div>
            </section>

            {prizeToUpdate && (
                <EditChallengePrizeModal
                    prize={prizeToUpdate}
                    otherPrizes={otherPrizes}
                    isOpened={isModalToEditPrizeOpen}
                    onClose={closeEditPrizeModal}
                    onPrizeUpdated={onPrizeUpdated}
                />
            )}
        </>
    );
};

const PrizeRow: FC<{
    prize: ChallengePrizePrimitive;
    onRemovePrize: () => void;
    onEditPrize: () => void;
    isLastRow: boolean;
}> = ({ prize, onRemovePrize, onEditPrize, isLastRow }) => {
    const isSpecificPositionPrize = isPrimitiveSpecificPositionPrize(prize);
    const isThresholdPrize = isPrimitiveThresholdPrize(prize);
    const isThresholdWithoutLimitPrize =
        isPrimitiveThresholdWithoutLimitPrize(prize);

    return (
        <>
            <Table.Td>
                {isSpecificPositionPrize &&
                    `${getChallengePrizeMinPosition(prize)}`}
                {isThresholdPrize &&
                    `From ${getChallengePrizeMinPosition(
                        prize
                    )} to ${getChallengePrizeMaxPosition(prize)}`}
                {isThresholdWithoutLimitPrize &&
                    `From ${getChallengePrizeMinPosition(prize)} onwards`}
            </Table.Td>

            <Table.Td>
                <PrizeDisplay prize={prize} />
            </Table.Td>

            <Table.Td>
                <Flex gap={'0.6rem'}>
                    <Tooltip label="Edit prize">
                        <ActionIcon
                            variant="light"
                            aria-label="Edit prize"
                            color="blue"
                            onClick={onEditPrize}
                        >
                            <IconEdit size={18} />
                        </ActionIcon>
                    </Tooltip>
                    {isLastRow && (
                        <Tooltip label="Remove prize">
                            <ActionIcon
                                variant="light"
                                aria-label="Remove prize"
                                color="red"
                                onClick={onRemovePrize}
                            >
                                <IconTrash size={18} />
                            </ActionIcon>
                        </Tooltip>
                    )}
                </Flex>
            </Table.Td>
        </>
    );
};


async function onUpdateDraft(
    challengeId: string,
    draft: CreateChallengeDTO,
    onDraftUpdated: () => void
) {
    try {
        await clientCustomFetch(API_ROUTES.CHALLENGES.EDIT_DRAFT(challengeId), {
            method: "PUT",
            body: {
                challenge: draft,
            },
        });
        onDraftUpdated();
    } catch (error) {
        console.error("Error while saving the draft challenge", { error });
    }
}
