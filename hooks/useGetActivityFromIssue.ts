import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { BaseEventPrimitives } from "../app/_core/_primitives/BaseEventPrimitives";

export const useGetActivityFromIssue = ({ issueId, revalidateOnFocus }: { issueId: string, revalidateOnFocus?: boolean }) => {
    const { data, error, isValidating } = useSWR(
        API_ROUTES.ACTIVITY.BY_ISSUE_ID(issueId),
        (url: string) => fetcher<BaseEventPrimitives[]>(url),
        { revalidateOnFocus }
    );
    const activity = data ?? [];

    return {
        activity,
        error,
        isLoading: isValidating,
    };
};
