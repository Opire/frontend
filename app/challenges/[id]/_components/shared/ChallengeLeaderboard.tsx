import { FC } from "react";
import { ChallengePrimitive } from "../../../../_core/_primitives/ChallengePrimitive";
import { Avatar, Card, Center, Flex, Skeleton, Space, Table, Title, Text } from "@mantine/core";
import { ChallengeParticipationPrimitive } from "../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { useGetUserPublicInfoFromAnyPlatform } from "../../../../../hooks/useGetUserPublicInfoFromAnyPlatform";
import Link from "next/link";
import { formatPrice } from "../../../../_utils/formatPrice";
import { formatDateTime } from "../../../../_utils/formatDate";
import { getOrdinalPositionDescription } from "./utils";

export const ChallengeLeaderboard: FC<{
    challenge: ChallengePrimitive;
}> = ({ challenge }) => {
    const paidParticipations = challenge.participations.filter(participation => participation.status === 'paid');
    const sortedPaidParticipations = [...paidParticipations].sort((a, b) => b.createdAt - a.createdAt);

    return (
        <Center>
            <Card withBorder shadow="md" radius='md' w={'100%'}>
                <Center>
                    <Title order={2} size="h2" style={{ fontSize: '2.6rem', fontWeight: 900 }}>
                        Winners
                    </Title>
                </Center >

                <Space h={'1rem'} />

                <Table.ScrollContainer minWidth={500}>
                    <Table verticalSpacing="md" highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Position</Table.Th>
                                <Table.Th>Participant</Table.Th>
                                <Table.Th>Solution</Table.Th>
                                <Table.Th>Prize</Table.Th>
                                <Table.Th>Solution sent at</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                            {sortedPaidParticipations.map(participation => (
                                <Table.Tr key={participation.id}>
                                    <LeaderboardRow participation={participation} />
                                </Table.Tr>
                            ))}

                            {sortedPaidParticipations.length === 0 && (
                                <Table.Tr>
                                    <Table.Td colSpan={5}>
                                        <Text ta='center'>
                                            No winners yet
                                        </Text>
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card>
        </Center>

    );
};

const LeaderboardRow: FC<{
    participation: ChallengeParticipationPrimitive;
}> = ({ participation }) => {
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
                {getOrdinalPositionDescription(participation.position ?? 1)}
            </Table.Td>

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


            <Table.Td>
                <Text variant="gradient" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>
                    {formatPrice(participation.prize?.amount ?? { value: 0, unit: 'USD' })}
                </Text>
            </Table.Td>

            <Table.Td>
                {formatDateTime(new Date(participation.createdAt))}
            </Table.Td>
        </>
    )
}

