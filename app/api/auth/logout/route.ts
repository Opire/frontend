import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
    const cookieStore = cookies();
    cookieStore.delete("token");
    redirect("/");
};
