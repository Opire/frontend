'use client';

import { Grid } from "@mantine/core";
import { ChallengePrimitive } from "../../../_core/_primitives/ChallengePrimitive";
import { PreviewPublishedChallengePublicData } from "./_component/PreviewPublishedChallengePublicData";

export function PreviewPublishedChallengeView({
    challenge,
}: {
    challenge: ChallengePrimitive;
}) {
    return (
        <Grid h={'100%'}>
            <Grid.Col span={{ base: 12 }}>
                <PreviewPublishedChallengePublicData challenge={challenge} />
            </Grid.Col>
        </Grid>
    );
}
