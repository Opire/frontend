import { FC, useMemo } from "react";
import { useGetRewardsFromCreator } from "../../../../../hooks/useGetRewardsFromCreator";
import { Divider, Loader, Space, Text, Title } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { ProgrammerRewardUnpaidCard } from "../ProgrammerRewardCard/ProgrammerRewardUnpaidCard";
import { ProgrammerRewardCardSkeletonClient } from "../ProgrammerRewardCard/ProgrammerRewardCardSkeletonClient";
import { ProgrammerRewardPaidCard } from "../ProgrammerRewardCard/ProgrammerRewardPaidCard";
import { InfinityList } from "../../../../_components/InfinityList";
import { useGetRewardsFromProgrammer } from "../../../../../hooks/useGetRewardsFromProgrammer";

interface ProgrammerRewardsPanelProps {
}

export const ProgrammerRewardsPanel: FC<ProgrammerRewardsPanelProps> = ({
}) => {
    const { issues: allIssues, isLoading } = useGetRewardsFromProgrammer();
    const searchParams = useSearchParams();
    const issuePlatformId = searchParams.get('issuePlatformId');
    const issuePlatform = searchParams.get('issuePlatform');

    const issues = useMemo(() => {
        if (issuePlatformId && issuePlatform) {
            return allIssues.filter(issue => issue.platformId === issuePlatformId && issue.platform === issuePlatform)
        }

        if (issuePlatformId) {
            return allIssues.filter(issue => issue.platformId === issuePlatformId)
        }

        if (issuePlatform) {
            return allIssues.filter(issue => issue.platform === issuePlatform)
        }

        return allIssues;
    }, [allIssues, issuePlatformId, issuePlatform]);

    const unpaidRewards = [...issues].filter((issue) => issue.rewards.some((r) => r.status !== 'Completed'))
    const paidRewards = [...issues].filter((issue) => issue.rewards.every((r) => r.status === 'Completed'))

    const hasUnpaidRewards = unpaidRewards.length > 0
    const hasPaidRewards = paidRewards.length > 0

    const noRewards = !hasUnpaidRewards && !hasPaidRewards;


    if (isLoading) {
        return <Loader display='block' size='xl' m='30px auto' />
    }

    if (noRewards) {
        return (
            <Title order={1}>Nothing found...</Title>
        )
    }

    return (
        <div>
            {hasUnpaidRewards && (
                <>
                    <Text fw={900} size={'xl'}>Waiting for payment</Text>
                    <Space h='12px' />
                    <InfinityList
                        items={unpaidRewards}
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={ProgrammerRewardUnpaidCard}
                        ItemSkeletonComponent={ProgrammerRewardCardSkeletonClient}
                    />
                </>
            )}

            {hasUnpaidRewards && hasPaidRewards && <Divider my="xl" />}

            {hasPaidRewards && (
                <>
                    <Text fw={900} size={'xl'}>Paid</Text>
                    <Space h='12px' />
                    <InfinityList
                        items={paidRewards}
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={ProgrammerRewardPaidCard}
                        ItemSkeletonComponent={ProgrammerRewardCardSkeletonClient}
                    />
                </>
            )}
        </div>
    );
}
