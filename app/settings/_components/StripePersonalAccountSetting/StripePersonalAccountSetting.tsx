
'use client'

import { Button, Center, Flex, Space, Text } from "@mantine/core";
import { IconBrandStripe, IconCornerDownRight, IconCirclePlus } from "@tabler/icons-react";
import { FC, useState } from "react";
import { API_ROUTES } from "../../../../constants";
import { useRouter } from "next/navigation";
import { clientCustomFetch } from "../../../_utils/clientCustomFetch";


interface StripeSettingsProps {
    hasStripeConfigured: boolean;
    email: string | null,
    userId: string,
}

export const StripePersonalAccountSetting: FC<StripeSettingsProps> = ({
    hasStripeConfigured,
    email,
    userId,
}) => {
    const [isDisconnectingAccount, setIsDisconnectingAccount] = useState(false);
    const [isCreatingExpressAccount, setIsCreatingExpressAccount] = useState(false);
    const [isOpeningExpressAccountOnboarding, setIsOpeningExpressAccountOnboarding] = useState(false);

    const router = useRouter();

    async function connectStripeAccount() {
        const clientId = process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID!;
        const scope: 'read_write' | 'read_only' = 'read_write';
        const redirectUri = `${process.env.NEXT_PUBLIC_URL}/auth/stripe`;
        const state = userId;

        const urlForAuth = `https://connect.stripe.com/oauth/authorize?response_type=code&amp;client_id=${clientId}&amp;scope=${scope}&amp;redirect_uri=${redirectUri}&amp;state=${state}`;
        window.open(urlForAuth, '_self');
    }

    async function disconnectStripeAccount() {
        try {
            setIsDisconnectingAccount(true);

            await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_DISCONNECT_ACCOUNT(), {
                method: "POST",
                body: {
                    userId
                }
            });
        } finally {
            setIsDisconnectingAccount(false);
            router.refresh()
        }
    }


    async function createExpressAccount() {
        try {
            setIsCreatingExpressAccount(true);

            const response = await clientCustomFetch(API_ROUTES.PAYMENTS.EXPRESS_ACCOUNT(), {
                method: "POST"
            });
            const data = await response.json();

            if (data) {
                window.open(data.url, '_blank');
            }
        } finally {
            setIsCreatingExpressAccount(false);
            router.refresh()
        }
    }

    async function openExpressAccountOnboarding() {
        try {
            setIsOpeningExpressAccountOnboarding(true);

            const response = await clientCustomFetch(API_ROUTES.PAYMENTS.EXPRESS_ACCOUNT());
            const data = await response.json();

            if (data) {
                window.open(data.url, '_blank');
            }
        } finally {
            setIsOpeningExpressAccountOnboarding(false);
        }
    }

    if (hasStripeConfigured) {
        const stripeLoginURL = 'https://connect.stripe.com/login';

        return (
            <div>
                {email && <Text c='dimmed'>Connected with {email}</Text>}
                <Space h='0.6rem' />

                <Center>
                    <Flex gap='1rem' wrap={'wrap'}>
                        <Button
                            radius='2rem'
                            size="lg"
                            variant="gradient"
                            component="a"
                            target="_blank"
                            href={stripeLoginURL}
                        >
                            <IconCornerDownRight style={{ marginRight: '8px' }} />
                            <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                                Go to your Stripe dashboard
                            </Text>
                        </Button>

                        <Button
                            radius='2rem'
                            size="lg"
                            variant="outline"
                            color="red"
                            loading={isOpeningExpressAccountOnboarding}
                            onClick={openExpressAccountOnboarding}
                        >
                            <IconBrandStripe style={{ marginRight: '8px' }} />
                            <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                                Configure your Stripe account
                            </Text>
                        </Button>

                        <Button
                            radius='2rem'
                            size="lg"
                            variant="outline"
                            color="red"
                            loading={isDisconnectingAccount}
                            onClick={disconnectStripeAccount}
                        >
                            <IconBrandStripe style={{ marginRight: '8px' }} />
                            <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                                Disconnect Stripe account
                            </Text>
                        </Button>
                    </Flex>
                </Center>
            </div>
        )
    }

    return (
        <Center>
            <Flex gap='1rem' wrap={'wrap'}>

                <Button
                    radius='2rem'
                    size="lg"
                    variant="gradient"
                    onClick={connectStripeAccount}
                >
                    <IconBrandStripe style={{ marginRight: '8px' }} />
                    <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                        Connect with Stripe (~40 countries)
                    </Text>
                </Button>

                <Button
                    radius='2rem'
                    size="lg"
                    variant="gradient"
                    color="green"
                    loading={isCreatingExpressAccount}
                    onClick={createExpressAccount}
                >
                    <IconCirclePlus style={{ marginRight: '8px' }} />
                    <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                        Create Express account (+120 countries)
                    </Text>
                </Button>

            </Flex>


        </Center>
    )
}