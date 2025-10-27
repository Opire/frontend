import { Avatar, AvatarGroup, Skeleton, Text, Timeline } from '@mantine/core';
import { FC } from 'react';
import { IssuePrimitive } from '../../../../_core/_primitives/IssuePrimitive';
import { BaseEventPrimitives } from '../../../../_core/_primitives/BaseEventPrimitives';
import { getRelativeTime } from '../../../../_utils/getRelativeTime';
import { RewardPrimitive } from '../../../../_core/_primitives/RewardPrimitive';
import { PricePrimitive } from '../../../../_core/_primitives/PricePrimitive';
import Link from 'next/link';
import { formatPrice } from '../../../../_utils/formatPrice';
import { useGetUserPublicInfoFromPlatform } from '../../../../../hooks/useGetUserPublicInfoFromPlatform';

interface RewardSetAsPaidActivityProps {
  event: BaseEventPrimitives;
  issue: IssuePrimitive;
}

export const RewardSetAsPaidActivity: FC<RewardSetAsPaidActivityProps> = ({ event }) => {
  const attributes = event.attributes as {
    rewards: RewardPrimitive[];
    issue: IssuePrimitive;
    rewardsTotalPrice: PricePrimitive;
    creatorId: string;
  };

  const platform = attributes.issue.platform;

  const {
    isLoading: isLoadingGetCreator,
    username: rewardCreatorUsername,
    avatarURL: rewardCreatorAvatarURL,
    usernameLink: rewardCreatorUsernameLink,
  } = useGetUserPublicInfoFromPlatform({ userId: attributes.creatorId, platform });

  const {
    isLoading: isLoadingGetRewardedUser,
    username: rewardedUserUsername,
    avatarURL: rewardedUserAvatarURL,
    usernameLink: rewardedUserUsernameLink,
  } = useGetUserPublicInfoFromPlatform({
    userId: attributes.rewards[0].rewardedUserId as string,
    platform,
  });

  const isLoading = isLoadingGetCreator || isLoadingGetRewardedUser;

  return (
    <Timeline.Item
      title="Reward paid"
      bullet={
        <AvatarGroup>
          <Avatar src={rewardCreatorAvatarURL} alt={rewardCreatorUsername} size="sm" radius="xl" />
          <Avatar src={rewardedUserAvatarURL} alt={rewardedUserUsername} size="sm" radius="xl" />
        </AvatarGroup>
      }
    >
      {isLoading && <Skeleton height={'2rem'} radius="xl" />}

      {!isLoading && (
        <Text c="dimmed" size="sm">
          <Link href={rewardCreatorUsernameLink}>@{rewardCreatorUsername}</Link> paid{' '}
          <Text variant="gradient" component="span" style={{ fontWeight: 'bold' }}>
            {formatPrice(attributes.rewardsTotalPrice)}
          </Text>{' '}
          in rewards to <Link href={rewardedUserUsernameLink}>@{rewardedUserUsername}</Link>
        </Text>
      )}

      <Text size="xs" mt={4}>
        {getRelativeTime(new Date(event.occurredOn))}
      </Text>
    </Timeline.Item>
  );
};
