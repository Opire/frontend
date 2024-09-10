import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { ChallengePrimitive } from "../app/_core/_primitives/ChallengePrimitive";

export const useGetChallengesByCreator = () => {
    const {
        data: challengesResponse,
        error,
        isValidating,
    } = useSWR(API_ROUTES.CHALLENGES.CREATED_BY_ME(), (url: string) =>
        fetcher<ChallengePrimitive[]>(url)
    );
    const challenges = challengesResponse ?? [];

    return {
        challenges,
        errorWhileLoadingChallenges: error,
        isLoadingChallenges: isValidating,
    };
};
