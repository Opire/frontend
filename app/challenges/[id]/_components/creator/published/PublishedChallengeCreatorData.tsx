import { ChallengeDTO } from '../../../../../_core/_primitives/ChallengePrimitive';
import React, { FC } from 'react';
import { UserAuthDTO } from '../../../../../_core/_dtos/UserAuthDTO';
import { Divider, Box, Space, Button } from '@mantine/core';
import { ChallengeMainData } from '../../shared/ChallengeMainData';
import { NewChallengeSection } from '../../shared/NewChallengeSection';
import { PrizesSection } from '../../shared/PrizesSection';
import { useGetChallenge } from '../../../../../../hooks/useGetChallenge';
import { CompleteChallengeForm } from './CompleteChallengeForm';
import { PublishedChallengeCreatorParticipationsSection } from './PublishedChallengeCreatorParticipationsSection';
import { useRouter } from 'next/navigation';

interface PublishedChallengeCreatorDataProps {
  challenge: ChallengeDTO;
  creator: UserAuthDTO;
}

export const PublishedChallengeCreatorData: FC<PublishedChallengeCreatorDataProps> = ({
  challenge: initialChallenge,
  creator,
}) => {
  const { challenge } = useGetChallenge({
    initialChallenge,
    revalidateOnFocus: true,
  });

  const router = useRouter();

  function goToEditChallenge() {
    router.push(`/challenges/${challenge.id}/edit`);
  }

  return (
    <Box>
      <ChallengeMainData challenge={challenge} />

      <Divider my="xl" />
      <PrizesSection challenge={challenge} />

      <Space h="4rem" />
      <PublishedChallengeCreatorParticipationsSection challenge={challenge} />

      <Space h="2rem" />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
        <Button onClick={goToEditChallenge} variant="subtle" size="md">
          Edit challenge
        </Button>

        <CompleteChallengeForm challenge={challenge} />
      </div>

      <Space h="4rem" />
      <NewChallengeSection challenge={challenge} userAuth={creator} />

      <Space h="2rem" />
    </Box>
  );
};
