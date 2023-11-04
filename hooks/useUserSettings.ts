import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { UserSettingsDTO } from "../app/_core/_dtos/UserSettingsDTO";

export const useUserSettings = () => {
    const { data: userSettingsResponse, error, isValidating, mutate } = useSWR(API_ROUTES.USERS.SETTINGS(), (url: string) => fetcher<UserSettingsDTO>(url));
    const userSettings = userSettingsResponse!;

    return {
        userSettings,
        error,
        isLoading: isValidating
    }
}
