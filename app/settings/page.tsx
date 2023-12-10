import { Blockquote, Divider, Group, SimpleGrid, Space, Stack, Text } from "@mantine/core";
import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../_utils/redirectToHomeIfNotLogged";
import { getUserSettings } from "../_utils/getUserSettings";
import { StripePersonalAccountSetting } from "./_components/StripePersonalAccountSetting/StripePersonalAccountSetting";
import { GitHubInstallApp } from "./_components/GitHubInstallApp/GitHubInstallApp";
import { StripeOrganizationAccountSetting } from "./_components/StripeOrganizationAccountSetting/StripeOrganizationAccountSetting";
import { IconInfoCircle } from "@tabler/icons";

export const metadata: Metadata = {
    title: 'Make my Change - Settings',
}

export default async function Page() {
    redirectToHomeIfNotLogged();
    const userSettings = await getUserSettings();
    const belongsToSomeOrganization = userSettings.payments.organizations.length > 0;

    return (
        <Stack gap="xl">
            <Text
                style={{ fontSize: "2.4rem", fontWeight: "bold" }}
            >
                Install app
            </Text>

            <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} w='100%' spacing='xl' verticalSpacing='xl' >
                <GitHubInstallApp />
            </SimpleGrid>


            <Divider mt={'1rem'} />

            <Text
                style={{ fontSize: "2.4rem", fontWeight: "bold" }}
            >
                Payments
            </Text>
            <Group>
                <StripePersonalAccountSetting
                    hasStripeConfigured={userSettings.payments.canReceivePayments}
                />
            </Group>


            {
                belongsToSomeOrganization &&
                <>
                    <Divider mt={'1rem'} />

                    <Text
                        style={{ fontSize: "2.4rem", fontWeight: "bold" }}
                    >
                        Payments - your organizations
                    </Text>

                    <Blockquote color='green' icon={<IconInfoCircle />}>
                        <Text style={{ fontSize: '1.2rem' }}>
                            We will send the link to the Stripe account throught the organization's email address
                        </Text>
                    </Blockquote>


                    <Group>
                        <StripeOrganizationAccountSetting
                            organizations={userSettings.payments.organizations}
                        />
                    </Group>
                </>

            }

        </Stack>
    );
}
