import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { ChallengePrizePrimitive } from "../app/_core/_primitives/ChallengePrizePrimitive";

export const useGetAvailableChallengePrizes = ({ challengeId, revalidateOnFocus }: { challengeId: string, revalidateOnFocus?: boolean }) => {
    const { data, error, isValidating, mutate } = useSWR(
        API_ROUTES.CHALLENGES.GET_AVAILABLE_PRIZES(challengeId),
        (url: string) => fetcher<ChallengePrizePrimitive[]>(url),
        { revalidateOnFocus }
    );
    const availablePrizes = data ?? [];

    return {
        availablePrizes,
        error,
        isLoadingAvailablePrizes: isValidating,
        reloadAvailablePrizes: mutate,
    };
};
