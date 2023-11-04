import useSWRInfinite from "swr/infinite";
import { API_ROUTES } from "../constants";
import { useRef } from "react";
import { RewardFilters } from "../app/home/_components/Filters/Filters";
import { buildEndpointWithSearchAndPagination } from "../app/home/_utils/buildEndpointWithSearchAndPagination";
import { fetcher } from "../app/_utils/fetcher";
import { RewardPrimitive } from "../app/_core/_primitives/RewardPrimitive";

const PAGE_SIZE = 30;

interface LoadRewardParameters {
    search?: string;
    filters: RewardFilters;
}

export const useInfiniteRewards = ({ search, filters }: LoadRewardParameters): {
    loadNextPage: () => void
    data: {
        id: string
        rewards: RewardPrimitive[]
        isLoading: boolean
    }[]
} => {
    const isReachedEnd = useRef(false)

    function getKey(pageIndex: number, previousPageData: RewardPrimitive[]) {
        if (previousPageData && !previousPageData.length) return null
        // return buildEndpointWithSearchAndPagination(API_ROUTES.REWARDS.ALL(), {
        return buildEndpointWithSearchAndPagination(API_ROUTES.REWARDS.CREATED_BY_ME(), {
            itemsPerPage: PAGE_SIZE,
            page: pageIndex + 1,
            filters,
            search,
        })
    }

    const {
        data: rewardList,
        // mutate,
        // size,
        setSize,
        isValidating,
        // isLoading
    } = useSWRInfinite(
        getKey,
        (url: string) => fetcher<RewardPrimitive[]>(url)
    );

    const loadNextPage = () => {
        if (!isReachedEnd.current) {
            setSize((s) => s + 1)
        }
    }

    // const rewardListPaginated = rewardList?.flat()

    isReachedEnd.current = rewardList ? rewardList[rewardList.length - 1]?.length < PAGE_SIZE : false;
    // const loadingMore = !!rewardList && typeof rewardList[size - 1] === "undefined";

    return {
        loadNextPage,
        data:
            rewardList
                ? [...rewardList.map(rewards => ({
                    id: rewards[0]?.id ?? '', // TODO: revisar
                    rewards: rewards,
                    isLoading: false
                })),
                {
                    id: 'last',
                    rewards: [],
                    isLoading: isValidating
                }]
                : [{
                    id: 'empty', //Id.generate().value,
                    rewards: [],
                    isLoading: true
                }]
    }
}
