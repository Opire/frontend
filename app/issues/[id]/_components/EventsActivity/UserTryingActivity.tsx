import { Avatar, AvatarGroup, Skeleton, Text, Timeline } from "@mantine/core";
import { FC } from "react";
import { IssuePrimitive } from "../../../../_core/_primitives/IssuePrimitive";
import { BaseEventPrimitives } from "../../../../_core/_primitives/BaseEventPrimitives";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { useGetUserPublicInfoFromPlatform } from "../../../../../hooks/useGetUserPublicInfoFromPlatform";
import Link from "next/link";
import { IconHeartHandshake } from "@tabler/icons-react";

interface UserTryingActivityProps {
    event: BaseEventPrimitives;
    issue: IssuePrimitive;
}

export const UserTryingActivity: FC<UserTryingActivityProps> = ({ event }) => {
    const attributes = event.attributes as { issue: IssuePrimitive, userId: string };

    const platform = attributes.issue.platform;

    const { isLoading, username, usernameLink, avatarURL } = useGetUserPublicInfoFromPlatform({ userId: attributes.userId, platform });

    return (
        <Timeline.Item title="New attempt" bullet={
            <AvatarGroup>
                <Avatar src={avatarURL} alt={username} size='sm' radius='xl' />
                <Avatar size='sm'>
                    <IconHeartHandshake stroke='1.5' />
                </Avatar>
            </AvatarGroup>
        } >
            {isLoading &&
                <Skeleton height={"2rem"} radius="xl" />
            }

            {!isLoading &&
                <Text c="dimmed" size="sm">
                    <Link href={usernameLink}>@{username}</Link> is trying to solve the issue
                </Text>
            }
            <Text size="xs" mt={4}>{getRelativeTime(new Date(event.occurredOn))}</Text>
        </Timeline.Item>
    );
};
