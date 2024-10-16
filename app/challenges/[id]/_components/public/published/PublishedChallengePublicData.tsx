import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { Card, Title, Text, Divider, Box, Center, Table, Space, Flex, Button, Skeleton, Avatar, Badge, DefaultMantineColor, Alert } from "@mantine/core";
import { formatPrice } from "../../../../../_utils/formatPrice";
import { IconInfoCircle, IconX } from "@tabler/icons-react";
import { ChallengeParticipationPrimitive, ChallengeParticipationStatusType } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { useGetUserPublicInfoFromAnyPlatform } from "../../../../../../hooks/useGetUserPublicInfoFromAnyPlatform";
import Link from "next/link";
import { formatDateTime } from "../../../../../_utils/formatDate";

import { NewChallengeSection } from "../../shared/NewChallengeSection";
import { PrizesSection } from "../../shared/PrizesSection";
import { ChallengeMainData } from "../../shared/ChallengeMainData";
import { SubmitChallengeSolutionForm } from "./SubmitChallengeSolutionForm";

interface PublishedChallengePublicDataProps {
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}

export const PublishedChallengePublicData: FC<PublishedChallengePublicDataProps> = ({ challenge, userAuth }) => {

    return (
        <Box>
            <ChallengeMainData challenge={challenge} />

            <Divider my="xl" />
            <PrizesSection challenge={challenge} />

            <Space h='4rem' />
            <ParticipationsSection challenge={challenge} userAuth={userAuth} />

            <Space h='4rem' />
            <NewChallengeSection challenge={challenge} userAuth={userAuth} />

            <Space h='2rem' />
        </Box>
    );
};

const ParticipationsSection: FC<{
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}> = ({ challenge, userAuth }) => {
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
                    <SubmitChallengeSolutionForm challenge={challenge} userAuth={userAuth} />
                </Center>

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
                                    The creator of the challenge has decided not to accept participants at the moment.
                                </Text>
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
                                            If you want to complete the challenge, start working in your solution and send it when it's ready!
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
                                    </Table.Tr>
                                </Table.Thead>

                                <Table.Tbody>
                                    {sortedParticipations.map(participation => (
                                        <Table.Tr key={participation.id}>
                                            <ParticipationRow participation={participation} />
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

const ParticipationRow: FC<{ participation: ChallengeParticipationPrimitive }> = ({ participation }) => {
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
                <Badge
                    variant="light"
                    color={PARTICIPATION_STATUS_COLOR[participation.status]}
                >
                    {PARTICIPATION_STATUS_LABEL[participation.status]}
                </Badge>
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
