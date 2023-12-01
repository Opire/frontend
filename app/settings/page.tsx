import { Group, Space, Stack, Text } from "@mantine/core";
import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../_utils/redirectToHomeIfNotLogged";
import { getUserSettings } from "../_utils/getUserSettings";
import { BitbucketSettingCard } from "./profile/_components/BitbucketSettingCard/BitbucketSettingCard";
import { GithubSettingCard } from "./profile/_components/GithubSettingCard/GithubSettingCard";
import { GitlabSettingCard } from "./profile/_components/GitlabSettingCard/GitlabSettingCard";
import { StripeSetting } from "./profile/_components/StripeSetting/StripeSetting";

export const metadata: Metadata = {
    title: 'Make my Change',
}

export default async function Page() {
    redirectToHomeIfNotLogged();
    const userSettings = await getUserSettings()

    return (
        <Stack gap="xl">
            <Text
                variant="gradient"
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
                variant="gradient"
                style={{ fontSize: "2.4rem", fontWeight: "bold" }}
            >
                Install app
            </Text>

            {/* <Group justify="center">
                <GithubSettingCard
                    githubAccount={userSettings.github}
                />
                <GitlabSettingCard
                    gitlabAccount={userSettings.gitlab}
                />
                <BitbucketSettingCard
                    bitbucketAccount={userSettings.bitbucket}
                />
            </Group> */}
        </Stack>
    );
}
