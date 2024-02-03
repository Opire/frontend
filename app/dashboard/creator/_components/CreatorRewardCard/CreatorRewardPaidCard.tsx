import { FC, Ref } from "react";
import { Avatar, AvatarGroup, Card, CardSection, Group, HoverCard, HoverCardDropdown, HoverCardTarget, Text, Title } from "@mantine/core";
import Link from "next/link";
import { CustomImage } from "../../../../_components/CustomImage";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { IssueByCreatorDTO } from "../../../../_core/_dtos/IssueByCreatorDTO";
import { Price } from "../../../../_core/_vos/Price";

interface CreatorRewardPaidCardProps {
    data: IssueByCreatorDTO;
    inputRef?: Ref<HTMLDivElement>;
}

export const CreatorRewardPaidCard: FC<CreatorRewardPaidCardProps> = ({
    data,
    inputRef
}) => {
    const totalIssueRewardPrice = Price.sum([Price.fromPrimitives(data.alreadyPaid), Price.fromPrimitives(data.pendingToBePaid)]);

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
                        <Avatar src={data.organization.logoURL} size='md' radius='xl' />
                        <Text>{data.organization.name}</Text>
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
                            {formatPrice(totalIssueRewardPrice.toPrimitives())}
                        </Text>
                    </Text>
                </Group>

            </CardSection>


            <CardSection withBorder inheritPadding p="md" style={{ minHeight: '88px', height: '100%' }}>
                <Group justify="space-between" align='flex-end' style={{ height: '100%' }}>
                    <AvatarGroup>
                        {
                            data.usersTrying.filter(userTrying => userTrying.alreadyPaid.value > 0).map((userTrying) => {
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
                                                    Paid {formatPrice(userTrying.alreadyPaid)}
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
