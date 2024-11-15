import { Metadata } from "next";
import { ChallengeCreatorView } from "./creator-view";
import { ChallengePublicView } from "./public-view";
import { getUserAuth } from "../../_utils/getUserAuth";
import { getChallengeById } from "../../_utils/getChallengeById";

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
    if (isUserChallengeCreator) {
        return (<ChallengeCreatorView challenge={challenge} creator={userAuth} />);
    }

    return (<ChallengePublicView challenge={challenge} userAuth={userAuth} />);
}
