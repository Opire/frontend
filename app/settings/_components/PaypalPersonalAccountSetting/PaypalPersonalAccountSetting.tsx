'use client'

import { Button, Center, Text } from "@mantine/core";
import { IconBrandPaypal } from "@tabler/icons-react";
import { FC, useState } from "react";
import { API_ROUTES } from "../../../../constants";
import { clientCustomFetch } from "../../../_utils/clientCustomFetch";

interface PaypalSettingProps {
    hasPaypalConfigured: boolean;
}

export const PaypalPersonalAccountSetting: FC<PaypalSettingProps> = ({
    hasPaypalConfigured,
}) => {
    const [isLoadingLink, setIsLoadingLink] = useState(false);

    async function completePayPalOnboarding() {
        setIsLoadingLink(true);

        try {
            const response = await clientCustomFetch(API_ROUTES.PAYMENTS.PAYPAL_LINK_CONFIGURE_ACCOUNT());
            const data = await response.json();

            if (data) {
                window.open(data.url, '_blank');
            }

            setIsLoadingLink(false);
        } catch (error) {
            setIsLoadingLink(false);
        }
    }

    if (hasPaypalConfigured) {
        return (
            <Center>
                <Button
                    radius='2rem'
                    size="lg"
                    variant="gradient"
                    disabled={true}
                >
                    <IconBrandPaypal style={{ marginRight: '8px' }} />
                    <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                        PayPal account already connected
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
                disabled={isLoadingLink}
                loading={isLoadingLink}
                onClick={completePayPalOnboarding}
            >
                <IconBrandPaypal style={{ marginRight: '8px' }} />
                <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                    Connect with PayPal
                </Text>
            </Button>
        </Center>
    )
}

