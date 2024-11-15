import { Center, Card, Title, Space, Alert, Table, Skeleton, Flex, Avatar, Tooltip, Badge, DefaultMantineColor, Text } from "@mantine/core";
import { IconInfoCircle, IconLineDashed } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";
import { useGetUserPublicInfoFromAnyPlatform } from "../../../../../../hooks/useGetUserPublicInfoFromAnyPlatform";
import { ChallengeParticipationPrimitive, ChallengeParticipationStatusType } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { formatDateTime } from "../../../../../_utils/formatDate";
import { CreatorActionsOnParticipation } from "./CreatorActionsOnParticipation";
import { PublishedChallengeCreatorActions } from "./PublishedChallengeCreatorActions";
import { PrizeDisplay } from "../../shared/PrizeDisplay";

export const PublishedChallengeCreatorParticipationsSection: FC<{
    challenge: ChallengeDTO;
}> = ({ challenge }) => {
    const participationsToShow = challenge.isCompleted ? challenge.participations.filter(participation => participation.status !== "paid") : challenge.participations;
    const sortedParticipations = [...participationsToShow].sort((a, b) => b.createdAt - a.createdAt);

    const isChallengeCompletelyReviewed = sortedParticipations.length === 0 && challenge.isCompleted;
    if (isChallengeCompletelyReviewed) {
        return <></>;
    }

    return (
        <Center>
            <Card withBorder shadow="md" radius='md' w={"100%"}>
                <Center>
                    <Title order={2} size="h2" ta='center' style={{ fontSize: "2.6rem", fontWeight: 900 }}>
                        {challenge.isCompleted ? "Other participations" : "Participations"}
                    </Title>
                </Center >

                <Space h={"1rem"} />

                {
                    !challenge.isCompleted &&
                    <Center>
                        <PublishedChallengeCreatorActions challenge={challenge} />
                    </Center >
                }

                <Space h={"1rem"} />

                {!challenge.isAcceptingParticipations && !challenge.isCompleted &&
                    <>
                        <Center>
                            <Alert
                                variant="light"
                                color="yellow"
                                title="Not accepting new participations"
                                icon={<IconInfoCircle />}
                            >
                                <Text>
                                    You are not accepting new participations at the moment.
                                </Text>

                                <Space h={"1rem"} />
                            </Alert>
                        </Center>
                        <Space h={"1rem"} />
                    </>
                }

                {
                    sortedParticipations.length === 0
                        ? <>
                            {challenge.isAcceptingParticipations &&
                                <Center>
                                    <Alert
                                        variant="light"
                                        color="blue"
                                        title="No participants yet"
                                        icon={<IconInfoCircle />}
                                    >
                                        <Text>
                                            No one has send their solution yet.
                                        </Text>

                                        <Text>
                                            If you want to attract the attention of the participants, you can try to share the challenge in your social media.
                                        </Text>

                                        <br />

                                        <Text>
                                            If some time passes without a single participant, maybe your challenge is too hard or the prizes are not high enough.
                                        </Text>

                                        <Text>
                                            You may need to increase the prizes (you'll need to unpublish the challenge first) or contact some potential sponsors.
                                        </Text>
                                    </Alert>
                                </Center>
                            }
                        </>
                        : <Table.ScrollContainer minWidth={500}>
                            <Table verticalSpacing="md" highlightOnHover>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Participant</Table.Th>
                                        <Table.Th>Solution</Table.Th>
                                        <Table.Th>Status</Table.Th>
                                        <Table.Th>Prize</Table.Th>
                                        <Table.Th>Solution sent at</Table.Th>
                                        <Table.Th>Actions</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>

                                <Table.Tbody>
                                    {sortedParticipations.map(participation => (
                                        <Table.Tr key={participation.id}>
                                            <ParticipationRow participation={participation} challenge={challenge} />
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Table.ScrollContainer>
                }
            </Card>
        </Center>

    );
};

const ParticipationRow: FC<{
    participation: ChallengeParticipationPrimitive;
    challenge: ChallengeDTO;
}> = ({ participation, challenge }) => {
    const {
        isLoading,
        username,
        avatarURL,
        usernameLink,
    } = useGetUserPublicInfoFromAnyPlatform({ userId: participation.userId });

    if (isLoading) {
        return (
            <Table.Td colSpan={5}>
                <Skeleton h='2rem' />
            </Table.Td>
        );
    }

    return (
        <>
            <Table.Td>
                <Flex align={"center"} gap={"5px"}>
                    <Avatar
                        src={avatarURL}
                        alt={username}
                        size='md'
                        radius='xl'
                    />
                    <Text c="dimmed" size="sm">
                        <Link href={usernameLink}>@{username}</Link>
                    </Text>
                </Flex>

            </Table.Td>

            <Table.Td>
                <Link href={participation.proposedSolution} target="_blank">
                    <Text truncate={"end"} maw={300}>
                        {participation.proposedSolution}
                    </Text>
                </Link>
            </Table.Td>

            <Table.Td miw={"180px"}>
                {
                    participation.status === "rejected"
                        ? <Tooltip
                            multiline
                            withArrow
                            transitionProps={{ duration: 300 }}
                            events={{ hover: true, touch: true, focus: false }}
                            label={
                                <div>
                                    <strong>Reason for rejection:</strong>
                                    <Space h={"0.5rem"} />
                                    <q style={{ whiteSpace: "pre-wrap" }}>
                                        {participation.reasonForRejection ?? ""}
                                    </q>
                                </div>
                            }
                        >
                            <Badge
                                leftSection={<IconInfoCircle size={14} />}
                                style={{ cursor: "help" }}
                                variant="light"
                                color={PARTICIPATION_STATUS_COLOR.rejected}
                            >
                                {PARTICIPATION_STATUS_LABEL.rejected}
                            </Badge>
                        </Tooltip>
                        : <Badge
                            variant="light"
                            color={PARTICIPATION_STATUS_COLOR[participation.status]}
                        >
                            {PARTICIPATION_STATUS_LABEL[participation.status]}
                        </Badge>
                }
            </Table.Td>

            <Table.Td>
                {
                    participation.prize
                        ? <Text variant="gradient" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                            <PrizeDisplay prize={participation.prize} />
                        </Text>
                        : <IconLineDashed />
                }
            </Table.Td>

            <Table.Td>
                {formatDateTime(new Date(participation.createdAt))}
            </Table.Td>

            <Table.Td>
                <CreatorActionsOnParticipation participation={participation} challenge={challenge} />
            </Table.Td>
        </>
    );
};

const PARTICIPATION_STATUS_COLOR: Record<ChallengeParticipationStatusType, DefaultMantineColor> = {
    waiting_for_approval: "yellow",
    rejected: "red",
    approved: "cyan",
    paid: "green",
};

const PARTICIPATION_STATUS_LABEL: Record<ChallengeParticipationStatusType, string> = {
    waiting_for_approval: "Waiting for review",
    rejected: "Rejected",
    approved: "Approved",
    paid: "Paid",
};
