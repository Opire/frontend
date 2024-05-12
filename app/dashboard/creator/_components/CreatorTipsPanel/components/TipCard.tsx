import { Avatar, Button, Card, Group, Space, Text } from "@mantine/core";
import { FC, Ref, useState } from "react";
import { API_ROUTES } from "../../../../../../constants";
import { clientCustomFetch } from "../../../../../_utils/clientCustomFetch";
import { formatPrice } from "../../../../../_utils/formatPrice";
import { TipByCreatorDTO } from "../../../../../_core/_dtos/TipByCreatorDTO";

interface OwnerRewardCardProps {
    data: TipByCreatorDTO;
    inputRef?: Ref<HTMLDivElement>;
}

export const TipCard: FC<OwnerRewardCardProps> = ({
    data,
    inputRef
}) => {
    const [isGettingLink, setIsGettingLink] = useState(false);

    const completePayTip = async (tipId: string) => {
        try {
            setIsGettingLink(true);

            const response = await clientCustomFetch(API_ROUTES.PAYMENTS.LINK_TO_PAY_TIP(tipId));
            const data = await response.json();

            if (data) {
                window.open(data.url, '_blank');
            }

        } catch (error) {
            console.error({ error })
        } finally {
            setIsGettingLink(false);
        }
    }

    const canBePaid = data.status === 'Pending payment';

    return (
        <Card
            ref={inputRef}
            withBorder
            shadow="md"
            radius="md"
        >
            <Group justify="center">
                <Avatar
                    src={data.programmer.avatarURL} // TODO: get programer avatar, create TipReadModel
                    radius='xl'
                    size='lg'
                />
                <Text
                    style={{ fontSize: '40px' }}
                    fw={700}
                    size="xl"
                    variant='gradient'
                >
                    {formatPrice(data.price)}
                </Text>
            </Group>
            <Space h='20px' />
            <Group justify="space-between">
                <Button
                    component="a"
                    variant='subtle'
                    target="_blank"
                    href={data.commentURL}
                >
                    Go to issue
                </Button>
                <Button
                    variant='gradient'
                    onClick={() => completePayTip(data.id)}
                    disabled={!canBePaid}
                    loading={isGettingLink}
                >
                    {canBePaid ? 'Pay' : 'Paid'}
                </Button>
            </Group>
        </Card>
    );
};
