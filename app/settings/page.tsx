import { Divider, Group, SimpleGrid, Space, Stack, Text } from "@mantine/core";
import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../_utils/redirectToHomeIfNotLogged";
import { getUserSettings } from "../_utils/getUserSettings";
import { GitHubInstallApp } from "./_components/GitHubInstallApp/GitHubInstallApp";
import { StripePersonalAccountSetting } from "./_components/StripePersonalAccountSetting/StripePersonalAccountSetting";

export const metadata: Metadata = {
    title: 'Opire - Settings',
}

export default async function Page() {
    redirectToHomeIfNotLogged();
    const userSettings = await getUserSettings();

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
                    paymentsEmail={userSettings.payments.email}
                    userId={userSettings.id}
                />
            </Group>

            <Space h='2rem' />
        </Stack>
    );
}
