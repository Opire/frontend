import { Card, Grid, Skeleton, GridCol } from "@mantine/core";
import { IconBrandStripe } from "@tabler/icons";
import { FC } from "react";

export const StripeSettingCardSkeleton: FC<{}> = ({
}) => {
    return (
        <Card
            withBorder
            style={{
                width: '400px',
            }}
        >
            <Grid>
                <GridCol span={4} >
                    <IconBrandStripe width={'100%'} height={'100%'} color={'gray'} />
                </GridCol>
                <GridCol
                    span={'auto'}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Skeleton height={10} radius="xl" />
                    <Skeleton height={10} mt={12} radius="xl" />
                    <Skeleton height={10} mt={12} radius="xl" />
                    <Skeleton height={10} mt={12} width="70%" radius="xl" />
                </GridCol>
            </Grid>
        </Card>
    )
}