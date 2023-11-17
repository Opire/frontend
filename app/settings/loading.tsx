import { Group, Stack } from "@mantine/core";
import { BitbucketSettingCardSkeleton } from "./profile/_components/BitbucketSettingCard/BitbucketSettingCardSkeleton";
import { GithubSettingCardSkeleton } from "./profile/_components/GithubSettingCard/GithubSettingCardSkeleton";
import { GitlabSettingCardSkeleton } from "./profile/_components/GitlabSettingCard/GitlabSettingCardSkeleton";
import { StripeSettingCardSkeleton } from "./profile/_components/StripeSettingCard/StripeSettingCardSkeleton";

export default function Loading() {

    return (
        <>
            <Stack gap="xl">
                <Group justify="center">
                    <StripeSettingCardSkeleton />
                </Group>
            </Stack>
        </>
    )
}
