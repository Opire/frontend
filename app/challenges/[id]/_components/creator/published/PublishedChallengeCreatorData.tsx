import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { Card, Title, Text, Divider, Box, Center, Table, Space, Flex, Skeleton, Avatar, Badge, DefaultMantineColor, Alert, Tooltip } from "@mantine/core";
import { formatPrice } from "../../../../../_utils/formatPrice";
import { IconInfoCircle, IconX } from "@tabler/icons-react";
import { ChallengeParticipationPrimitive, ChallengeParticipationStatusType } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { useGetUserPublicInfoFromAnyPlatform } from "../../../../../../hooks/useGetUserPublicInfoFromAnyPlatform";
import Link from "next/link";
import { formatDateTime } from "../../../../../_utils/formatDate";
import { ChallengeMainData } from "../../shared/ChallengeMainData";
import { NewChallengeSection } from "../../shared/NewChallengeSection";
import { PrizesSection } from "../../shared/PrizesSection";
import { PublishedChallengeCreatorActions } from "./PublishedChallengeCreatorActions";
import { CreatorActionsOnParticipation } from "./CreatorActionsOnParticipation";

interface PublishedChallengeCreatorDataProps {
    challenge: ChallengeDTO;
    creator: UserAuthDTO;
}

export const PublishedChallengeCreatorData: FC<PublishedChallengeCreatorDataProps> = ({ challenge, creator }) => {

    return (
        <Box>
            <ChallengeMainData challenge={challenge} />

            <Divider my="xl" />
            <PrizesSection challenge={challenge} />

            <Space h='4rem' />
            <ParticipationsSection challenge={challenge} />

            <Space h='4rem' />
            <NewChallengeSection challenge={challenge} userAuth={creator} />

            <Space h='2rem' />
        </Box>
    );
};


const ParticipationsSection: FC<{
    challenge: ChallengeDTO;
}> = ({ challenge }) => {
    const sortedParticipations = [...challenge.participations].sort((a, b) => b.createdAt - a.createdAt);
    // const sortedParticipations: ChallengeParticipationPrimitive[] = [
    //     {
    //         id: '1',
    //         status: 'waiting_for_approval',
    //         proposedSolution: 'https://mantine.dev/theming/colors/',
    //         userId: "01J4AHYA34HHW2DTD1RRBVEPW6",
    //         position: null,
    //         prize: null,
    //         reasonForRejection: null,
    //         createdAt: Date.now(),
    //         updatedAt: Date.now(),
    //     },
    //     {
    //         id: '2',
    //         status: 'rejected',
    //         proposedSolution: 'https://mantine.dev/theming/colors/',
    //         userId: "01J4AHYA34HHW2DTD1RRBVEPW6",
    //         position: null,
    //         prize: null,
    //         reasonForRejection: 'His designs are horrible',
    //         createdAt: Date.now(),
    //         updatedAt: Date.now(),
    //     },
    //     {
    //         id: '3',
    //         status: 'approved',
    //         proposedSolution: 'https://mantine.dev/theming/colors/',
    //         userId: "01J4AHYA34HHW2DTD1RRBVEPW6",
    //         position: null,
    //         prize: null,
    //         reasonForRejection: null,
    //         createdAt: Date.now(),
    //         updatedAt: Date.now(),
    //     },
    //     {
    //         id: '4',
    //         status: 'paid',
    //         proposedSolution: 'https://mantine.dev/theming/colors/',
    //         userId: "01J4AHYA34HHW2DTD1RRBVEPW6",
    //         position: 1,
    //         prize: {
    //             position: 1,
    //             amount: {
    //                 unit: 'USD',
    //                 value: 1000
    //             }
    //         },
    //         reasonForRejection: null,
    //         createdAt: Date.now(),
    //         updatedAt: Date.now(),
    //     },
    // ]

    return (
        <Center>
            <Card withBorder shadow="md" radius='md' w={'100%'}>
                <Center>
                    <Title order={2} size="h2" style={{ fontSize: '2.6rem', fontWeight: 900 }}>
                        Participations
                    </Title>
                </Center >

                <Space h={'1rem'} />

                <Center>
                    <PublishedChallengeCreatorActions challenge={challenge} />
                </Center >

                <Space h={'1rem'} />


                {!challenge.isAcceptingParticipations
                    &&
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

                                <Space h={'1rem'} />
                            </Alert>
                        </Center>
                        <Space h={'1rem'} />
                    </>
                }

                {
                    sortedParticipations.length === 0
                        ?
                        <>
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
                        :
                        <Table.ScrollContainer minWidth={500}>
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
        usernameLink
    } = useGetUserPublicInfoFromAnyPlatform({ userId: participation.userId })

    if (isLoading) {
        return (
            <Table.Td colSpan={5}>
                <Skeleton h='2rem' />
            </Table.Td>
        )
    }

    return (
        <>
            <Table.Td>
                <Flex align={'center'} gap={'5px'}>
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

            <Table.Td miw={'180px'}>
                {
                    participation.status === 'rejected'
                        ?
                        <Tooltip
                            label={
                                <div>
                                    <strong>Reason for rejection:</strong>
                                    <Space h={'0.5rem'} />
                                    <q style={{ whiteSpace: 'pre-wrap' }}>
                                        {participation.reasonForRejection ?? ''}
                                    </q>
                                </div>
                            }
                        >
                            <Badge
                                leftSection={<IconInfoCircle size={14} />}
                                style={{ cursor: 'help' }}
                                variant="light"
                                color={PARTICIPATION_STATUS_COLOR['rejected']}
                            >
                                {PARTICIPATION_STATUS_LABEL['rejected']}
                            </Badge>
                        </Tooltip>
                        :
                        <Badge
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
                        ?
                        <Text variant="gradient" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>
                            {formatPrice(participation.prize.amount)}
                        </Text>
                        :
                        <IconX color="red" />
                }
            </Table.Td>

            <Table.Td>
                {formatDateTime(new Date(participation.createdAt))}
            </Table.Td>

            <Table.Td>
                <CreatorActionsOnParticipation participation={participation} challenge={challenge} />
            </Table.Td>
        </>
    )
}

const PARTICIPATION_STATUS_COLOR: Record<ChallengeParticipationStatusType, DefaultMantineColor> = {
    waiting_for_approval: "yellow",
    rejected: "red",
    approved: "cyan",
    paid: "green"
}

const PARTICIPATION_STATUS_LABEL: Record<ChallengeParticipationStatusType, string> = {
    waiting_for_approval: "Waiting for review",
    rejected: "Rejected",
    approved: "Approved",
    paid: "Paid"
}
