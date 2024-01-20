'use client'

import { Text, Accordion, Flex, Anchor, LoadingOverlay, Box } from "@mantine/core";
import { FC, useState } from "react";
import { IconReceipt, IconReceiptOff, IconUserCheck, IconWallet, IconWalletOff } from "@tabler/icons-react";
import Link from "next/link";
import { API_ROUTES, URL_DOCUMENTATION } from "../../../../constants";
import { clientCustomFetch } from "../../../_utils/clientCustomFetch";

interface StripeSettingProps {
    hasStripeConfigured: boolean;
}

export const StripePersonalAccountSetting: FC<StripeSettingProps> = ({
    hasStripeConfigured,
}) => {

    const stripInfo = [
        {
            id: 'create-account',
            icon: <IconUserCheck color="lightgreen" />,
            label: 'Payment account automatically created',
            content: <InfoPaymentAccountCreated />,
            defaultOpen: false,
        },
        {
            id: 'configure-account',
            icon: hasStripeConfigured ? <IconWallet color="lightgreen" /> : <IconWalletOff color="lightgray" />,
            label: hasStripeConfigured ? 'Stripe account active 🥳 ' : 'Configure your payment account',
            content: hasStripeConfigured ? <ConfigureStripeAccountSuccess /> : <ConfigureStripeAccountPending />,
            defaultOpen: !hasStripeConfigured,
        },
        {
            id: 'access-account',
            icon: hasStripeConfigured ? <IconReceipt color="#26C6DA" /> : <IconReceiptOff color="#26C6DA" />,
            label: hasStripeConfigured ? 'Check your payments 💰' : 'Check your payments once you have your account fully configured',
            content: hasStripeConfigured ? <GoToStripeAccountSuccess /> : <GoToStripeAccountPending />,
            defaultOpen: hasStripeConfigured,
        },
    ];

    return (
        <Accordion chevronPosition="left" variant="contained" w='100%' defaultValue={stripInfo.find(info => info.defaultOpen)!.id}>
            {stripInfo.map((item) => (
                <Accordion.Item value={item.id} key={item.label}>
                    <Accordion.Control>
                        <Flex gap='8px'>
                            {item.icon} {item.label}
                        </Flex>
                    </Accordion.Control>

                    <Accordion.Panel>
                        {item.content}
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion >
    );
}

function InfoPaymentAccountCreated(): JSX.Element {
    const documentationURL = `${URL_DOCUMENTATION}/payment-account`; //TODO: review
    const stripeDocumentationURL = 'https://stripe.com/docs/connect/standard-accounts';

    return (
        <Text c="dimmed">
            The first time you logged in Opire, we automatically created a <Anchor component={Link} href={stripeDocumentationURL} target="_blank">Stripe account</Anchor> for you. This Stripe account will be used for receiving payments from this app.
            <br />
            <br />
            For more information, check <Anchor component={Link} href={documentationURL} target="_blank">our documentation</Anchor>.
        </Text>
    )
}

function ConfigureStripeAccountPending(): JSX.Element {
    const [isLoadingLink, setIsLoadingLink] = useState(false);

    async function completeStripeData() {
        setIsLoadingLink(true);

        const response = await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_LINK_CONFIGURE_ACCOUNT());
        const data = await response.json();


        if (data) {
            window.open(data.url, '_blank');
        }
        setIsLoadingLink(false);
    }

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoadingLink} />

                <Text c="dimmed">
                    If you want to receive payments from Opire, you need to finish the configuration of your Stripe account. <Anchor fw={'bold'} component={'button'} onClick={completeStripeData}>Click here to complete your Stripe account data</Anchor>.
                </Text>
            </Box>
        </>
    )
}

function ConfigureStripeAccountSuccess(): JSX.Element {
    const [isLoadingLink, setIsLoadingLink] = useState(false);

    async function completeStripeData() {
        setIsLoadingLink(true);

        const response = await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_LINK_CONFIGURE_ACCOUNT());
        const data = await response.json();


        if (data) {
            window.open(data.url, '_blank');
        }
        setIsLoadingLink(false);
    }

    const documentationURL = `${URL_DOCUMENTATION}/payments`; //TODO: review

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoadingLink} />

                <Text c="dimmed">
                    Congrats! 👏🏼 You can receive payments from Opire 🎉 For more information, check <Anchor component={Link} href={documentationURL} target="_blank">our documentation</Anchor>.
                    <br />
                    <br />
                    If you want to update the configuration of your payment account, <Anchor fw={'bold'} component={'button'} onClick={completeStripeData}>click here</Anchor>.
                </Text>
            </Box>
        </>
    )
}

function GoToStripeAccountPending(): JSX.Element {

    return (
        <Text c="dimmed">
            😔 Sorry, you need to have your Stripe account configured before you can start checking your payments.
        </Text>
    )
}

function GoToStripeAccountSuccess(): JSX.Element {
    const stripeLoginURL = 'https://connect.stripe.com/login';

    return (
        <Text c="dimmed">
            Everything ready to start receiving payments! You can go to your <Anchor fw='bold' component={Link} href={stripeLoginURL} target="_blank">Stripe account</Anchor> to see your payments dashboard.
        </Text>
    )
}
