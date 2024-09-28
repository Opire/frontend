import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { Card, Title, Text, Divider, Box, Center, Table, Space } from "@mantine/core";
import { ChallengePrizePrimitive } from "../../../../../_core/_primitives/ChallengePrizePrimitive";
import { isPrimitiveSpecificPositionPrize, isPrimitiveThresholdPrize, isPrimitiveThresholdWithoutLimitPrize } from "../../../../../_utils/challengePrizes";
import { formatPrice, getPriceInUSD_CENT } from "../../../../../_utils/formatPrice";
import { PricePrimitive } from "../../../../../_core/_primitives/PricePrimitive";

interface PublishedChallengePublicDataProps {
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}

export const PublishedChallengePublicData: FC<PublishedChallengePublicDataProps> = ({ challenge }) => {
    const highestPrize = getHighestPrize(challenge);

    return (
        <Box>
            <Center>
                <Title order={1} size="h1" ta='center' style={{ fontSize: '2.6rem', fontWeight: 900 }}>{challenge.title}</Title>
            </Center>

            <Space h='0.5rem' />

            <Center>
                <Text
                    component="h2"
                    variant="gradient"
                    ta='center'
                    style={{ fontSize: '2.4rem', fontWeight: 900 }}
                >
                    Win {formatPrice(highestPrize)}
                </Text>
            </Center>

            <Divider my="xl" />

            <Text size="xl" fw={500}>{challenge.summary}</Text>

            <Space h='1rem' />

            <PrizesSection challenge={challenge} />

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



const PrizesSection: FC<{
    challenge: ChallengePrimitive;
}> = ({ challenge }) => {
    if (challenge.configuration.prizes.length === 1 && isPrimitiveSpecificPositionPrize(challenge.configuration.prizes[0])) {
        return (
            <></>
        )
    }


    return (
        <Card withBorder shadow="md">
            <section>
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

                <Divider my="xs" />

                <Center>
                    <Table.ScrollContainer minWidth={400}>
                        <Table verticalSpacing="md">
                            <Table.Tbody ta={"center"}>
                                {challenge.configuration.prizes.map(
                                    (prize, index) => (
                                        <Table.Tr
                                            key={index}
                                        >
                                            <PrizeRow
                                                prize={
                                                    prize
                                                }
                                            />
                                        </Table.Tr>
                                    )
                                )}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Center>
            </section>
        </Card>

    );
};

const PrizeRow: FC<{
    prize: ChallengePrizePrimitive;
}> = ({ prize }) => {
    const isSpecificPositionPrize = isPrimitiveSpecificPositionPrize(prize);
    const isThresholdPrize = isPrimitiveThresholdPrize(prize);
    const isThresholdWithoutLimitPrize = isPrimitiveThresholdWithoutLimitPrize(prize);

    return (
        <>
            <Table.Td>
                <Text style={{ fontWeight: 500 }}>
                    {
                        isSpecificPositionPrize
                        &&
                        `${getOrdinalPositionDescription(prize.position)}`
                    }
                    {
                        isThresholdPrize
                        &&
                        `${getOrdinalPositionDescription(prize.fromPosition)} to ${getOrdinalPositionDescription(prize.toPosition)}`
                    }
                    {
                        isThresholdWithoutLimitPrize
                        &&
                        `${getOrdinalPositionDescription(prize.fromPosition)} onwards`
                    }
                </Text>
            </Table.Td>

            <Table.Td>
                <Text variant="gradient" style={{ fontWeight: 700 }}>
                    {formatPrice(prize.amount)}
                </Text>
            </Table.Td>
        </>
    );
};

function getOrdinalPositionDescription(position: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = position % 100;

    const suffix =
        suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];

    return `${position}${suffix}`;
}