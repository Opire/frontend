import { FC } from "react";
import { IssuePrimitive } from "../../../../_core/_primitives/IssuePrimitive";
import { BaseEventPrimitives } from "../../../../_core/_primitives/BaseEventPrimitives";
import { Avatar, AvatarGroup, Skeleton, Text, Timeline } from "@mantine/core";
import { getRelativeTime } from "../../../../_utils/getRelativeTime";
import { formatPrice } from "../../../../_utils/formatPrice";
import { RewardPrimitive } from "../../../../_core/_primitives/RewardPrimitive";
import Link from "next/link";
import { useGetUserPublicInfoFromPlatform } from "../../../../../hooks/useGetUserPublicInfoFromPlatform";
import { IconCoins } from "@tabler/icons-react";

interface NewRewardAddedActivityProps {
    event: BaseEventPrimitives;
    issue: IssuePrimitive;
}

export const NewRewardAddedActivity: FC<NewRewardAddedActivityProps> = ({ event }) => {
    const attributes = event.attributes as { reward: RewardPrimitive, issue: IssuePrimitive };
    const platform = attributes.issue.platform;

    const { isLoading, username, avatarURL, usernameLink } = useGetUserPublicInfoFromPlatform({ userId: attributes.reward.creatorId, platform });

    return (
        <Timeline.Item title="New reward" bullet={
            <AvatarGroup>
                <Avatar src={avatarURL} alt={username} size='sm' radius='xl' />
                <Avatar size='sm'>
                    <IconCoins stroke='1.5' />
                </Avatar>
            </AvatarGroup>
        }>
            {isLoading &&
                <Skeleton height={"2rem"} radius="xl" />
            }

            {!isLoading &&
                <Text c="dimmed" size="sm">
                    <Link href={usernameLink}>@{username}</Link> added a <Text variant="gradient" component="span" style={{ fontWeight: "bold" }}>{formatPrice(attributes.reward.price)}</Text> reward
                </Text>
            }

            <Text size="xs" mt={4}>{getRelativeTime(new Date(event.occurredOn))}</Text>
        </Timeline.Item>
    );
};
