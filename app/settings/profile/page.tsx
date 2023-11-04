import { Group, Stack } from "@mantine/core";
import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../../_utils/redirectToHomeIfNotLogged";
import { getUserSettings } from "../../_utils/getUserSettings";
import { BitbucketSettingCard } from "./_components/BitbucketSettingCard/BitbucketSettingCard";
import { GithubSettingCard } from "./_components/GithubSettingCard/GithubSettingCard";
import { GitlabSettingCard } from "./_components/GitlabSettingCard/GitlabSettingCard";
import { StripeSettingCard } from "./_components/StripeSettingCard/StripeSettingCard";

export const metadata: Metadata = {
    title: 'Make my Change',
}

export default async function Page() {
    redirectToHomeIfNotLogged();
    const userSettings = await getUserSettings()

    return (
        <Stack gap="xl">
            <Group justify="center">
                <StripeSettingCard
                    hasStripeConfigured={userSettings.payments.canReceivePayments}
                />
            </Group>

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
