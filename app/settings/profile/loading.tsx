import { Group, Stack } from "@mantine/core";
import { BitbucketSettingCardSkeleton } from "./_components/BitbucketSettingCard/BitbucketSettingCardSkeleton";
import { GithubSettingCardSkeleton } from "./_components/GithubSettingCard/GithubSettingCardSkeleton";
import { GitlabSettingCardSkeleton } from "./_components/GitlabSettingCard/GitlabSettingCardSkeleton";
import { StripeSettingCardSkeleton } from "./_components/StripeSettingCard/StripeSettingCardSkeleton";

export default function Loading() {

    return (
        <>
            <Stack gap="xl">
                <Group justify="center">
                    <StripeSettingCardSkeleton />
                </Group>

                <Group justify="center">
                    <GithubSettingCardSkeleton />
                    <GitlabSettingCardSkeleton />
                    <BitbucketSettingCardSkeleton />
                </Group>
            </Stack>
        </>
    )
}
