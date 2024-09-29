import { ChallengePrimitive, CreateChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC, useState } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { Card, Title, Text, Divider, Box, Center, Table, Space, Flex, Grid, Button, Skeleton, Avatar, Badge, DefaultMantineColor, Alert, List, ListItem, Modal } from "@mantine/core";
import { ChallengePrizePrimitive } from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import { isPrimitiveSpecificPositionPrize, isPrimitiveThresholdPrize, isPrimitiveThresholdWithoutLimitPrize } from "../../../../../_utils/challengePrizes";
import { formatPrice, getPriceInUSD_CENT } from "../../../../../_utils/formatPrice";
import { PricePrimitive } from "../../../../../_core/_primitives/PricePrimitive";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconFile, IconInfoCircle, IconRecycle, IconSend, IconTrophy, IconX } from "@tabler/icons-react";
import { ChallengeParticipationPrimitive, ChallengeParticipationStatusType } from "../../../../../_core/_primitives/ChallengeParticipationPrimitive";
import { useGetUserPublicInfoFromAnyPlatform } from "../../../../../../hooks/useGetUserPublicInfoFromAnyPlatform";
import Link from "next/link";
import { formatDate, formatDateTime } from "../../../../../_utils/formatDate";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../../../../constants";
import { redirectAfterLogin } from "../../../../../_utils/redirectAfterLogin";
import { useTriggerCallbackOnQueryParamFirstMatch } from "../../../../../../hooks/useTriggerCallbackOnQueryParamFirstMatch";

interface PublishedChallengePublicDataProps {
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}

export const PublishedChallengePublicData: FC<PublishedChallengePublicDataProps> = ({ challenge, userAuth }) => {
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

            <Space h='4rem' />
            <NewChallengeSection challenge={challenge} userAuth={userAuth} />

            <Space h='2rem' />
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

const NewChallengeSection: FC<{
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}> = ({ challenge, userAuth }) => {
    const router = useRouter();
    const { hovered, ref } = useHover();
    const [
        isModalForNewChallenge,
        { open: openModalForNewChallenge, close: closeModalForNewChallenge },
    ] = useDisclosure(false);
    const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);

    useTriggerCallbackOnQueryParamFirstMatch({ queryParamKey: 'create-challenge', callback: openModalForNewChallenge });


    function handleClickCreateChallenge() {
        if (userAuth) {
            openModalForNewChallenge();
            return;
        }

        redirectAfterLogin.prepareNextRedirection(`/challenges/${challenge.id}?create-challenge=true`);
        router.push('?login=true');
    }


    function createNewEmtpyChallenge() {
        createNewChallenge();
    }

    function createNewChallengeUsingCurrentAsTemplate() {
        createNewChallenge({
            title: `Copy of: ${challenge.title}`,
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

    async function createNewChallenge(params?: CreateChallengeDTO) {
        try {
            setIsCreatingChallenge(true);

            const body = params ?
                {
                    challenge: params,
                }
                : undefined;

            const response = await clientCustomFetch(API_ROUTES.CHALLENGES.CREATE(), {
                method: 'POST',
                body
            });

            const newChallenge = await response.json() as ChallengePrimitive;

            router.push(`/challenges/${newChallenge.id}`)
        } catch (error) {
            console.log({ error })
            notifications.show({
                title: 'Error while trying to create the challenge',
                message: "",
                withBorder: true,
                withCloseButton: true,
                autoClose: 10_000,
                color: 'red',
                icon: <IconX />,
            })
            setIsCreatingChallenge(false);
        }
    }

    return (
        <>
            <Center>
                <Card
                    ref={ref}
                    withBorder
                    shadow="md"
                    radius='md'
                    p={'3rem 2rem'}
                    style={{
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        transform: hovered ? 'scale(1.01)' : undefined,
                        boxShadow: hovered ? '0 4px 30px rgba(16, 152, 173, 0.5)' : undefined,
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url("/images/newChallenge.webp")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={handleClickCreateChallenge}
                >
                    <Title order={2} size="h2" style={{ fontSize: '2.6rem', fontWeight: 900 }}>
                        Create a new challenge
                    </Title>

                    <Space h={'1rem'} />
                    <Text size="lg" fw={500}>
                        You can start from scratch, or use this challenge as a template
                    </Text>
                </Card>
            </Center>

            <Modal
                centered={true}
                opened={isModalForNewChallenge}
                onClose={closeModalForNewChallenge}
                title={<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}><IconTrophy size={16} color="teal" /><span>Create a new challenge</span></div>}
                closeOnEscape={true}
                closeOnClickOutside={false}
                withCloseButton={true}
                size={'lg'}
            >
                <Flex justify="space-between" mt="md" gap={'2rem'}>
                    <Button
                        leftSection={<IconFile size={18} />}
                        color="cyan"
                        variant="filled"
                        size="md"
                        loading={isCreatingChallenge}
                        disabled={isCreatingChallenge}
                        onClick={createNewEmtpyChallenge}
                    >
                        From scratch
                    </Button>

                    <Button
                        leftSection={<IconRecycle size={18} />}
                        variant="gradient"
                        size="md"
                        loading={isCreatingChallenge}
                        disabled={isCreatingChallenge}
                        onClick={createNewChallengeUsingCurrentAsTemplate}
                    >
                        Using this challenge as a template
                    </Button>
                </Flex>
            </Modal>
        </>

    );
};