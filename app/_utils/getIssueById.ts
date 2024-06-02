import { API_ROUTES } from "../../constants";
import { serverCustomFetch } from "./serverCustomFetch";

export async function getIssueById({
    id,
}: {
    id: string;
}) {
    const response = await serverCustomFetch(API_ROUTES.ISSUES.BY_ID(id));

    return response.json();
}
