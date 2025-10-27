import { ChallengeDTO } from '../../../../../_core/_primitives/ChallengePrimitive';
import React, { FC } from 'react';
import { UserAuthDTO } from '../../../../../_core/_dtos/UserAuthDTO';
import { Divider, Box, Space } from '@mantine/core';
import { ChallengeMainData } from '../../shared/ChallengeMainData';
import { NewChallengeSection } from '../../shared/NewChallengeSection';
import { PrizesSection } from '../../shared/PrizesSection';
import { useGetChallenge } from '../../../../../../hooks/useGetChallenge';
import { PublishedChallengeCreatorParticipationsSection } from '../published/PublishedChallengeCreatorParticipationsSection';
import { ChallengeLeaderboard } from '../../shared/ChallengeLeaderboard';

interface CompletedChallengeCreatorDataProps {
  challenge: ChallengeDTO;
  creator: UserAuthDTO;
}

export const CompletedChallengeCreatorData: FC<CompletedChallengeCreatorDataProps> = ({
  challenge: initialChallenge,
  creator,
}) => {
  const { challenge } = useGetChallenge({
    initialChallenge,
    revalidateOnFocus: true,
  });

  return (
    <Box>
      <ChallengeMainData challenge={challenge} />

      <Divider my="xl" />
      <PrizesSection challenge={challenge} />

      <Space h="4rem" />
      <ChallengeLeaderboard challenge={challenge} />

      <Space h="4rem" />
      <PublishedChallengeCreatorParticipationsSection challenge={challenge} />

      <Space h="4rem" />
      <NewChallengeSection challenge={challenge} userAuth={creator} />

      <Space h="2rem" />
    </Box>
  );
};
