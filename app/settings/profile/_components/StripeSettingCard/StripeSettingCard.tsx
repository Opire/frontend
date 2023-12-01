'use client'

import { Card, Grid, Text, GridCol } from "@mantine/core";
import { IconBrandStripe } from "@tabler/icons";
import { FC } from "react";
import { API_ROUTES } from "../../../../../constants";
import { clientCustomFetch } from "../../../../_utils/clientCustomFetch";

interface StripeSettingCardProps {
    hasStripeConfigured: boolean;
}

export const StripeSettingCard: FC<StripeSettingCardProps> = ({
    hasStripeConfigured,
}) => {
    async function completeStripeData() {
        const response = await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_LINK_CONFIGURE_ACCOUNT());
        const data = await response.json();

        if (data) {
            window.open(data.url, '_blank');
        }
    }

    return (
        <Card
            withBorder
            onClick={() => {
                if (hasStripeConfigured) {
                    return
                }

                completeStripeData()
            }}
            style={{
                width: '400px',
                cursor: hasStripeConfigured ? 'default' : 'pointer',
                borderColor: hasStripeConfigured ? 'teal' : 'gray'
            }}
        >
            <Grid>
                <GridCol span={4} >
                    <IconBrandStripe width={'100%'} height={'100%'} color={hasStripeConfigured ? 'teal' : 'gray'} />
                </GridCol>
                <GridCol span={'auto'} style={{ display: 'flex', alignItems: 'center' }}>
                    {
                        hasStripeConfigured
                            ? <Text>
                                Congratulations, your Stripe account is ready to start receiving transfers
                            </Text>
                            :
                            <>
                                <Text>
                                    You need to complete the onboarding of your Stripe account before you can receive money.
                                </Text>

                                <Text variant="gradient" fw={700}>
                                    Click here to go to the onboarding process
                                </Text>
                            </>
                    }
                </GridCol>
            </Grid>
        </Card>
    )
}