import { API_ROUTES } from "../../constants";
import { ChallengePrimitive } from "../_core/_primitives/ChallengePrimitive";
import { buildEndpointWithSearchAndPagination } from "../projects/_utils/buildEndpointWithSearchAndPagination";
import { serverCustomFetch } from "./serverCustomFetch";

export async function getChallenges({
    page = 1,
    itemsPerPage = 30,
    search,
}: {
    page?: number;
    itemsPerPage?: number;
    search?: string;
}): Promise<ChallengePrimitive[]> {
    const response = await serverCustomFetch(
        buildEndpointWithSearchAndPagination(API_ROUTES.CHALLENGES.ALL(), {
            itemsPerPage,
            page,
            search,
        })
    );

    return response.json();
}
