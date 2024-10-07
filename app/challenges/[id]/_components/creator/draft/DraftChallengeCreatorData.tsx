import {
    ChallengePrimitive,
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
import { formatPrice, getPriceInUSD } from "../../../../../_utils/formatPrice";
import {
    IconCheck,
    IconCircleCheckFilled,
    IconEdit,
    IconInfoCircle,
    IconPlus,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import { AddChallengePrizeModal } from "./AddChallengePrizeModal";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { useGetChallengeById } from "../../../../../../hooks/useGetChallengeById";
import { formatDateTime } from "../../../../../_utils/formatDate";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { EditChallengePrizeModal } from "./EditChallengePrizeModal";
import { ApplyTemplateModal } from "./ApplyTemplateModal";

interface DraftChallengeCreatorDataProps {
    challenge: ChallengePrimitive;
    creator: UserAuthDTO;
}

export const DraftChallengeCreatorData: FC<DraftChallengeCreatorDataProps> = ({
    challenge: initialChallenge,
    creator,
}) => {
    const router = useRouter();
    const [scroll] = useWindowScroll();
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    const { challenge, reloadChallenge } = useGetChallengeById({
        challengeId: initialChallenge.id,
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
    const [isPublishingChallenge, setIsPublishingChallenge] = useState(false);
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
            title: challenge?.title ?? initialChallenge.title,
            summary: challenge?.summary ?? initialChallenge.summary,
            mainObjetive:
                challenge?.mainObjetive ?? initialChallenge.mainObjetive,
            otherObjetives:
                challenge?.otherObjetives ?? initialChallenge.otherObjetives,
            requirements:
                challenge?.requirements ?? initialChallenge.requirements,
            evaluationCriteria:
                challenge?.evaluationCriteria ??
                initialChallenge.evaluationCriteria,
            contactInformation:
                challenge?.contactInformation ??
                initialChallenge.contactInformation,
            additionalComments:
                challenge?.additionalComments ??
                initialChallenge.additionalComments,
            configuration: {
                ...(challenge?.configuration ?? initialChallenge.configuration),
                budget: challenge?.configuration.budget
                    ? {
                        unit: "USD",
                        value: getPriceInUSD(challenge.configuration.budget),
                    }
                    : (
                        initialChallenge.configuration.budget ? {
                            unit: "USD",
                            value: getPriceInUSD(initialChallenge.configuration.budget),
                        } : null
                    ),
            },
        },
        onValuesChange: (values) => {
            setIsUpdatingDraft(true);
            debouncedOnUpdateDraft(
                initialChallenge.id,
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

    async function publishChallenge() {
        try {
            setIsPublishingChallenge(true);

            await clientCustomFetch(
                API_ROUTES.CHALLENGES.PUBLISH_DRAFT(initialChallenge.id),
                {
                    method: "POST",
                }
            );

            notifications.show({
                title: "Challenge published sucesfully",
                message:
                    "Now everyone is able to see the challenge! Attract more attention by sharing it in your social media, and enable new participations so participants can submit their solutions!",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "teal",
                icon: <IconCheck />,
            });

            window.scrollTo(0, 0);
            router.refresh();

            setTimeout(() => {
                router.push('?start-accepting-participants=true');
            }, 1000);

            setIsPublishingChallenge(false);
        } catch (error) {
            notifications.show({
                title: "Challenge cannot be published",
                message:
                    "Please, review that all the required fields are filled",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: "red",
                icon: <IconX />,
            });
            setIsPublishingChallenge(false);
        }
    }

    function previewPublishedChallenge() {
        window.open(`/challenges/${initialChallenge.id}/preview`, '_blank')?.focus();
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

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <DatePickerInput
                                    label="Deadline"
                                    description="If defined, the challenge will be automatically closed on this date"
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

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <NumberInput
                                    label="Max. budget"
                                    description="Max amount of money you want to spend in prizes (USD)"
                                    prefix="$"
                                    key={form.key("configuration.budget.value")}
                                    {...form.getInputProps(
                                        "configuration.budget.value"
                                    )}
                                    onChange={(value) =>
                                        form.setFieldValue(
                                            "configuration.budget",
                                            value
                                                ? { unit: "USD", value: +value }
                                                : null
                                        )
                                    }
                                />
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <NumberInput
                                    label="Limit of participations"
                                    description="Max amount of participations you want to allow. This will take into account both approved and pending of approval"
                                    min={0}
                                    key={form.key(
                                        "configuration.limitOfParticipations"
                                    )}
                                    {...form.getInputProps(
                                        "configuration.limitOfParticipations"
                                    )}
                                />
                            </Grid.Col>

                            <Grid.Col
                                span={{ base: 12, md: 4 }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
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
                                            <Table verticalSpacing="md">
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
                        disabled={isUpdatingDraft || isPublishingChallenge}
                        loading={isPublishingChallenge}
                    >
                        Preview published version
                    </Button>
                    <Button
                        onClick={publishChallenge}
                        variant="gradient"
                        disabled={isUpdatingDraft || isPublishingChallenge}
                        loading={isPublishingChallenge}
                    >
                        Publish challenge
                    </Button>
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

            <Table.Td>{formatPrice(prize.amount)}</Table.Td>

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
