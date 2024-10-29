import { Flex, Badge } from "@mantine/core";
import { FC } from "react";
import { ChallengePrizePrimitive } from "../../../../_core/_primitives/ChallengePrizePrimitive";
import { formatPrice } from "../../../../_utils/formatPrice";

export const PrizeDisplay: FC<{
    prize: ChallengePrizePrimitive;
}> = ({ prize }) => {
    return (
        <>
            {
                prize.amount
                &&
                formatPrice(prize.amount)
            }

            {
                prize.benefits.length > 0
                &&
                <Flex gap={'xs'} display={'inline-flex'} mx={'1rem'}>
                    {prize.benefits.map((benefit) => (
                        <Badge
                            key={benefit}
                            variant="outline"
                            color='gray'
                            size='sm'
                        >
                            {benefit}
                        </Badge>
                    )
                    )}
                </Flex>
            }
        </>
    );
};
