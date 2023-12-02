import { useMemo } from "react";
import { PlatformType } from "../app/_core/_types/PlatformType";
import { useSearchParams } from "next/navigation";

interface ItemWithPlatform {
    platform: PlatformType;
    platformId: string;
}

export const useGetFilteredByPlatform = <T extends ItemWithPlatform>(items: T[]) => {
    const searchParams = useSearchParams();
    const platformId = searchParams.get('platformId');
    const platform = searchParams.get('platform');

    const filteredItems = useMemo(() => {
        if (platformId && platform) {
            return items.filter(item => item.platformId === platformId && item.platform === platform)
        }

        if (platformId) {
            return items.filter(item => item.platformId === platformId)
        }

        if (platform) {
            return items.filter(item => item.platform === platform)
        }

        return items;
    }, [items, platformId, platform]);

    return filteredItems;
};
