import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { TipByCreatorDTO } from "../app/_core/_dtos/TipByCreatorDTO";

export const useTipsByCreator = () => {
    const { data: tipsResponse, error, isValidating } = useSWR(API_ROUTES.TIPS.CREATED_BY_ME(), (url: string) => fetcher<TipByCreatorDTO[]>(url));
    const tips = tipsResponse ?? [];

    return {
        tips,
        error,
        isLoading: isValidating
    }
}
