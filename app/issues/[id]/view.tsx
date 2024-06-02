'use client'

import { useState } from "react";
import { IssuePrimitive } from "../../_core/_primitives/IssuePrimitive";
import { Grid } from "@mantine/core";
import { IssueActivity } from "./_components/IssueActivity";

export function DetailedIssueView({
    issue,
}: {
    issue: IssuePrimitive,
}) {

    return (
        <Grid h={'100%'}>
            <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                Main data
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4, lg: 3 }} h='100%'>
                <IssueActivity issue={issue} />
            </Grid.Col>
        </Grid>
    );
}
