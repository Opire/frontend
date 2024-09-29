import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { Card, Title, Text, Divider, Box, Center, Table, Space, Flex, Grid, Button, Skeleton, Avatar, Badge, DefaultMantineColor, Alert, List, ListItem } from "@mantine/core";
import { ChallengePrizePrimitive } from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import { isPrimitiveSpecificPositionPrize, isPrimitiveThresholdPrize, isPrimitiveThresholdWithoutLimitPrize } from "../../../../../_utils/challengePrizes";
import { formatPrice, getPriceInUSD_CENT } from "../../../../../_utils/formatPrice";
import { PricePrimitive } from "../../../../../_core/_primitives/PricePrimitive";
import { useHover } from "@mantine/hooks";
import { IconInfoCircle, IconSend } from "@tabler/icons-react";
import { ChallengeParticipationPrimitive, ChallengeParticipationStatusType } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { useGetUserPublicInfoFromAnyPlatform } from "../../../../../../hooks/useGetUserPublicInfoFromAnyPlatform";
import Link from "next/link";
import { formatDate, formatDateTime } from "../../../../../_utils/formatDate";

interface PublishedChallengePublicDataProps {
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}

export const PublishedChallengePublicData: FC<PublishedChallengePublicDataProps> = ({ challenge }) => {
    const highestPrize = getHighestPrize(challenge);

    return (
        <Box>
            <Center>
                <Title order={1} size="h1" ta='center' style={{ fontSize: '3rem', fontWeight: 900 }}>
                    {challenge.title}
                </Title>
            </Center>

            <Space h='0.5rem' />
            <Center>
                <Text
                    component="h2"
                    variant="gradient"
                    ta='center'
                    style={{ fontSize: '2.6rem', fontWeight: 900 }}
                >
                    Win {formatPrice(highestPrize)}
                </Text>
            </Center>

            <Space h='3rem' />
            <Title order={2} size="h2" style={{ fontSize: '2.6rem', fontWeight: 900 }}>
                Challenge details
            </Title>
            <Text size="xl" fw={400} style={{ whiteSpace: 'pre-wrap' }}>
                {challenge.summary}
            </Text>

            <ChallengeDetailsSection title="Main objective" content={challenge.mainObjetive} />
            <ChallengeDetailsSection title="Secondary goals" content={challenge.otherObjetives} />
            <ChallengeDetailsSection title="Requirements" content={challenge.requirements} />
            <ChallengeDetailsSection title="Evaluation criteria" content={challenge.evaluationCriteria} />
            <ChallengeDetailsSection title="Additional information" content={challenge.additionalComments} />
            <ChallengeDetailsSection title="Contact" content={challenge.contactInformation} />


            <Space h={'1rem'} />
            <Title order={3} size="h3" style={{ fontSize: '1.6rem', fontWeight: 900 }}>
                Other specs
            </Title>
            <List>
                <ListItem>
                    <Text size="xl" fw={400} >
                        {challenge.configuration.allowMultipleParticipationsPerUser
                            ?
                            'Multiple participations per user are allowed'
                            :
                            'Only 1 participation per user'
                        }
                    </Text>
                </ListItem>
                <ListItem>
                    <Text size="xl" fw={400} >
                        {challenge.configuration.limitOfParticipations
                            ?
                            `There's a limit of ${challenge.configuration.limitOfParticipations} participations. Rejected solutions are not taken into account`
                            :
                            "There's no limit of participations"
                        }
                    </Text>
                </ListItem>

                <ListItem>
                    <Text size="xl" fw={400} >
                        {challenge.configuration.deadline
                            ?
                            `The challenge has a deadline. New participations will not be accepted after ${formatDate(new Date(challenge.configuration.deadline))}`
                            :
                            "No deadline. The creator of the challenge will close or mark the challenge as completed at will"
                        }
                    </Text>
                </ListItem>
            </List>

            <Divider my="xl" />
            <PrizesSection challenge={challenge} />

            <Space h='4rem' />
            <ParticipationsSection challenge={challenge} />

        </Box>
    );
};

