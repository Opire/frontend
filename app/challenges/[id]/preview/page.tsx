import { Metadata } from "next";
import { getChallengeById } from "../../../_utils/getChallengeById";
import { redirect } from "next/navigation";
import { PreviewPublishedChallengeView } from "./view";

export async function generateMetadata({
    params,
}: { params: { id: string } }): Promise<Metadata> {
    const challenge = await getChallengeById({
        id: params.id,
    });

    return {
        title: `[PREVIEW] ${challenge.title} (Challenge) - Opire`,
    };
}

export default async function Page({
    params,
}: { params: { id: string } }) {
    const challenge = await getChallengeById({
        id: params.id,
    });

    const isChallengeAlreadyPublished = challenge.isPublished;
    if (isChallengeAlreadyPublished) {
        redirect(`/challenges/${challenge.id}`);
    }

    return (<PreviewPublishedChallengeView challenge={challenge} />);
}
