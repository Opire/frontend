import { Center, Grid, Card, Flex, Text, Badge, Space } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { FC } from "react";
import { ChallengePrimitive } from "../../../../_core/_primitives/ChallengePrimitive";
import { ChallengePrizePrimitive } from "../../../../_core/_primitives/ChallengePrizePrimitive";
import { isPrimitiveSpecificPositionPrize, isPrimitiveThresholdPrize, isPrimitiveThresholdWithoutLimitPrize } from "../../../../_utils/challengePrizes";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getOrdinalPositionDescription } from "./utils";

export const PrizesSection: FC<{
    challenge: ChallengePrimitive;
}> = ({ challenge }) => (
    <Center>
        <Grid
            style={{ justifyItems: "center", alignItems: "center" }}
            gutter={20}
        >
            {challenge.configuration.prizes.map((prize, index) => (
                <Grid.Col key={index} span={"auto"}>
                    <PrizeCard prize={prize} />
                </Grid.Col>
            ))}
        </Grid>
    </Center>
);

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
            radius='lg'
            shadow="md"
            h={250}
            miw={350}
            w='auto'
            style={{ transition: "box-shadow 0.3s ease-in-out", boxShadow: hovered ? "0 4px 30px rgba(16, 152, 173, 0.5)" : undefined }}
        >
            <Center style={{ margin: "auto 0", height: "100%" }}>
                <Flex direction={"column"} align={"center"} justify={"center"} h={"100%"}>
                    <Text style={{ fontWeight: 700, fontSize: "1.6rem", textAlign: "center" }}>
                        {
                            isSpecificPositionPrize &&
                            `${getOrdinalPositionDescription(prize.position)} prize`
                        }
                        {
                            isThresholdPrize &&
                            `${getOrdinalPositionDescription(prize.fromPosition)} to ${getOrdinalPositionDescription(prize.toPosition)} prize`
                        }
                        {
                            isThresholdWithoutLimitPrize &&
                            `${getOrdinalPositionDescription(prize.fromPosition)} prize onwards`
                        }
                    </Text>

                    {
                        prize.amount &&
                        <Text variant="gradient" style={{ fontWeight: 900, fontSize: "2.4rem" }}>
                            {formatPrice(prize.amount)}
                        </Text>
                    }

                    {
                        prize.benefits.length > 0 &&
                        <>
                            <Space h={"0.5rem"} />

                            <Flex gap={"xs"} wrap={"wrap"}>
                                {prize.benefits.map((benefit) => (
                                    <Badge
                                        key={benefit}
                                        variant="gradient"
                                    >
                                        {benefit}
                                    </Badge>
                                ))}
                            </Flex>
                        </>
                    }
                </Flex>
            </Center>
        </Card>
    );
};
