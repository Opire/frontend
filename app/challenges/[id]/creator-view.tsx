'use client'

import { Grid } from "@mantine/core";
import { DraftChallengeCreatorData } from "./_components/creator/draft/DraftChallengeCreatorData";
import { PublishedChallengeCreatorData } from "./_components/creator/published/PublishedChallengeCreatorData";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";
import { ChallengePrimitive } from "../../_core/_primitives/ChallengePrimitive";

export function ChallengeCreatorView({
    challenge,
    creator,
}: {
    challenge: ChallengePrimitive;
    creator: UserAuthDTO;
}) {
    if(!challenge.isPublished) {
        return (
            <Grid h={'100%'}>
                <Grid.Col span={{ base: 12 }}>
                    <DraftChallengeCreatorData challenge={challenge} creator={creator} />
                </Grid.Col>
            </Grid>
        );
    }

    return (
        <Grid h={'100%'}>
            <Grid.Col span={{ base: 12 }}>
                <PublishedChallengeCreatorData challenge={challenge} creator={creator} />
            </Grid.Col>
        </Grid>
    );
}
