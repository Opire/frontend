import { API_ROUTES } from "../../constants";
import { buildEndpointWithSearchAndPagination } from "../projects/_utils/buildEndpointWithSearchAndPagination";
import { serverCustomFetch } from "./serverCustomFetch";

export async function getProjects ({
    page = 1,
    itemsPerPage = 30,
    search,
}: {
    page?: number;
    itemsPerPage?: number;
    search?: string;
}) {
    const response = await serverCustomFetch(buildEndpointWithSearchAndPagination(API_ROUTES.PROJECTS.ALL(), {
        itemsPerPage,
        page,
        search,
    }));

    return response.json();
}
