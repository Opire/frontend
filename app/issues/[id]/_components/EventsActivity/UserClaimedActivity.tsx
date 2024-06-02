import { Avatar, Skeleton, Text, Timeline } from "@mantine/core";
import { FC } from "react";
import { IssuePrimitive } from "../../../../_core/_primitives/IssuePrimitive";
import { BaseEventPrimitives } from "../../../../_core/_primitives/BaseEventPrimitives";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { useGetUserPublicInfoFromPlatform } from "../../../../../hooks/useGetUserPublicInfoFromPlatform";
import Link from "next/link";

interface UserClaimedActivityProps {
    event: BaseEventPrimitives;
    issue: IssuePrimitive;
}

export const UserClaimedActivity: FC<UserClaimedActivityProps> = ({ event }) => {
    const attributes = event.attributes as { issue: IssuePrimitive, userId: string };

    const platform = attributes.issue.platform;

    const { isLoading, username, usernameLink, avatarURL } = useGetUserPublicInfoFromPlatform({ userId: attributes.userId, platform })

    return (
        <Timeline.Item title="New claimer" bullet={<Avatar src={avatarURL} alt={username} size='sm' radius='xl' />} >
            {isLoading &&
                <Skeleton height={'2rem'} radius="xl" />
            }

            {!isLoading &&
                <Text c="dimmed" size="sm">
                    <Link href={usernameLink}>@{username}</Link> has proposed a solution for the issue and its claiming the rewards
                </Text>
            }

            <Text size="xs" mt={4}>{getRelativeTime(new Date(event.occurredOn))}</Text>
        </Timeline.Item>
    );
};
