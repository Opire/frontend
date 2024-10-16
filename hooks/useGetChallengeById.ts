import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { ChallengeDTO } from "../app/_core/_primitives/ChallengePrimitive";

export const useGetChallengeById = ({ challengeId, initialChallenge, revalidateOnFocus }: { challengeId: string, initialChallenge?: ChallengeDTO, revalidateOnFocus?: boolean }) => {
    const { data, error, isValidating, mutate } = useSWR(
        API_ROUTES.CHALLENGES.BY_ID(challengeId),
        (url: string) => fetcher<ChallengeDTO>(url),
        { revalidateOnFocus }
    );
    const challenge = data ?? initialChallenge;

    return {
        challenge,
        error,
        isLoadingDraftChallenge: isValidating,
        reloadChallenge: mutate,
    };
};
