import { Grid, GridCol } from "@mantine/core";
import { FC } from "react";

export function InfinityListSkeleton({
    ItemSkeletonComponent,
}: {
    items: number;
    ItemSkeletonComponent: FC;
}) {
    return (
        <Grid gutter={25} grow>
            {[...Array(10).keys()].map((number) => (
                <GridCol span={4} key={`${number}-grid-cell`}>
                    <ItemSkeletonComponent />
                </GridCol>
            ))}
        </Grid>
    );
}
