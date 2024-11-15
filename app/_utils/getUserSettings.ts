import { API_ROUTES } from "../../constants";
import { UserSettingsDTO } from "../_core/_dtos/UserSettingsDTO";
import { serverCustomFetch } from "./serverCustomFetch";

export async function getUserSettings (): Promise<UserSettingsDTO> {
    const response = await serverCustomFetch(API_ROUTES.USERS.SETTINGS());

    return response.json();
}
