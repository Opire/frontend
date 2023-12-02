import { Group, SimpleGrid, Space, Stack, Text } from "@mantine/core";
import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../_utils/redirectToHomeIfNotLogged";
import { getUserSettings } from "../_utils/getUserSettings";
import { StripeSetting } from "./_components/StripeSetting/StripeSetting";
import { GitHubInstallApp } from "./_components/GitHubInstallApp/GitHubInstallApp";

export const metadata: Metadata = {
    title: 'Make my Change - Settings',
}

export default async function Page() {
    redirectToHomeIfNotLogged();
    const userSettings = await getUserSettings()

    return (
        <Stack gap="xl">
            <Text
                style={{ fontSize: "2.4rem", fontWeight: "bold" }}
            >
                Payments
            </Text>
            <Group>
                <StripeSetting
                    hasStripeConfigured={userSettings.payments.canReceivePayments}
                />
            </Group>

            <Space h='1rem' />

            <Text
                style={{ fontSize: "2.4rem", fontWeight: "bold" }}
            >
                Install app
            </Text>

            <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }}>
                <GitHubInstallApp />
            </SimpleGrid>

        </Stack>
    );
}
