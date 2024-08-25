import { FC } from "react";
import { useGetRewardsFromCreator } from "../../../../../hooks/useGetRewardsFromCreator";
import { Button, Divider, Loader, Space, Text, Title } from "@mantine/core";
import { CreatorRewardCardSkeletonClient } from "../CreatorRewardCard/CreatorRewardCardSkeletonClient";
import { CreatorRewardPaidCard } from "../CreatorRewardCard/CreatorRewardPaidCard";
import { CreatorRewardUnpaidCard } from "../CreatorRewardCard/CreatorRewardUnpaidCard";
import { InfinityList } from "../../../../_components/InfinityList";
import { useGetFilteredByPlatform } from "../../../../../hooks/useGetFilteredByPlatform";
import { NothingFound } from "../../../../_components/NothingFound";
import { IconMoneybag } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { CreateNewRewardModal } from "./CreateNewRewardModal";

interface CreatorRewardsPanelProps {
}

export const CreatorRewardsPanel: FC<CreatorRewardsPanelProps> = ({
}) => {
    const [isModalOpen, { close: closeModal, open: openModal }] = useDisclosure();

    const { issues: allIssues, isLoading } = useGetRewardsFromCreator({ revalidateOnFocus: !isModalOpen });
    const issues = useGetFilteredByPlatform(allIssues);

    const unpaidRewards = [...issues].filter((issue) => !issue.isFullyPaid);
    const paidRewards = [...issues].filter((issue) => issue.isFullyPaid);

    const hasUnpaidRewards = unpaidRewards.length > 0;
    const hasPaidRewards = paidRewards.length > 0;

    const noRewards = !hasUnpaidRewards && !hasPaidRewards;

    if (isLoading) {
        return <Loader display='block' size='xl' m='30px auto' />
    }

    if (noRewards) {
        return (
            <div>
                <div>
                    <Button
                        onClick={openModal}
                        size='md'
                        leftSection={<IconMoneybag size={14} />}
                        variant='gradient'
                    >
                        Create a new reward
                    </Button>

                    <CreateNewRewardModal isOpened={isModalOpen} onClose={closeModal} />
                </div>

                <Space h='xl' />

                <NothingFound />
            </div>
        )
    }

    return (
        <div>
            <div>
                <Button
                    onClick={openModal}
                    size='md'
                    leftSection={<IconMoneybag size={14} />}
                    variant='gradient'
                >
                    Create a new reward
                </Button>

                <CreateNewRewardModal isOpened={isModalOpen} onClose={closeModal} />
            </div>

            <Space h='xl' />

            {hasUnpaidRewards && (
                <>
                    <Text fw={900} size={'xl'}>Active</Text>
                    <Space h='12px' />
                    <InfinityList
                        items={unpaidRewards}
                        keyIdentifier="issueId"
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={CreatorRewardUnpaidCard}
                        ItemSkeletonComponent={CreatorRewardCardSkeletonClient}
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
                        keyIdentifier="issueId"
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={CreatorRewardPaidCard}
                        ItemSkeletonComponent={CreatorRewardCardSkeletonClient}
                    />
                </>
            )}
        </div>
    );
}
