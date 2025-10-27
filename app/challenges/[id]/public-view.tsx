'use client';

import { ChallengeDTO } from '../../_core/_primitives/ChallengePrimitive';
import { Grid } from '@mantine/core';
import { UserAuthDTO } from '../../_core/_dtos/UserAuthDTO';
import React from 'react';
import { PublishedChallengePublicData } from './_components/public/published/PublishedChallengePublicData';
import { DraftChallengePublicData } from './_components/public/draft/DraftChallengePublicData';
import { CompletedChallengePublicData } from './_components/public/completed/CompletedChallengePublicData';

export function ChallengePublicView({
  challenge,
  userAuth,
}: {
  challenge: ChallengeDTO;
  userAuth: UserAuthDTO | null;
}) {
  if (!challenge.isPublished) {
    return (
      <Grid h={'100%'}>
        <Grid.Col span={{ base: 12 }}>
          <DraftChallengePublicData challenge={challenge} />
        </Grid.Col>
      </Grid>
    );
  }

  if (!challenge.isCompleted) {
    return (
      <Grid h={'100%'}>
        <Grid.Col span={{ base: 12 }}>
          <PublishedChallengePublicData challenge={challenge} userAuth={userAuth} />
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Grid h={'100%'}>
      <Grid.Col span={{ base: 12 }}>
        <CompletedChallengePublicData challenge={challenge} userAuth={userAuth} />
      </Grid.Col>
    </Grid>
  );
}
