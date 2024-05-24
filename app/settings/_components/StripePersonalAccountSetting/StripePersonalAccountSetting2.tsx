
'use client'

import { Button, Center, Text } from "@mantine/core";
import { IconBrandStripe } from "@tabler/icons-react";
import { FC } from "react";


interface StripeSettingsProps {
    hasStripeConfigured: boolean;
}

export const StripePersonalAccountSetting2: FC<StripeSettingsProps> = ({
    hasStripeConfigured,
}) => {
    async function completeStripeOnboarding() {
        const clientId = process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID!;
        const scope: 'read_write' | 'read_only' = 'read_write';
        const redirectUri = `${process.env.NEXT_PUBLIC_URL}/auth/stripe`;

        const urlForAuth = `https://connect.stripe.com/oauth/authorize?response_type=code&amp;client_id=${clientId}&amp;scope=${scope}&amp;redirect_uri=${redirectUri}&amp;`;
        // window.open(urlForAuth, '_blank');
        window.open(urlForAuth, '_self');
    }

    // TODO: Review if we should let users un-connect their account https://docs.stripe.com/connect/oauth-reference#post-deauthorize
    if (hasStripeConfigured) {
        return (
            <Center>
                <Button
                    radius='2rem'
                    size="lg"
                    variant="gradient"
                    disabled={true}
                >
                    <IconBrandStripe style={{ marginRight: '8px' }} />
                    <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                        Stripe account already connected
                    </Text>
                </Button>
            </Center>
        )
    }

    return (
        <Center>
            <Button
                radius='2rem'
                size="lg"
                variant="gradient"
                onClick={completeStripeOnboarding}
            >
                <IconBrandStripe style={{ marginRight: '8px' }} />
                <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                    Connect with Stripe
                </Text>
            </Button>
        </Center>
    )
}