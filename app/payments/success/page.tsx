import { Metadata } from "next";
import { PaymentSuccess } from "../_components/PaymentSuccess";

export const metadata: Metadata = {
    title: 'Make my Change - Payment successful',
}

export default function Page() {
    return (
        <PaymentSuccess />
    );
}
