import { Avatar, Badge, Card, Center, Flex, Grid, Group, Skeleton, Space, Table, Text } from "@mantine/core";
import { IssuePrimitive } from "../../../_core/_primitives/IssuePrimitive";
import { FC } from "react";
import { CustomImage } from "../../../_components/CustomImage";
import Link from "next/link";
import { formatPrice } from "../../../_utils/formatPrice";
import { PricePrimitive } from "../../../_core/_primitives/PricePrimitive";
import { RewardPrimitive } from "../../../_core/_primitives/RewardPrimitive";
import { useGetUserPublicInfoFromPlatform } from "../../../../hooks/useGetUserPublicInfoFromPlatform";
import { PlatformType } from "../../../_core/_types/PlatformType";
import { ShareModal } from "./ShareModal";
interface DetailedIssueMainDataProps {
    issue: IssuePrimitive;
}

export const DetailedIssueMainData: FC<DetailedIssueMainDataProps> = ({ issue }) => {

    const totalPrice: PricePrimitive = issue.rewards.reduce((acc, el) => {
        acc.value += el.price.value
        return acc;

    }, { unit: 'USD_CENT', value: 0 })

    const availablePrice: PricePrimitive = issue.rewards.reduce((acc, el) => {
        if (el.status === 'Available') {
            acc.value += el.price.value
        }
        return acc;

    }, { unit: 'USD_CENT', value: 0 })

    const somethingHasBeenAlreadyPaid = totalPrice.value !== availablePrice.value;

    const labelsAndProgrammingLanguagesToShow = [...issue.labels.filter(label => !label.includes('Reward')), ...issue.project.programmingLanguages]

    return (
        <section style={{ height: 'auto' }}>
            <Grid>
                <Grid.Col span={{ base: 12, md: 7, lg: 8 }}>
                    <Group wrap="nowrap" >
                        <CustomImage
                            src={`/icons/${issue.platform.toLowerCase()}.png`}
                            fallbackSrc="/icons/fallback.png"
                            alt={issue.platform}
                            height={44}
                            width={44}
                        />

                        <Link
                            href={issue.issueURL}
                            target="_blank"
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            <Text fw={600} size={'2rem'}>{issue.title}</Text>
                        </Link>
                    </Group>

                    <Space h={'1.5rem'} />

                    <Group wrap="nowrap" ml={'0.6rem'}>
                        <Avatar
                            src={issue.project.organization.logoUrl}
                            alt={issue.project.organization.name}
                            style={{
                                width: "36px",
                                height: "36px",
                            }}
                            radius="xl"
                        />

                        <Flex wrap={'wrap'}>
                            <Link
                                href={issue.project.organization.url}
                                style={{ color: "inherit", textDecoration: "none", display: 'flex', flexWrap: 'wrap' }}
                            >
                                <Text lineClamp={1} c={"dimmed"}>{issue.project.organization.name}</Text>
                            </Link>
                            <span>&nbsp;/&nbsp;</span>
                            <Link
                                href={issue.project.url}
                                style={{ color: "inherit", textDecoration: "none", display: 'flex', flexWrap: 'wrap' }}
                            >
                                <Text lineClamp={1}>{issue.project.name}</Text>
                            </Link>
                        </Flex>

                    </Group>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
                    {/* <Card withBorder shadow="md" radius='md' bg={'dark.7'}> */}

                    <Center>
                        <Flex direction={'column'}>
                            <Text
                                style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                                variant='gradient'
                            >
                                {formatPrice(totalPrice)}
                            </Text>


                            {
                                somethingHasBeenAlreadyPaid 
                                && 
                                <Flex
                                align={"center"}
                                columnGap={'0.4rem'}
                                wrap={'wrap'}
                                >
                                    <Text >
                                        Available:
                                    </Text>

                                    <Text
                                        style={{ fontSize: "1.4rem", fontWeight: "bold" }}
                                        variant='gradient'
                                        >
                                        {formatPrice(availablePrice)}
                                    </Text>
                                </Flex>
                            }
                        </Flex>

                    </Center>
                    <Space h={'0.4rem'} />

                    <Center>
                        <ShareModal issue={issue} />
                    </Center>
                    {/* </Card> */}
                </Grid.Col>
            </Grid>

            <Space h={'2rem'} />

            <div>
                <Group style={{ gap: "6px" }}>
                    {
                        !issue.project.isInstalled &&
                        <Badge variant="outline" color="orange">Commands not available</Badge>
                    }

                    {labelsAndProgrammingLanguagesToShow.map((item) => (
                        <Badge variant={"outline"} key={item}>
                            {item}
                        </Badge>
                    ))}
                </Group>
            </div>

            <Space h={'2rem'} />

            <Card withBorder shadow="md" radius='md'>
                <Center>
                    <Text
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                        Rewards
                    </Text>
                </Center>

                <Space h={'1rem'} />

                <Table.ScrollContainer minWidth={500}>
                    <Table verticalSpacing="md">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Date</Table.Th>
                                <Table.Th>Creator</Table.Th>
                                <Table.Th>Amount</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Link</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody >
                            {issue.rewards.sort((reward1, reward2) => reward2.createdAt - reward1.createdAt).map(reward => (
                                <Table.Tr key={reward.id}>
                                    <DetailedIssueReward reward={reward} issue={issue} />
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card>

            <Space h={'2rem'} />

            {
                issue.usersTrying.length > 0 &&
                <>
                    <Center>
                        <Text
                            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                        >
                            Users trying to solve the issue
                        </Text>
                    </Center>

                    <Space h={'1.2rem'} />

                    <Grid justify="center">
                        {issue.usersTrying.map(userId => (
                            <Grid.Col key={userId} span={'content'}>
                                <UserTryingCard
                                    userId={userId}
                                    platform={issue.platform}
                                    hasClaimed={issue.usersClaiming.includes(userId)}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>
                    <Space h={'2rem'} />
                </>
            }
        </section >
    );
};

const DetailedIssueReward: FC<{ reward: RewardPrimitive, issue: IssuePrimitive }> = ({ reward, issue }) => {
    const platform = issue.platform;

    const {
        isLoading,
        username,
        avatarURL,
        usernameLink
    } = useGetUserPublicInfoFromPlatform({ userId: reward.creatorId, platform })

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
                {new Intl.DateTimeFormat('en-GB').format(new Date(reward.createdAt))}
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
                <Text variant="gradient" style={{ fontWeight: "bold", fontSize: '1.2rem' }}>{formatPrice(reward.price)}</Text>
            </Table.Td>

            <Table.Td>
                <Badge
                    color={reward.status === 'Available' ? 'teal' : 'blue'}
                >
                    {reward.status}
                </Badge>
            </Table.Td>

            <Table.Td>
                <Text c="dimmed" size="sm">
                    <Link href={reward.commentURL}>Go to comment</Link>
                </Text>
            </Table.Td>
        </>
    )
}

const UserTryingCard: FC<{ userId: string, platform: PlatformType, hasClaimed: boolean }> = ({ userId, platform, hasClaimed }) => {
    const {
        isLoading,
        username,
        avatarURL,
        usernameLink
    } = useGetUserPublicInfoFromPlatform({ userId, platform })

    if (isLoading) {
        return <div>
            <Skeleton h='2rem' />
        </div>
    }

    return (
        <Card withBorder radius='md'>
            <Center>
                <Avatar
                    src={avatarURL}
                    alt={username}
                    size='md'
                    radius='xl'
                />
            </Center>
            <Space h={'0.5rem'} />

            <Center>

                <Text c="dimmed" size="sm">
                    <Link href={usernameLink}>@{username}</Link>
                </Text>
            </Center>

            {hasClaimed &&
                <>
                    <Space h={'0.5rem'} />
                    <Center>
                        <Badge color="teal">Claimed</Badge>
                    </Center>
                </>
            }
        </Card>
    )
}