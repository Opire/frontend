import { redirect } from "next/navigation";
import { API_ROUTES } from "../../constants";
import { ChallengePrimitive } from "../_core/_primitives/ChallengePrimitive";
import { serverCustomFetch } from "./serverCustomFetch";

export async function getChallengeById({
    id,
}: {
    id: string;
}): Promise<ChallengePrimitive> {
    try {
        const response = await serverCustomFetch(API_ROUTES.CHALLENGES.BY_ID(id));

        return response.json();
    } catch (error) {
        redirect('/');
    }

}
