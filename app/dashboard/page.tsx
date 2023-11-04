import { Metadata } from "next";
import { redirectToHomeIfNotLogged } from "../_utils/redirectToHomeIfNotLogged";
import { DashboardView } from "./view";

export const metadata: Metadata = {
    title: 'Make my Change',
}

export default function Page() {
    redirectToHomeIfNotLogged()

    return (
        <DashboardView />
    );
}
