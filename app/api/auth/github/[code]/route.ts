import { NextRequest, NextResponse } from "next/server";
import { serverCustomFetch } from "../../../../_utils/serverCustomFetch";
import { API_ROUTES } from "../../../../../constants";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest, { params }: any) => {
    const res = await serverCustomFetch(API_ROUTES.AUTH.GITHUB(params.code), {
        method: "GET",
    });

    // console.log("Response", res);
    res.headers.getSetCookie().forEach((cookie: string) => {
        const [key, value] = cookie.split("=");
        if (key === "token") {
            const tokenValue = value.split(";")[0];
            // console.log("TOKEN VALUE", tokenValue);
            const cookieStore = cookies();
            cookieStore.set("token", tokenValue, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });
        }
    });

    return NextResponse.json({}, { status: 200 });
};
