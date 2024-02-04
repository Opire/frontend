import { FC } from "react";
import { Divider, Loader, Space, Text } from "@mantine/core";
import { ProgrammerRewardUnpaidCard } from "../ProgrammerRewardCard/ProgrammerRewardUnpaidCard";
import { ProgrammerRewardCardSkeletonClient } from "../ProgrammerRewardCard/ProgrammerRewardCardSkeletonClient";
import { ProgrammerRewardPaidCard } from "../ProgrammerRewardCard/ProgrammerRewardPaidCard";
import { InfinityList } from "../../../../_components/InfinityList";
import { useGetRewardsFromProgrammer } from "../../../../../hooks/useGetRewardsFromProgrammer";
import { useGetFilteredByPlatform } from "../../../../../hooks/useGetFilteredByPlatform";
import { ProgrammerRewardPaidOthersCard } from "../ProgrammerRewardCard/ProgrammerRewardPaidOthersCard";
import { NothingFound } from "../../../../_components/NothingFound";
import { IssueByProgrammerDTO } from "../../../../_core/_dtos/IssueByProgrammerDTO";




interface ProgrammerRewardsPanelProps {
}

export const ProgrammerRewardsPanel: FC<ProgrammerRewardsPanelProps> = ({ }) => {
    const { issues: allIssues, isLoading } = useGetRewardsFromProgrammer();
    const issues = useGetFilteredByPlatform(allIssues);

    const unclaimedRewards = [...issues].filter((issue) => !issue.isFullyPaid && !issue.programmer.hasClaimed);
    const unpaidRewards = [...issues].filter((issue) => !issue.isFullyPaid && issue.programmer.hasClaimed);

    const paidRewards = [...issues].filter((issue) => issue.isFullyPaid);
    const paidRewardsToTheProgrammer = paidRewards.filter((issue) => issue.programmer.alreadyPaid.value > 0);
    const paidRewardsToOthers = paidRewards.filter((issue) => issue.programmer.alreadyPaid.value === 0);


    const PANEL_SECTIONS = {
        UNCLAIMED: { key: 'unclaimed', text: 'Trying', rewards: unclaimedRewards, itemComponent: ProgrammerRewardUnpaidCard },
        UNPAID: { key: 'unpaid', text: 'Waiting for payment', rewards: unpaidRewards, itemComponent: ProgrammerRewardUnpaidCard },
        PAID: { key: 'paidToProgrammer', text: 'Paid', rewards: paidRewardsToTheProgrammer, itemComponent: ProgrammerRewardPaidCard },
        PAID_TO_OTHERS: { key: 'paidToOthers', text: 'Paid to others', rewards: paidRewardsToOthers, itemComponent: ProgrammerRewardPaidOthersCard },
    };

    const sections: { key: string, text: string, rewards: IssueByProgrammerDTO[], itemComponent: FC<any> }[] = [];

    if (unclaimedRewards.length > 0) {
        sections.push(PANEL_SECTIONS.UNCLAIMED)
    }

    if (unpaidRewards.length > 0) {
        sections.push(PANEL_SECTIONS.UNPAID)
    }

    if (paidRewardsToTheProgrammer.length > 0) {
        sections.push(PANEL_SECTIONS.PAID)
    }

    if (paidRewardsToOthers.length > 0) {
        sections.push(PANEL_SECTIONS.PAID_TO_OTHERS)
    }

    const hasSections = sections.some((section) => section.rewards.length > 0);

    if (isLoading) {
        return <Loader display="block" size="xl" m="30px auto" />;
    }

    if (!hasSections) {
        return <NothingFound />;
    }

    return (
        <div>
            {sections.map((section, index) => (
                <div key={section.key}>
                    {section.rewards.length > 0 && (
                        <>
                            <Text fw={900} size={'xl'}>
                                {section.text}
                            </Text>
                            <Space h="12px" />
                            <InfinityList
                                keyIdentifier="issueId"
                                items={section.rewards}
                                isLoading={isLoading}
                                loadNextPage={() => { }}
                                ItemComponent={section.itemComponent}
                                ItemSkeletonComponent={ProgrammerRewardCardSkeletonClient}
                            />
                        </>
                    )}

                    {index < sections.length - 1 && <Divider my="xl" />}
                </div>
            ))}
        </div>
    );
};