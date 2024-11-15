import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getIssueById } from "../../../../_utils/getIssueById";
import { IssueListDTO } from "../../../../_core/_dtos/IssueListDTO";
import { PricePrimitive } from "../../../../_core/_primitives/PricePrimitive";
import { StaticHomeRewardCard } from "./_components/StaticHomeRewardCard";

export const GET = async (req: NextRequest, { params }: any) => {
    const issueId = params?.id;

    if (!issueId) {
        return new ImageResponse(<></>, {
            width: 1200,
            height: 630,
        });
    }

    const issue = await getIssueById({
        id: issueId,
    });

    const availablePrice: PricePrimitive = issue.rewards.reduce((acc, el) => {
        if (el.status === "Available") {
            acc.value += el.price.value;
        }

        return acc;
    }, { unit: "USD_CENT", value: 0 });

    const issueList: IssueListDTO = {
        id: issue.id,
        title: issue.title,
        url: issue.issueURL,
        platform: issue.platform,
        organization: {
            id: issue.project.organization.id,
            name: issue.project.organization.name,
            logoURL: issue.project.organization.logoUrl,
            url: issue.project.organization.url,
        },
        project: {
            id: issue.project.id,
            url: issue.project.url,
            name: issue.project.name,
            isPublic: issue.project.isPublic,
            isBotInstalled: issue.project.isInstalled,
        },
        programmingLanguages: issue.project.programmingLanguages,
        pendingPrice: availablePrice,
        createdAt: issue.createdAt,
        claimerUsers: [],
        tryingUsers: [],
    };

    const roboto = await fetch(new URL(`${process.env.NEXT_PUBLIC_URL}/fonts/Roboto/Roboto-Regular.ttf`)).then((res) => res.arrayBuffer());

    const robotoBold = await fetch(new URL(`${process.env.NEXT_PUBLIC_URL}/fonts/Roboto/Roboto-Bold.ttf`)).then((res) => res.arrayBuffer());

    return new ImageResponse(<StaticHomeRewardCard data={issueList} />, {
        width: 400,
        height: 450,
        fonts: [
            {
                name: "Roboto",
                data: roboto,
                style: "normal",
            },
            {
                name: "Roboto-Bold",
                data: robotoBold,
                style: "normal",
            },
        ],
    });
};
