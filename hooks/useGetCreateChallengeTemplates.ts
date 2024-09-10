import useSWR from "swr";
import { API_ROUTES } from "../constants";
import { fetcher } from "../app/_utils/fetcher";
import { CreateChallengeDTO } from "../app/_core/_primitives/ChallengePrimitive";

export const useGetCreateChallengeTemplates = () => {
    const { data: templatesResponse, error, isValidating } = useSWR(API_ROUTES.CHALLENGES.TEMPLATES(), (url: string) => fetcher<CreateChallengeDTO[]>(url));
    const templates = templatesResponse ?? [];

    return {
        templates,
        errorWhileLoadingTemplates: error,
        isLoadingTemplates: isValidating
    }
}
