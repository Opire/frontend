import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../../../_utils/redirectToHomeIfNotLogged";
import { DashboardCreatorView } from "./view";

export const metadata: Metadata = {
    title: 'Make my Change',
}

export default async function Page() {
    redirectToHomeIfNotLogged()

    return (
        <>
            <DashboardCreatorView />
        </>
    );
}
