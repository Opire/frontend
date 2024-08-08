
'use client'

import { Button, Center, Container, Flex, Group, Modal, rem, Select, Space, Text, TextInput} from "@mantine/core";
import { IconBrandStripe, IconCornerDownRight, IconCirclePlus, IconAt, IconUpload, IconFileInvoice } from "@tabler/icons-react";
import { FC, useState } from "react";
import { API_ROUTES } from "../../../../constants";
import { useRouter } from "next/navigation";
import { clientCustomFetch } from "../../../_utils/clientCustomFetch";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Email } from "../../../_core/_vos/Email";
import { STRIPE_SUPPORTED_COUNTRY_OPTIONS } from "./StripeSupportedCountryOptions";
import { SupportedCountry } from "../../../_core/_vos/SupportedCountry";


interface StripeSettingsProps {
    hasStripeConfigured: boolean;
    paymentsEmail: string | null,
    userId: string,
}

export const StripePersonalAccountSetting: FC<StripeSettingsProps> = ({
    hasStripeConfigured,
    paymentsEmail,
    userId,
}) => {
    const router = useRouter();

    const [isDisconnectingAccount, setIsDisconnectingAccount] = useState(false);
    const [isCreatingExpressAccount, setIsCreatingExpressAccount] = useState(false);
    const [isOpeningExpressAccountOnboarding, setIsOpeningExpressAccountOnboarding] = useState(false);

    const [isModalForNewAccountOpened, { open: openModalForNewAccount, close: closeModalForNewAccount }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            country: '',
            emailForStripe: paymentsEmail || '',
        },
        validate: {
            emailForStripe: (value: string) => {
                try {
                    new Email(value);
                } catch (error) {
                    return 'Invalid email';
                }
            },
            country: (value: string) => {
                try {
                    SupportedCountry.fromString(value);
                } catch (error) {
                    return 'Invalid country';
                }
            },
        },
    });

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


    async function createExpressAccount({ emailForStripe, country }: { emailForStripe: string, country: string }) {
        try {
            setIsCreatingExpressAccount(true);
            const response = await clientCustomFetch(API_ROUTES.PAYMENTS.EXPRESS_ACCOUNT(), {
                method: "POST",
                body: {
                    country,
                    email: emailForStripe
                }
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
        // const stripeLoginURL = 'https://connect.stripe.com/login';
        const stripeLoginURL = 'https://connect.stripe.com/express_login';

        const downloadInvoicesURL = paymentsEmail 
        ? `https://zenvoice.io/p/66b37d99f1bbae9758e307b6?email=${paymentsEmail}` 
        : 'https://zenvoice.io/p/66b37d99f1bbae9758e307b6';

        return (
            <div>
                {paymentsEmail && <Text c='dimmed'>Connected with {paymentsEmail}</Text>}
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
                            color="blue"
                            loading={isOpeningExpressAccountOnboarding}
                            onClick={openExpressAccountOnboarding}
                        >
                            <IconUpload style={{ marginRight: '8px' }} />
                            <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                                Update Stripe configuration
                            </Text>
                        </Button>

                        <Button
                            radius='2rem'
                            size="lg"
                            color="indigo.9"
                            component="a"
                            target="_blank"
                            href={downloadInvoicesURL}
                        >
                            <IconFileInvoice style={{ marginRight: '8px' }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Text lineClamp={2} style={{ fontSize: '0.6rem', lineHeight: 'normal' }} c={'gray.4'} ml='auto'>
                                    Powered by <span style={{ fontSize: '0.62rem', fontWeight: 'bold', color: '#06AB78'  }}>Zenvoice.io</span>
                                </Text>
                                <Text lineClamp={2} style={{ fontSize: '1.2rem', lineHeight: 'inherit', marginBottom: '8px' }} >
                                    Download invoices
                                </Text>
                            </div>
                        </Button>

                        <Button
                            mt={'2rem'}
                            radius='2rem'
                            size="lg"
                            variant="outline"
                            color="red"
                            loading={isDisconnectingAccount}
                            onClick={disconnectStripeAccount}
                        >
                            <IconBrandStripe style={{ marginRight: '8px' }} />
                            <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                                Disconnect Stripe
                            </Text>
                        </Button>
                    </Flex>
                </Center>
            </div>
        )
    }

    return (
        <>

            <Center>
                <Button
                    radius='2rem'
                    size="lg"
                    variant="gradient"
                    color="green"
                    onClick={openModalForNewAccount}
                >
                    <IconCirclePlus style={{ marginRight: '8px' }} />
                    <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                        Connect with Stripe
                    </Text>
                </Button>
            </Center>

            <Modal
                centered={true}
                opened={isModalForNewAccountOpened}
                onClose={closeModalForNewAccount}
                size={'lg'}
                title={
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'ce' }}>
                        <IconBrandStripe size={16} color="teal" />
                        Create a new Stripe Express account
                    </div>
                }
                closeOnEscape={true}
                closeOnClickOutside={false}
                withCloseButton={true}
            >
                <form onSubmit={form.onSubmit(createExpressAccount)}>
                    <Container size='xs'>
                        <Space h='2rem' />

                        <TextInput
                            withAsterisk
                            label="Email for payments"
                            placeholder="Your email"
                            key='emailForStripe'
                            required
                            {...form.getInputProps('emailForStripe')}
                            leftSectionPointerEvents="none"
                            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                        />

                        <Space h='2rem' />

                        <Select
                            withAsterisk
                            label="Country"
                            placeholder="Your country"
                            key='country'
                            searchable
                            clearable
                            required
                            {...form.getInputProps('country')}
                            data={STRIPE_SUPPORTED_COUNTRY_OPTIONS}
                        />
                    </Container>

                    <Space h='3rem' />

                    <Group justify="flex-end" mt="md">
                        <Button
                            type="submit"
                            variant="gradient"
                            size="md"
                            loading={isCreatingExpressAccount}
                        >
                            {isCreatingExpressAccount ? 'Waiting for Stripe...' : 'Create new Stripe account'}
                        </Button>
                    </Group>

                    <Space h='1rem' />

                </form>
            </Modal>
        </>
    )
}