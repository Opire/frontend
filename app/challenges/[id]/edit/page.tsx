import { getChallengeById } from "../../../_utils/getChallengeById";
import { redirect } from "next/navigation";
import { EditPublishedChallengeView } from "./view";
import { getUserAuth } from "../../../_utils/getUserAuth";
import { Metadata } from "next";

export async function generateMetadata ({
    params,
}: { params: { id: string } }): Promise<Metadata> {
    const challenge = await getChallengeById({
        id: params.id,
    });

    return {
        title: `${challenge.title} (Challenge) - Opire`,
    };
}

export default async function Page ({
    params,
}: { params: { id: string } }) {
    const challenge = await getChallengeById({
        id: params.id,
    });

    const userAuth = getUserAuth();

    const isUserChallengeCreator = !!userAuth && userAuth.userId === challenge.creatorId;
    if (!isUserChallengeCreator) {
        redirect(`/challenges/${challenge.id}`);
    }

    return (<EditPublishedChallengeView challenge={challenge} />);
}
