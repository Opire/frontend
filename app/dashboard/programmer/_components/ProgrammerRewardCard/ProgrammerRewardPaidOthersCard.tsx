import { FC, Ref } from "react";
import { Avatar, AvatarGroup, Card, CardSection, Center, Group, HoverCard, HoverCardDropdown, HoverCardTarget, Space, Text, Title } from "@mantine/core";
import Link from "next/link";
import { CustomImage } from "../../../../_components/CustomImage";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { IssueByProgrammerDTO } from "../../../../_core/_dtos/IssueByProgrammerDTO";
import { splitToShow } from "../../../../_utils/splitToShow";

interface ProgrammerRewardPaidOthersCardProps {
    data: IssueByProgrammerDTO;
    inputRef?: Ref<HTMLDivElement>;
}

const MAX_NUMBER_OF_USERS_TO_SHOW = 4;

export const ProgrammerRewardPaidOthersCard: FC<ProgrammerRewardPaidOthersCardProps> = ({
    data,
    inputRef
}) => {
    const rewardedUsers = data.otherUsersTrying.filter(user => user.alreadyPaid.value > 0);

    const [rewardedUsersToShow, rewardedUsersHidden] = splitToShow(rewardedUsers, MAX_NUMBER_OF_USERS_TO_SHOW);
    const hasMoreUsers = rewardedUsersHidden.length > 0;
    const amountOfExtraUsers = rewardedUsersHidden.length;

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

            <Center>
                <CardSection p="sm">
                    <Text c="dimmed" size={"sm"} pb={8}>
                        Paid to:
                    </Text>

                    <Group gap="xs">
                        <AvatarGroup>
                            {
                                rewardedUsersToShow.map((user) => {
                                    return (
                                        <HoverCard
                                            withArrow
                                            shadow="md"
                                            closeDelay={0}
                                            openDelay={0}
                                            key={user.id}
                                        >
                                            <HoverCardTarget>
                                                <Avatar
                                                    src={user.avatarURL}
                                                    alt={user.username}
                                                    color="teal"
                                                    size='lg'
                                                    radius='xl'
                                                />
                                            </HoverCardTarget>

                                            <HoverCardDropdown>
                                                {user.username}
                                            </HoverCardDropdown>
                                        </HoverCard>
                                    )
                                })
                            }

                            {hasMoreUsers && (
                                <HoverCard withArrow shadow="md" closeDelay={0} openDelay={0}>
                                    <HoverCardTarget>
                                        <Avatar
                                            size='lg'
                                            radius='xl'
                                        >
                                            {`+${amountOfExtraUsers}`}
                                        </Avatar>
                                    </HoverCardTarget>

                                    <HoverCardDropdown>
                                        {rewardedUsersHidden.map((user) => <div key={user.id}>{user.username}</div>)}
                                    </HoverCardDropdown>
                                </HoverCard>
                            )}
                        </AvatarGroup>
                    </Group>
                </CardSection>
            </Center>

            <Space h={'0.5rem'} />

            <CardSection withBorder inheritPadding p="md" style={{ height: '100%' }}>
                <Group justify="flex-end" align='flex-end' style={{ height: '100%' }}>
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
