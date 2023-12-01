'use client'

import { Text, Accordion, Flex } from "@mantine/core";
import { FC } from "react";
import { API_ROUTES } from "../../../../../constants";
import { clientCustomFetch } from "../../../../_utils/clientCustomFetch";
import { Check, Coin, Loader, Moneybag, Receipt, Wallet } from "tabler-icons-react";


interface StripeSettingProps {
    hasStripeConfigured: boolean;
}

export const StripeSetting: FC<StripeSettingProps> = ({
    hasStripeConfigured,
}) => {

    async function completeStripeData() {
        const response = await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_LINK_CONFIGURE_ACCOUNT());
        const data = await response.json();

        if (data) {
            window.open(data.url, '_blank');
        }
    }

    const stripInfo = [
        {
            id: 'create-account',
            icon: <Check color="lightgreen" />,
            label: 'Payment account automatically created',
            content: "",
        },
        {
            id: 'configure-account',
            icon: hasStripeConfigured ? <Check color="lightgreen" /> : <Wallet />,
            label: hasStripeConfigured ? 'Account configured and active' : 'Configure your payment account',
            content: "",
        },
        {
            id: 'access-account',
            icon: hasStripeConfigured ? <Coin color="#FFCC66" /> : <Receipt />,
            label: hasStripeConfigured ? 'Check your payments' : 'Check your payments when you have your account fully configured',
            content: '',
        },
    ];

    return (
        <Accordion chevronPosition="left" variant="contained" w='100%'>
            {stripInfo.map((item) => (
                <Accordion.Item value={item.id} key={item.label}>
                    <Accordion.Control>
                        <Flex gap='8px'>
                            {item.icon} {item.label}
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Text size="sm">{item.content}</Text>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}