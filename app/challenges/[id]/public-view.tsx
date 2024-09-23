'use client'

import { ChallengePrimitive } from "../../_core/_primitives/ChallengePrimitive";
import { Grid } from "@mantine/core";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";
import React from "react";
import { PublishedChallengePublicData } from './_components/public/published/PublishedChallengePublicData'
import { DraftChallengePublicData } from "./_components/public/draft/DraftChallengePublicData";

export function ChallengePublicView({
    challenge,
    userAuth,
}: {
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}) {
    if (!challenge.isPublished) {
        return (
            <Grid h={'100%'}>
                <Grid.Col span={{ base: 12 }}>
                    <DraftChallengePublicData challenge={challenge} userAuth={userAuth} />
                </Grid.Col>
            </Grid>
        );
    }

    return (
        <Grid h={'100%'}>
            <Grid.Col span={{ base: 12 }}>
                <PublishedChallengePublicData challenge={challenge} userAuth={userAuth} />
            </Grid.Col>
        </Grid>
    );
}
