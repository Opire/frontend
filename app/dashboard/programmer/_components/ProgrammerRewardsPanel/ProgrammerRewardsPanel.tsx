import { FC } from "react";
import { Divider, Loader, Space, Text, Title } from "@mantine/core";
import { ProgrammerRewardUnpaidCard } from "../ProgrammerRewardCard/ProgrammerRewardUnpaidCard";
import { ProgrammerRewardCardSkeletonClient } from "../ProgrammerRewardCard/ProgrammerRewardCardSkeletonClient";
import { ProgrammerRewardPaidCard } from "../ProgrammerRewardCard/ProgrammerRewardPaidCard";
import { InfinityList } from "../../../../_components/InfinityList";
import { useGetRewardsFromProgrammer } from "../../../../../hooks/useGetRewardsFromProgrammer";
import { useGetFilteredByPlatform } from "../../../../../hooks/useGetFilteredByPlatform";
import { useUserAuth } from "../../../../../hooks/useUserAuth";
import { getRewardsPriceForProgrammer } from "../../../../_utils/getRewardsPriceForProgrammer";
import { ProgrammerRewardPaidOthersCard } from "../ProgrammerRewardCard/ProgrammerRewardPaidOthersCard";

interface ProgrammerRewardsPanelProps {
}

export const ProgrammerRewardsPanel: FC<ProgrammerRewardsPanelProps> = ({
}) => {
    const userAuth = useUserAuth()!;
    const { issues: allIssues, isLoading } = useGetRewardsFromProgrammer();
    const issues = useGetFilteredByPlatform(allIssues);

    const unpaidRewards = [...issues].filter((issue) => issue.rewards.some((r) => r.status !== 'Paid'));
    const paidRewards = [...issues].filter((issue) => issue.rewards.every((r) => r.status === 'Paid'));
    const paidRewardsToTheProgrammer = paidRewards.filter((issue) => getRewardsPriceForProgrammer({ issue, userAuth }) > 0);
    const paidRewardsToOthers = paidRewards.filter((issue) => getRewardsPriceForProgrammer({ issue, userAuth }) === 0);

    const hasUnpaidRewards = unpaidRewards.length > 0
    const hasPaidRewardsToTheProgrammer = paidRewardsToTheProgrammer.length > 0
    const hasPaidRewardsToOthers = paidRewardsToOthers.length > 0

    const noRewards = !hasUnpaidRewards && !hasPaidRewardsToTheProgrammer && !hasPaidRewardsToOthers;


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

            {hasUnpaidRewards && hasPaidRewardsToTheProgrammer && <Divider my="xl" />}

            {hasPaidRewardsToTheProgrammer && (
                <>
                    <Text fw={900} size={'xl'}>Paid</Text>
                    <Space h='12px' />
                    <InfinityList
                        items={paidRewardsToTheProgrammer}
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={ProgrammerRewardPaidCard}
                        ItemSkeletonComponent={ProgrammerRewardCardSkeletonClient}
                    />
                </>
            )}

            {((hasPaidRewardsToTheProgrammer && hasPaidRewardsToOthers) || (hasUnpaidRewards && hasPaidRewardsToOthers)) && <Divider my="xl" />}

            {hasPaidRewardsToOthers && (
                <>
                    <Text fw={900} size={'xl'}>Paid to others</Text>
                    <Space h='12px' />
                    <InfinityList
                        items={paidRewardsToOthers}
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={ProgrammerRewardPaidOthersCard}
                        ItemSkeletonComponent={ProgrammerRewardCardSkeletonClient}
                    />
                </>
            )}
        </div>
    );
}
