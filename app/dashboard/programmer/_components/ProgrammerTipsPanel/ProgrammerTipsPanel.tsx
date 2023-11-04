import { FC } from "react";
import { useTipsByCreator } from "../../../../../hooks/useTipsByCreator";
import { Divider, Loader, Space, Text, Title } from "@mantine/core";
import { TipCardSkeleton } from "./components/TipCardSkeleton";
import { ProgrammerTipCard } from "./components/ProgrammerTipCard";
import { InfinityList } from "../../../../_components/InfinityList";

interface ProgrammerTipsPanelProps {
}

export const ProgrammerTipsPanel: FC<ProgrammerTipsPanelProps> = ({
}) => {
    // const { tips, isLoading } = useTipsByProgrammer();
    const { tips, isLoading } = useTipsByCreator();

    const unpaidTips = [...tips].filter((tip) => tip.status === 'Pending payment')
    const paidTips = [...tips].filter((tip) => tip.status === 'Paid')

    const hasUnpaidTips = unpaidTips.length > 0
    const hasPaidTips = paidTips.length > 0

    const noTips = !hasUnpaidTips && !hasPaidTips;


    if (isLoading) {
        return <Loader size='xl' m='20px auto' />
    }

    if (noTips) {
        return (
            <Title order={1}>Nothing found...</Title>
        )
    }

    return (
        <div>
            {hasUnpaidTips && (
                <>
                    <Text fw={900} size={'xl'} variant="gradient">Waiting for payment</Text>
                    <Space h='12px' />
                    <InfinityList
                        items={unpaidTips}
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={ProgrammerTipCard}
                        ItemSkeletonComponent={TipCardSkeleton}
                    />
                </>
            )}

            {hasUnpaidTips && hasPaidTips && <Divider my="xl" />}

            {hasPaidTips && (
                <>
                    <Text fw={900} size={'xl'} variant="gradient">Paid</Text>
                    <Space h='12px' />
                    <InfinityList
                        items={paidTips}
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={ProgrammerTipCard}
                        ItemSkeletonComponent={TipCardSkeleton}
                    />
                </>
            )}
        </div>
    );
};
