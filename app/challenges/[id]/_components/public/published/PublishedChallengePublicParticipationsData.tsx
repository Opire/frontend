import { Center, Card, Title, Space, Alert, Table, Skeleton, Flex, Avatar, Tooltip, Badge, DefaultMantineColor, Text } from "@mantine/core";
import { IconInfoCircle, IconLineDashed } from "@tabler/icons-react";
import Link from "next/link";
import { FC } from "react";
import { useGetUserPublicInfoFromAnyPlatform } from "../../../../../../hooks/useGetUserPublicInfoFromAnyPlatform";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import { ChallengeParticipationPrimitive, ChallengeParticipationStatusType } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { formatDateTime } from "../../../../../_utils/formatDate";
import { SubmitChallengeSolutionForm } from "./SubmitChallengeSolutionForm";
import { PrizeDisplay } from "../../shared/PrizeDisplay";

export const PublishedChallengePublicParticipationsData: FC<{
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}> = ({ challenge, userAuth }) => {
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
                        <SubmitChallengeSolutionForm challenge={challenge} userAuth={userAuth} />
                    </Center>
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
                                    The creator of the challenge has decided not to accept participants at the moment.
                                </Text>
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
                                            If you want to complete the challenge, start working in your solution and send it when it's ready!
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
                                    </Table.Tr>
                                </Table.Thead>

                                <Table.Tbody>
                                    {sortedParticipations.map(participation => (
                                        <Table.Tr key={participation.id}>
                                            <ParticipationRow participation={participation} userAuth={userAuth} />
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
    userAuth: UserAuthDTO | null;
}> = ({ participation, userAuth }) => {
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

    const isUserAuthTheParticipant = userAuth?.userId === participation.userId;

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
                    participation.status === "rejected" && isUserAuthTheParticipant
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
