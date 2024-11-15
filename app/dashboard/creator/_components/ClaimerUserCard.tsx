import { Avatar, Button, Card, Group, Text } from "@mantine/core";
import { PayClaimerButton } from "./CreatorRewardCard/PayClaimerButton";
import { formatPrice } from "../../../_utils/formatPrice";
import { PricePrimitive } from "../../../_core/_primitives/PricePrimitive";

interface UserInfo {
    id: string;
    username: string;
    avatarURL: string | null;
    hasClaimed: boolean;
}

interface PropsWithPrice {
    user: UserInfo;
    issueId: string;
    paidPrice: PricePrimitive;
    pendingPrice: PricePrimitive;
}

interface PropsWithoutPrice {
    user: UserInfo;
    issueId?: undefined;
    paidPrice: PricePrimitive;
    pendingPrice?: undefined;
}

type ClaimerUserCardProps = PropsWithPrice | PropsWithoutPrice;

export function ClaimerUserCard ({
    user,
    issueId,
    paidPrice,
    pendingPrice,
}: ClaimerUserCardProps) {
    const haveToShowPayButton = pendingPrice !== undefined && pendingPrice.value > 0;
    const haveToShowSomePrices = haveToShowPayButton || paidPrice.value > 0;

    return (
        <Group align="start" gap='16px' display='flex'>
            <Avatar src={user.avatarURL} alt={user.username} color="teal" size='lg' radius='xl' />

            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ flexGrow: 1, rowGap: "1.5rem", display: "flex" }}
            >
                <Text fw={600} size="xl">
                    {user.username}
                </Text>

                {
                    haveToShowSomePrices &&
                    <Group style={{ justifyContent: "space-between" }}>
                        {
                            haveToShowPayButton &&
                            <PayClaimerButton
                                claimerId={user.id}
                                issueId={issueId!}
                                priceToPay={pendingPrice}
                            />
                        }

                        {
                            paidPrice.value > 0 &&
                            <Text
                                component="div"
                                size={"xs"}
                                style={{ textAlign: "center" }}
                            >
                                <Text>
                                    Already paid:
                                </Text>

                                <Text
                                    style={{ fontSize: "0.8rem" }}
                                    c='dimmed'
                                >
                                    {formatPrice(paidPrice)}
                                </Text>
                            </Text>
                        }
                    </Group>
                }
            </Card>
        </Group>
    );
}
