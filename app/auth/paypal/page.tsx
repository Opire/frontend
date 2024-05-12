import { Metadata } from "next";
import { AuthPaypalView } from "./view";

export const metadata: Metadata = {
    title: 'Opire - PayPal',
}

export default function Page() {
    return (
        <AuthPaypalView />
    );
}
