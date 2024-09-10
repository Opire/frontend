'use client'

import { ChallengePrimitive } from "../../_core/_primitives/ChallengePrimitive";
import { Grid } from "@mantine/core";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";
import React from "react";
import { PublishedChallengePublicDataData } from './_components/public/PublishedChallengePublicData'

export function ChallengePublicView({
    challenge,
    userAuth,
}: {
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}) {
    return (
        <Grid h={'100%'}>
            <PublishedChallengePublicDataData challenge={challenge} userAuth={userAuth}/>
        </Grid>
    );
}
