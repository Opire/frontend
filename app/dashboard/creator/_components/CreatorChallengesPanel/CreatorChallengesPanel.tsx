import { useState } from 'react';
import { Button, Divider, Loader, Space, Text } from '@mantine/core';
import { ChallengeCard } from './components/ChallengeCard';
import { ChallengeCardSkeleton } from './components/ChallengeCardSkeleton';
import { InfinityList } from '../../../../_components/InfinityList';
import { useGetFilteredById } from '../../../../../hooks/useGetFilteredById';
import { NothingFound } from '../../../../_components/NothingFound';
import { useGetChallengesByCreator } from '../../../../../hooks/useGetChallengesByCreator';
import { IconPlus, IconX } from '@tabler/icons-react';
import { API_ROUTES } from '../../../../../constants';
import { clientCustomFetch } from '../../../../_utils/clientCustomFetch';
import { notifications } from '@mantine/notifications';
import { ChallengePrimitive } from '../../../../_core/_primitives/ChallengePrimitive';
import { useRouter } from 'next/navigation';

export function CreatorChallengesPanel() {
  const router = useRouter();
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);

  const { challenges: allChallenges, isLoadingChallenges } = useGetChallengesByCreator();
  const challenges = useGetFilteredById(allChallenges);

  const draftChallenges = [...challenges].filter(challenge => challenge.isPublished === false);
  const publishedChallenges = [...challenges].filter(challenge => challenge.isPublished === true);

  const hasDraftChallenges = draftChallenges.length > 0;
  const hasPublishedChallenges = publishedChallenges.length > 0;

  const noChallenges = !hasDraftChallenges && !hasPublishedChallenges;

  async function createNewChallenge() {
    try {
      setIsCreatingChallenge(true);

      const response = await clientCustomFetch(API_ROUTES.CHALLENGES.CREATE(), {
        method: 'POST',
      });

      const newChallenge = (await response.json()) as ChallengePrimitive;

      router.push(`/challenges/${newChallenge.id}`);
    } catch (error) {
      console.log({ error });
      notifications.show({
        title: 'Error while trying to create the challenge',
        message: '',
        withBorder: true,
        withCloseButton: true,
        autoClose: 10_000,
        color: 'red',
        icon: <IconX />,
      });
      setIsCreatingChallenge(false);
    }
  }

  if (isLoadingChallenges) {
    return <Loader display="block" size="xl" m="30px auto" />;
  }

  if (noChallenges) {
    return (
      <div>
        <div>
          <Button
            onClick={createNewChallenge}
            size="md"
            leftSection={<IconPlus size={18} />}
            variant="gradient"
            loading={isCreatingChallenge}
            disabled={isCreatingChallenge}
          >
            Create a new challenge
          </Button>
        </div>

        <Space h="xl" />

        <NothingFound />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Button
          onClick={createNewChallenge}
          size="md"
          leftSection={<IconPlus size={18} />}
          variant="gradient"
          loading={isCreatingChallenge}
          disabled={isCreatingChallenge}
        >
          Create a new challenge
        </Button>
      </div>

      <Space h="xl" />

      {hasDraftChallenges && (
        <>
          <Text fw={900} size={'xl'}>
            Draft
          </Text>
          <Space h="12px" />

          <InfinityList
            items={draftChallenges}
            keyIdentifier="id"
            isLoading={isLoadingChallenges}
            loadNextPage={() => {}}
            ItemComponent={ChallengeCard}
            ItemSkeletonComponent={ChallengeCardSkeleton}
          />
        </>
      )}

      {hasDraftChallenges && hasPublishedChallenges && <Divider my="xl" />}

      {hasPublishedChallenges && (
        <>
          <Text fw={900} size={'xl'}>
            Published
          </Text>
          <Space h="12px" />
          <InfinityList
            items={publishedChallenges}
            keyIdentifier="id"
            isLoading={isLoadingChallenges}
            loadNextPage={() => {}}
            ItemComponent={ChallengeCard}
            ItemSkeletonComponent={ChallengeCardSkeleton}
          />
        </>
      )}
    </div>
  );
}
