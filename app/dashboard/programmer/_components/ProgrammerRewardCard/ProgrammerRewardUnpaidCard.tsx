import { FC, Ref } from "react";
import { Avatar, AvatarGroup, Card, CardSection, Flex, Group, HoverCard, HoverCardDropdown, HoverCardTarget, Space, Text, Title } from "@mantine/core";
import { CustomImage } from "../../../../_components/CustomImage";
import { formatPrice } from "../../../../_utils/formatPrice";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { splitToShow } from "../../../../_utils/splitToShow";
import { IssueByProgrammerDTO } from "../../../../_core/_dtos/IssueByProgrammerDTO";
import { useRouter } from "next/navigation";
import { useHover } from "@mantine/hooks";

interface ProgrammerRewardUnpaidCardProps {
    data: IssueByProgrammerDTO;
    inputRef?: Ref<HTMLDivElement>;
}

const MAX_NUMBER_OF_USERS_TO_SHOW = 3;

export const ProgrammerRewardUnpaidCard: FC<ProgrammerRewardUnpaidCardProps> = ({
    data,
    inputRef,
}) => {
    const paidIssueRewardPrice = data.programmer.alreadyPaid;
    const unpaidIssueRewardPrice = data.pendingToBePaid;

    const claimerUsers = data.otherUsersTrying.filter(userTrying => userTrying.hasClaimed);
    const [claimerUsersToShow, claimerUsersHidden] = splitToShow(claimerUsers, MAX_NUMBER_OF_USERS_TO_SHOW);
    const hasMoreUsers = claimerUsersHidden.length > 0;
    const amountOfExtraUsers = claimerUsersHidden.length;

    const { hovered, ref: hoverRef } = useHover();
    const router = useRouter();

    const redirectToDetails = () => {
        router.push(`/issues/${data.issueId}`);
    };

    return (
        <>
            <Card
                ref={hoverRef}
                withBorder
                shadow="md"
                radius="md"
                style={{ cursor: "pointer", transition: "transform 100ms ease-out", transform: hovered ? "scale(1.01)" : "" }}
                onClick={redirectToDetails}
            >
                <CardSection withBorder p="sm" ref={inputRef}>
                    <Group justify="space-between">
                        <Group>
                            <Avatar src={data.organization.logoURL} size='md' radius='xl' />
                            <div
                                style={{ display: "flex", flexWrap: "wrap" }}
                            >
                                <Text lineClamp={1} c={"dimmed"}>{data.organization.name}</Text>
                                <span>&nbsp;/&nbsp;</span>
                                <Text lineClamp={1}>{data.project.name}</Text>
                            </div>
                        </Group>
                    </Group>
                </CardSection>

                <CardSection p="sm">
                    <Group wrap="nowrap">
                        <CustomImage
                            src={`/icons/${data.platform.toLowerCase()}.png`}
                            fallbackSrc='/icons/fallback.png'
                            alt={data.platform}
                            height={44}
                            width={44}
                        />
                        <Title order={3}>{data.title}</Title>
                    </Group>
                </CardSection>

                <CardSection p="sm">
                    {
                        paidIssueRewardPrice.value > 0 &&
                        <>
                            <Group justify="space-between">
                                <Text
                                    component="div"
                                    size={"xs"}
                                    style={{ textAlign: "center" }}
                                >
                                    <Text>
                                        Already received:
                                    </Text>

                                    <Text
                                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                                        variant='gradient'
                                    >
                                        {formatPrice(paidIssueRewardPrice)}
                                    </Text>
                                </Text>
                            </Group>

                            <Space h='20px' />
                        </>

                    }

                    <Group justify="center" style={{ flexDirection: "column" }}>
                        <Text
                            component="div"
                            size={"xs"}
                            style={{ textAlign: "center" }}
                        >
                            <Text>
                                Potential to receive:
                            </Text>

                            <Text
                                style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                                variant='gradient'
                            >
                                {formatPrice(unpaidIssueRewardPrice)}
                            </Text>
                        </Text>
                    </Group>

                </CardSection>

                <CardSection withBorder inheritPadding p="md" style={{ minHeight: "88px", height: "100%" }}>
                    <Group justify="space-between" align='flex-end' style={{ height: "100%" }}>
                        <Flex direction="column" gap="8px">
                            {claimerUsersToShow.length > 0 && (
                                <Text c="dimmed" size={"sm"}>
                                    Also claimed by
                                </Text>
                            )}

                            <Group gap="xs">
                                <AvatarGroup>
                                    {
                                        claimerUsersToShow.map((claimerUser) => (
                                            <HoverCard
                                                withArrow
                                                shadow="md"
                                                closeDelay={0}
                                                openDelay={0}
                                                key={claimerUser.id}
                                            >
                                                <HoverCardTarget>
                                                    <Avatar
                                                        src={claimerUser.avatarURL}
                                                        alt={claimerUser.username}
                                                        color="teal"
                                                        size='md'
                                                        radius='xl'
                                                    />
                                                </HoverCardTarget>

                                                <HoverCardDropdown>
                                                    {claimerUser.username}
                                                </HoverCardDropdown>
                                            </HoverCard>
                                        ))
                                    }
                                    {hasMoreUsers && (
                                        <HoverCard withArrow shadow="md" closeDelay={0} openDelay={0}>
                                            <HoverCardTarget>
                                                <Avatar
                                                    size='md'
                                                    radius='xl'
                                                >
                                                    {`+${amountOfExtraUsers}`}
                                                </Avatar>
                                            </HoverCardTarget>

                                            <HoverCardDropdown>
                                                {claimerUsersHidden.map((claimerUser) => <div key={claimerUser.id}>{claimerUser.username}</div>)}
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
                </CardSection >
            </Card >
        </>
    );
};
