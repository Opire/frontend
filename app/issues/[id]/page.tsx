import { Metadata } from "next";
import { DetailedIssueView } from "./view";
import { getIssueById } from "../../_utils/getIssueById";

export const metadata: Metadata = {
    title: 'Opire - Issue',
}

export default async function Page({
    params,
}: { params: { id: string } }) {
    const issue = await getIssueById({
        id: params.id,
    });

    return (
        <DetailedIssueView issue={issue} />
    );
}
