import { FC, Ref } from "react";
import { Avatar, AvatarGroup, Card, CardSection, Group, HoverCard, HoverCardDropdown, HoverCardTarget, Text, Title } from "@mantine/core";
import Link from "next/link";
import { CustomImage } from "../../../../_components/CustomImage";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { IssueByCreatorDTO } from "../../../../_core/_dtos/IssueByCreatorDTO";

interface CreatorRewardPaidCardProps {
    data: IssueByCreatorDTO;
    inputRef?: Ref<HTMLDivElement>;
}

export const CreatorRewardPaidCard: FC<CreatorRewardPaidCardProps> = ({
    data,
    inputRef
}) => {
    // TODO: be careful we are adding assuming that are the same currency
    const totalIssueRewardPrice = data.rewards.reduce((acc, reward) => {
        return acc + reward.price.value
    }, 0);

    const rewardedUsersIds = data.rewards.map(reward => reward.rewardedUserId);

    return (
        <Card
            ref={inputRef}
            withBorder
            shadow="md"
            radius="md"
        >
            <CardSection withBorder p="sm">
                <Group justify="space-between">
                    <Group>
                        <Avatar src={data.organizationLogoURL} size='md' radius='xl' />
                        <Text>{data.organizationName}</Text>
                    </Group>

                    <Group>
                        <CustomImage
                            src={`/icons/${data.platform.toLowerCase()}.png`}
                            fallbackSrc='/icons/fallback.png'
                            alt={data.platform}
                            height={30}
                            width={30}
                        />
                    </Group>
                </Group>
            </CardSection>

            <CardSection p="sm">
                <Group>
                    <Link href={data.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Title order={3}>{data.title}</Title>
                    </Link>
                </Group>
            </CardSection>

            <CardSection p="sm">
                <Group justify="center" style={{ flexDirection: 'column' }}>
                    <Text
                        component="div"
                        size={'xs'}
                        style={{ textAlign: 'center' }}
                    >
                        <Text>
                            Total:
                        </Text>

                        <Text
                            style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                            variant='gradient'
                        >
                            {formatPrice({ unit: 'EUR_CENT', value: totalIssueRewardPrice })}
                        </Text>
                    </Text>
                </Group>

            </CardSection>


            <CardSection withBorder inheritPadding p="md" style={{ minHeight: '88px', height: '100%' }}>
                <Group justify="space-between" align='flex-end' style={{ height: '100%' }}>
                    <AvatarGroup>
                        {
                            data.usersTrying.filter(userTrying => rewardedUsersIds.includes(userTrying.id)).map((userTrying) => {
                                const totalPaidToUser = data.rewards.filter(reward => reward.rewardedUserId === userTrying.id).reduce((acc, reward) => {
                                    return acc + reward.price.value
                                }, 0)

                                return (
                                    <>
                                        <HoverCard withArrow shadow="md" closeDelay={0} openDelay={0} key={userTrying.id}>
                                            <HoverCardTarget>
                                                <Avatar src={userTrying.avatarURL} alt={userTrying.username} color="teal" size='lg' radius='xl' />
                                            </HoverCardTarget>
                                            <HoverCardDropdown>
                                                <Text
                                                    variant='default'
                                                >
                                                    Paid {formatPrice({ unit: 'EUR_CENT', value: totalPaidToUser })}
                                                </Text>
                                            </HoverCardDropdown>
                                        </HoverCard>
                                    </>
                                )
                            })
                        }
                    </AvatarGroup>

                    <Text
                        c="dimmed"
                        size="xs"
                        style={{
                            textAlign: "end",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <span>Created</span>
                        <span>{getRelativeTime(new Date(data.createdAt))}</span>
                    </Text>
                </Group>
            </CardSection>
        </Card >
    );
};
