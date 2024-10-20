import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";

export const useGetCanCurrentUserParticipateInChallenge = ({ challengeId, revalidateOnFocus }: { challengeId: string, revalidateOnFocus?: boolean }) => {
    const { data, error, isValidating, mutate } = useSWR(
        API_ROUTES.CHALLENGES.CAN_CURRENT_USER_PARTICIPATE(challengeId),
        (url: string) => fetcher<{ canUserParticipate: boolean }>(url),
        { revalidateOnFocus }
    );
    const canCurrentUserParticipate = data?.canUserParticipate ?? false;

    return {
        canCurrentUserParticipate,
        error,
        isLoadingCanCurrentUserParticipate: isValidating,
        reloadCanCurrentUserParticipate: mutate,
    };
};
