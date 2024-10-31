'use client';

import { Grid } from "@mantine/core";
import { ChallengeDTO } from "../../../_core/_primitives/ChallengePrimitive";
import { EditPublishedChallengeForm } from "./_component/EditPublishedChallengeForm";

export function EditPublishedChallengeView({
    challenge,
}: {
    challenge: ChallengeDTO;
}) {
    return (
        <Grid h={'100%'}>
            <Grid.Col span={{ base: 12 }}>
                <EditPublishedChallengeForm challenge={challenge} />
            </Grid.Col>
        </Grid>
    );
}
