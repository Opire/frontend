import { Metadata } from "next";
import { AuthStripeView } from "./view";

export const metadata: Metadata = {
    title: 'Opire - Stripe',
}

export default async function Page() {

    return (
        <AuthStripeView />
    );
}
