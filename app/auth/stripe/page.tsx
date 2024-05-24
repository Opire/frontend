import { Metadata } from "next";
import { AuthStripeView } from "./view";
import { getUserSettings } from "../../_utils/getUserSettings";
import { redirectToHomeIfNotLogged } from "../../_utils/redirectToHomeIfNotLogged";

export const metadata: Metadata = {
    title: 'Opire - Stripe',
}

export default async function Page() {
    redirectToHomeIfNotLogged();
    const userSettings = await getUserSettings();

    return (
        <AuthStripeView userId={userSettings.id} />
    );
}
