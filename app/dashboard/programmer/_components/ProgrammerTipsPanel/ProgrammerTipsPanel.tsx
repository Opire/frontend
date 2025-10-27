import { Divider, Loader, Space, Text } from '@mantine/core';
import { TipCardSkeleton } from './components/TipCardSkeleton';
import { ProgrammerTipCard } from './components/ProgrammerTipCard';
import { InfinityList } from '../../../../_components/InfinityList';
import { useTipsByProgrammer } from '../../../../../hooks/useTipsByProgrammer';
import { useGetFilteredById } from '../../../../../hooks/useGetFilteredById';
import { NothingFound } from '../../../../_components/NothingFound';

export function ProgrammerTipsPanel() {
  const { tips: allTips, isLoading } = useTipsByProgrammer();
  const tips = useGetFilteredById(allTips);

  const unpaidTips = [...tips].filter(tip => tip.status === 'Pending payment');
  const paidTips = [...tips].filter(tip => tip.status === 'Paid');

  const hasUnpaidTips = unpaidTips.length > 0;
  const hasPaidTips = paidTips.length > 0;

  const noTips = !hasUnpaidTips && !hasPaidTips;

  if (isLoading) {
    return <Loader display="block" size="xl" m="30px auto" />;
  }

  if (noTips) {
    return <NothingFound />;
  }

  return (
    <div>
      {hasUnpaidTips && (
        <>
          <Text fw={900} size={'xl'}>
            Waiting for payment
          </Text>
          <Space h="12px" />
          <InfinityList
            keyIdentifier="id"
            items={unpaidTips}
            isLoading={isLoading}
            loadNextPage={() => {}}
            ItemComponent={ProgrammerTipCard}
            ItemSkeletonComponent={TipCardSkeleton}
          />
        </>
      )}

      {hasUnpaidTips && hasPaidTips && <Divider my="xl" />}

      {hasPaidTips && (
        <>
          <Text fw={900} size={'xl'}>
            Paid
          </Text>
          <Space h="12px" />
          <InfinityList
            keyIdentifier="id"
            items={paidTips}
            isLoading={isLoading}
            loadNextPage={() => {}}
            ItemComponent={ProgrammerTipCard}
            ItemSkeletonComponent={TipCardSkeleton}
          />
        </>
      )}
    </div>
  );
}
