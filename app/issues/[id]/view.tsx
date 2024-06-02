'use client'

import { IssuePrimitive } from "../../_core/_primitives/IssuePrimitive";
import { Grid } from "@mantine/core";
import { IssueActivity } from "./_components/IssueActivity";
import { DetailedIssueMainData } from "./_components/DetailedIssueMainData";

export function DetailedIssueView({
    issue,
}: {
    issue: IssuePrimitive,
}) {

    return (
        <Grid h={'100%'}>
            <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                <DetailedIssueMainData issue={issue} />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4, lg: 3 }} h='100%'>
                <IssueActivity issue={issue} />
            </Grid.Col>
        </Grid>
    );
}
