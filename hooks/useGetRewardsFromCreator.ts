import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { IssueByCreatorDTO } from "../app/_core/_dtos/IssueByCreatorDTO";

export const useGetRewardsFromCreator = () => {
    const { data, error, isValidating } = useSWR(API_ROUTES.REWARDS.CREATED_BY_ME(), (url: string) => fetcher<IssueByCreatorDTO[]>(url));
    const issues = data ?? [];

    return {
        issues,
        error,
        isLoading: isValidating
    }
}
