import { NextRequest, NextResponse } from "next/server";
import { serverCustomFetch } from "../../../../_utils/serverCustomFetch";
import { cookies } from "next/headers";
import { API_ROUTES } from "../../../../../constants";

export const GET = async (req: NextRequest, { params }: any) => {
    const res = await serverCustomFetch(API_ROUTES.AUTH.GITLAB(params.code), {
        method: "GET",
    });
    const resJson = await res.json();

    const token = resJson.data;
    const cookieStore = cookies();
    cookieStore.set('token', token, {
        httpOnly: true, secure: true,
    });

    return NextResponse.json({ token }, { status: 200 })
}
