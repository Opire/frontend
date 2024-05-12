import {
    Avatar,
    AvatarGroup,
    Badge,
    Card,
    CardSection,
    Flex,
    Group,
    HoverCard,
    HoverCardDropdown,
    HoverCardTarget,
    Space,
    Text,
} from "@mantine/core";
import Link from "next/link";
import { FC, Ref, useEffect } from "react";
import { CustomImage } from "../../_components/CustomImage";
import { splitToShow } from "../../_utils/splitToShow";
import { formatPrice } from "../../_utils/formatPrice";
import { getRelativeTime } from "../../_utils/getRelativeTime";
import { IssueListDTO } from "../../_core/_dtos/IssueListDTO";

interface HomeRewardCardProps {
    data: IssueListDTO;
    inputRef?: Ref<HTMLDivElement>;
}

const MAX_NUMBER_OF_USERS_TO_SHOW = 3;
const MAX_NUMBER_OF_PROGRAMMING_LANGUAGES_TO_SHOW = 4;

export const HomeRewardCard: FC<HomeRewardCardProps> = ({ data, inputRef }) => {
    useEffect(() => { }, []);

    const [usersToShow, usersHidden] = splitToShow(
        data.claimerUsers,
        MAX_NUMBER_OF_USERS_TO_SHOW
    );

    const hasMoreUsers = usersHidden.length > 0;
    const amountOfExtraUsers = usersHidden.length;

    const [programmingLanguagesToShow] = splitToShow(
        data.programmingLanguages,
        MAX_NUMBER_OF_PROGRAMMING_LANGUAGES_TO_SHOW
    )

    return (
        <Card ref={inputRef} withBorder shadow="md" radius="md" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CardSection withBorder p="sm">
                <Group justify="space-between">
                    <Group wrap="nowrap" h={"50px"}>
                        <CustomImage
                            src={`/icons/${data.platform.toLowerCase()}.png`}
                            fallbackSrc="/icons/fallback.png"
                            alt={data.platform}
                            height={44}
                            width={44}
                        />

                        <Link
                            href={data.url}
                            target="_blank"
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            <Text lineClamp={2}>{data.title}</Text>
                        </Link>
                    </Group>

                </Group>
            </CardSection>

            <CardSection p="sm">
                <Group wrap="nowrap">
                    <Avatar
                        src={data.organization.logoURL}
                        alt={data.organization.name}
                        style={{
                            width: "44px",
                            height: "44px",
                        }}
                        radius="xl"
                    />

                    <Link
                        // href={`/organization/${data.organization.id}`}
                        href={data.project.url}
                        style={{ color: "inherit", textDecoration: "none", display: 'flex', flexWrap: 'wrap' }}
                    >
                        <Text lineClamp={1} c={"dimmed"}>{data.organization.name}</Text>
                        <span>&nbsp;/&nbsp;</span>
                        <Text lineClamp={1}>{data.project.name}</Text>
                    </Link>

                </Group>

                <Space h="8px" />

                <Group style={{ gap: "6px" }}>
                    {programmingLanguagesToShow.map((programmingLanguage) => (
                        <Badge variant={"outline"} key={programmingLanguage}>
                            {programmingLanguage}
                        </Badge>
                    ))}

                    {
                        !data.project.isBotInstalled &&
                        <Badge variant="outline" color="orange">Commands not available</Badge>
                    }

                </Group>
            </CardSection>

            <CardSection p="sm">
                <Group justify="center">
                    <Text
                        variant="gradient"
                        style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                    >
                        {formatPrice(data.pendingPrice)}
                    </Text>
                </Group>
            </CardSection>

            <CardSection withBorder p="md">
                <Group
                    justify="space-between"
                    align="flex-end"
                    style={{ height: "100%" }}
                    wrap="nowrap"
                >
                    <Flex direction="column" gap="8px">
                        {usersToShow.length > 0 && (
                            <Text c="dimmed" size={"sm"}>
                                Claimed by
                            </Text>
                        )}

                        <Group gap="xs">
                            <AvatarGroup>
                                {usersToShow.map((user) => {
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
                                                    size='md'
                                                    radius='xl'
                                                />
                                            </HoverCardTarget>

                                            <HoverCardDropdown>
                                                {user.username}
                                            </HoverCardDropdown>
                                        </HoverCard>
                                    );
                                })}
                                {hasMoreUsers && (
                                    <HoverCard
                                        withArrow
                                        shadow="md"
                                        closeDelay={0}
                                        openDelay={0}
                                    >
                                        <HoverCardTarget>
                                            <Avatar
                                                size='md'
                                                radius='xl'
                                            >
                                                {`+${amountOfExtraUsers}`}
                                            </Avatar>
                                        </HoverCardTarget>

                                        <HoverCardDropdown>
                                            {usersHidden.map((user) => <div key={user.id}>{user.username}</div>)}
                                        </HoverCardDropdown>
                                    </HoverCard>
                                )}
                            </AvatarGroup>
                        </Group>
                    </Flex>

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
        </Card>
    );
};
