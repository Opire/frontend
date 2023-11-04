import { Metadata } from "next";
import PaymentCodeOverlay from "../../_components/User/PaymentCodeOverlay";

export const metadata: Metadata = {
    title: 'Make my Change',
}

export default function Page() {
    return (
        <PaymentCodeOverlay />
    );
}
