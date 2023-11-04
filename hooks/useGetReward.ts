import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { RewardDetailedDTO } from "../app/_core/_dtos/RewardDetailedDTO";

// TODO: remove hook
export const useGetReward = (id: string) => {
    // const { data: response, error, isValidating, mutate } = useSWR(API_ROUTES.REWARDS.BY_ID(id), (url: string) => fetcher<RewardDetailedDTO>(url));
    const { data: response, error, isValidating, mutate } = useSWR(API_ROUTES.REWARDS.CREATED_BY_ME(), (url: string) => fetcher<RewardDetailedDTO>(url));
    const reward = response ?? null;


    return {
        reward,
        error,
        isLoading: isValidating
    }
}
