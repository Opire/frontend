import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { IssueByProgrammerDTO } from "../app/_core/_dtos/IssueByProgrammerDTO";

export const useGetRewardsFromProgrammer = ({ revalidateOnFocus }: { revalidateOnFocus?: boolean }) => {
    const { data, error, isValidating } = useSWR(
        API_ROUTES.REWARDS.TRYING_BY_ME(),
        (url: string) => fetcher<IssueByProgrammerDTO[]>(url),
        { revalidateOnFocus }
    );
    const issues = data ?? [];

    return {
        issues,
        error,
        isLoading: isValidating,
    };
};
