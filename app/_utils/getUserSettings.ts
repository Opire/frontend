import { API_ROUTES } from "../../constants";
import { serverCustomFetch } from "./serverCustomFetch";


export async function getUserSettings() {
    const response = await serverCustomFetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.USERS.SETTINGS()}`);

    return response.json();
}
