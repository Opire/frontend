import { API_ROUTES } from "../../constants";
import { serverCustomFetch } from "./serverCustomFetch";

export async function getRewardsFromCreator () {
    const response = await serverCustomFetch(API_ROUTES.REWARDS.CREATED_BY_ME());

    return response.json();
}
