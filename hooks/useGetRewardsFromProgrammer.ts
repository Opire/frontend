import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { IssueByProgrammerDTO } from "../app/_core/_dtos/IssueByProgrammerDTO";

export const useGetRewardsFromProgrammer = () => {
    const { data, error, isValidating } = useSWR(
        API_ROUTES.REWARDS.TRYING_BY_ME(),
        (url: string) => fetcher<IssueByProgrammerDTO[]>(url)
    );
    const issues = data ?? [];

    return {
        issues,
        error,
        isLoading: isValidating,
    };
};
