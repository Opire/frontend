import { redirect } from "next/navigation";
import { getUserAuth } from "./getUserAuth";

export function redirectToHomeIfNotLogged () {
    const userAuth = getUserAuth();

    if (!userAuth) {
        redirect("/");
    }
}
