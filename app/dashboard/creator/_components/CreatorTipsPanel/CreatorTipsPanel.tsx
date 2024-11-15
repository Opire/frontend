import { useTipsByCreator } from "../../../../../hooks/useTipsByCreator";
import { Divider, Loader, Space, Text } from "@mantine/core";
import { TipCard } from "./components/TipCard";
import { TipCardSkeleton } from "./components/TipCardSkeleton";
import { InfinityList } from "../../../../_components/InfinityList";
import { useGetFilteredById } from "../../../../../hooks/useGetFilteredById";
import { NothingFound } from "../../../../_components/NothingFound";

export function CreatorTipsPanel() {
    const { tips: allTips, isLoading } = useTipsByCreator();
    const tips = useGetFilteredById(allTips);

    const unpaidTips = [...tips].filter((tip) => tip.status === "Pending payment");
    const paidTips = [...tips].filter((tip) => tip.status === "Paid");

    const hasUnpaidTips = unpaidTips.length > 0;
    const hasPaidTips = paidTips.length > 0;

    const noTips = !hasUnpaidTips && !hasPaidTips;

    if (isLoading) {
        return <Loader display='block' size='xl' m='30px auto' />;
    }

    if (noTips) {
        return (
            <NothingFound />
        );
    }

    return (
        <div>
            {hasUnpaidTips && (
                <>
                    <Text fw={900} size={"xl"}>To be paid</Text>
                    <Space h='12px' />

                    <InfinityList
                        items={unpaidTips}
                        keyIdentifier="id"
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={TipCard}
                        ItemSkeletonComponent={TipCardSkeleton}
                    />
                </>
            )}

            {hasUnpaidTips && hasPaidTips && <Divider my="xl" />}

            {hasPaidTips && (
                <>
                    <Text fw={900} size={"xl"}>Paid</Text>
                    <Space h='12px' />
                    <InfinityList
                        items={paidTips}
                        keyIdentifier="id"
                        isLoading={isLoading}
                        loadNextPage={() => { }}
                        ItemComponent={TipCard}
                        ItemSkeletonComponent={TipCardSkeleton}
                    />
                </>
            )}
        </div>
    );
}