function getHighestPrize(challenge: ChallengePrimitive): PricePrimitive {
    if (!challenge.configuration.allowMultipleParticipationsPerUser) {
        const firstPrize = challenge.configuration.prizes[0];

        return firstPrize.amount;
    }

    const prizesSum: PricePrimitive = challenge.configuration.prizes.reduce((accumulator: PricePrimitive, currentPrize: ChallengePrizePrimitive): PricePrimitive => {
        return {
            value: accumulator.value + getPriceInUSD_CENT(currentPrize.amount),
            unit: accumulator.unit,
        }
    }, { unit: 'USD_CENT', value: 0 })

    return prizesSum;
}

const ChallengeDetailsSection: FC<{
    title: string;
    content: string | null;
}> = ({ title, content }) => {
    if (!content) return null;

    return (
        <>
            <Space h={'1rem'} />
            <Title order={3} size="h3" style={{ fontSize: '1.6rem', fontWeight: 900 }}>
                {title}
            </Title>
            <Text size="xl" fw={400} style={{ whiteSpace: 'pre-wrap' }}>
                {content}
            </Text>
        </>
    );
};

const PrizesSection: FC<{
    challenge: ChallengePrimitive;
}> = ({ challenge }) => {
    return (
        <Center>
            <Grid
                style={{ justifyItems: 'center', alignItems: 'center' }}
                gutter={50}
            >
                {challenge.configuration.prizes.map((prize, index) => (
                    <Grid.Col key={index} span={'auto'}>
                        <PrizeCard prize={prize} />
                    </Grid.Col>
                ))}
            </Grid>
        </Center>
    );
};


const PrizeCard: FC<{
    prize: ChallengePrizePrimitive;
}> = ({ prize }) => {
    const { hovered, ref } = useHover();

    const isSpecificPositionPrize = isPrimitiveSpecificPositionPrize(prize);
    const isThresholdPrize = isPrimitiveThresholdPrize(prize);
    const isThresholdWithoutLimitPrize = isPrimitiveThresholdWithoutLimitPrize(prize);

    return (
        <Card
            ref={ref}
            withBorder
            radius={'lg'}
            shadow="md"
            h={250}
            w={400}
            style={{ transition: 'box-shadow 0.3s ease-in-out', boxShadow: hovered ? '0 4px 30px rgba(16, 152, 173, 0.5)' : undefined }}
        >
            <Center style={{ margin: 'auto 0', height: '100%' }}>
                <Flex direction={'column'} align={'center'} justify={'center'} h={'100%'}>
                    <Text style={{ fontWeight: 700, fontSize: '1.6rem' }}>
                        {
                            isSpecificPositionPrize
                            &&
                            `${getOrdinalPositionDescription(prize.position)} prize`
                        }
                        {
                            isThresholdPrize
                            &&
                            `${getOrdinalPositionDescription(prize.fromPosition)} to ${getOrdinalPositionDescription(prize.toPosition)} prize`
                        }
                        {
                            isThresholdWithoutLimitPrize
                            &&
                            `${getOrdinalPositionDescription(prize.fromPosition)} prize onwards`
                        }
                    </Text>

                    <Text variant="gradient" style={{ fontWeight: 900, fontSize: '2.4rem' }}>
                        {formatPrice(prize.amount)}
                    </Text>
                </Flex>
            </Center>
        </Card>
    );
};

function getOrdinalPositionDescription(position: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = position % 100;

    const suffix =
        suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];

    return `${position}${suffix}`;
}

const ParticipationsSection: FC<{
    challenge: ChallengePrimitive;
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
                    <Button
                        leftSection={<IconSend size={18} />}
                        variant='light'
                        onClick={() => { }}
                    >
                        Submit solution
                    </Button>
                    {/* TODO: Add modal to submit solution */}
                </Center>

                <Space h={'1rem'} />

                {
                    sortedParticipations.length === 0
                        ?
                        <Center>
                            <Alert
                                variant="light"
                                color="blue"
                                title="No participants yet"
                                icon={<IconInfoCircle />}
                            >
                                <Text>
                                    No one has send their solution yet. If you want to complete the challenge, start working in your solution and send it when it's ready!
                                </Text>

                            </Alert>
                        </Center>
                        :
                        <Table.ScrollContainer minWidth={500}>
                            <Table verticalSpacing="md">
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
                <Link href={participation.proposedSolution}>{participation.proposedSolution}</Link>
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
                    &&
                    <Text variant="gradient" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>
                        {formatPrice(participation.prize.amount)}
                    </Text>

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