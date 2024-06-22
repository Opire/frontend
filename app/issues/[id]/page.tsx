import { Metadata } from "next";
import { DetailedIssueView } from "./view";
import { getIssueById } from "../../_utils/getIssueById";
import { PricePrimitive } from "../../_core/_primitives/PricePrimitive";
import { formatPrice } from "../../_utils/formatPrice";

export const metadata: Metadata = {
    title: 'Opire - Issue',
}

export default async function Page({
    params,
}: { params: { id: string } }) {
    const issue = await getIssueById({
        id: params.id,
    });

    const totalPrice: PricePrimitive = issue.rewards.reduce((acc, el) => {
        acc.value += el.price.value
        return acc;

    }, { unit: 'USD_CENT', value: 0 })

    return (
        <>
            <head>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={`${formatPrice(totalPrice)} bounty: ${issue.title}`}
                />
                <meta
                    property="og:description"
                    content={`Earn up to ${formatPrice(totalPrice)} with Opire by solving this issue in ${issue.project.organization.name}/${issue.project.name}`}
                />
            </head>

            <DetailedIssueView issue={issue} />
        </>
    );


}
