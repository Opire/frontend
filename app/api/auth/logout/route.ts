import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const POST = async () => {
    const cookieStore = cookies();
    cookieStore.delete("token");
    redirect("/");
};
