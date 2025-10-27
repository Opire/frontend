import {
  Avatar,
  Badge,
  Card,
  CardSection,
  Center,
  Flex,
  Group,
  Skeleton,
  Text,
  Tooltip,
} from '@mantine/core';
import { FC, Ref } from 'react';
import { useRouter } from 'next/navigation';
import { ChallengePrimitive } from '../../../_core/_primitives/ChallengePrimitive';
import { useHover } from '@mantine/hooks';
import { useGetUserPublicInfoFromAnyPlatform } from '../../../../hooks/useGetUserPublicInfoFromAnyPlatform';
import { getRelativeTime } from '../../../_utils/getRelativeTime';
import { ChallengePrizePrimitive } from '../../../_core/_primitives/ChallengePrizePrimitive';
import { PricePrimitive } from '../../../_core/_primitives/PricePrimitive';
import { PriceUnit } from '../../../_core/_vos/PriceUnit';
import {
  isPrimitiveSpecificPositionPrize,
  isPrimitiveThresholdPrize,
  isPrimitiveThresholdWithoutLimitPrize,
} from '../../../_utils/challengePrizes';

interface ChallengeCardProps {
  data: ChallengePrimitive;
  inputRef?: Ref<HTMLDivElement>;
}

export const ChallengeCard: FC<ChallengeCardProps> = ({ data: challenge, inputRef }) => {
  const router = useRouter();
  const { isLoading, username, avatarURL } = useGetUserPublicInfoFromAnyPlatform({
    userId: challenge.creatorId,
  });
  const { hovered, ref: hoverRef } = useHover();

  const redirectToDetails = () => {
    router.push(`/challenges/${challenge.id}`);
  };

  return (
    <Card
      ref={hoverRef}
      withBorder
      shadow="md"
      radius="md"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'transform 100ms ease-out',
        transform: hovered ? 'scale(1.01)' : '',
      }}
      onClick={redirectToDetails}
    >
      <CardSection withBorder p="sm" ref={inputRef}>
        <Flex align={'center'} gap={'8px'}>
          {!isLoading ? (
            <>
              <Tooltip label={username}>
                <Avatar src={avatarURL} alt={username} size="md" radius="xl" />
              </Tooltip>
              <Text lineClamp={2} fw={500}>
                {challenge.title}
              </Text>
            </>
          ) : (
            <Skeleton h="2rem" />
          )}
        </Flex>
      </CardSection>

      <CardSection p="sm">
        <Group style={{ gap: '6px' }}>
          {challenge.isCompleted ? (
            <Badge variant="outline" color="cyan">
              Completed
            </Badge>
          ) : (
            <Badge variant="outline" color="green">
              Active
            </Badge>
          )}

          {!challenge.isAcceptingParticipations && (
            <Badge variant="outline" color="orange">
              Closed for new participations
            </Badge>
          )}
        </Group>
      </CardSection>

      <CardSection p="sm">
        <Center>
          <Text c={'dimmed'} fw={500} lineClamp={2}>
            {challenge.summary}
          </Text>
        </Center>
      </CardSection>

      <CardSection p="sm">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {challenge.configuration.prizes.map((prize, index) => (
            <div key={index}>
              <ChallengeCardPrice prize={prize} />
            </div>
          ))}
        </div>
      </CardSection>

      <CardSection withBorder p="md">
        <Group justify="flex-end" align="flex-end" style={{ height: '100%' }} wrap="nowrap">
          <Text
            c="dimmed"
            size="xs"
            style={{
              textAlign: 'end',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Created</span>
            <span>{getRelativeTime(new Date(challenge.createdAt))}</span>
          </Text>
        </Group>
      </CardSection>
    </Card>
  );
};

export function ChallengeCardPrice({ prize }: { prize: ChallengePrizePrimitive }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {isPrimitiveSpecificPositionPrize(prize) && <>#{prize.position}</>}
      {isPrimitiveThresholdPrize(prize) && (
        <>
          #{prize.fromPosition} - {prize.toPosition}
        </>
      )}
      {isPrimitiveThresholdWithoutLimitPrize(prize) && <>#{prize.fromPosition} - no limit</>}

      <Text variant="gradient" style={{ fontSize: '2.4rem', fontWeight: 'bold' }}>
        {prize.amount ? formatCompactPrice(prize.amount) : 'No prize'}
      </Text>
    </div>
  );
}

function formatCompactPrice(price: PricePrimitive) {
  let usd = price.value;

  if (price.unit === PriceUnit.USD_CENT.value) {
    usd = price.value / 100;
  }

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    notation: 'compact',
    currency: 'USD',
  }).format(usd);
}
