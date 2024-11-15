import { Metadata } from "next";
import { PaymentSuccess } from "../_components/PaymentSuccess";

export const metadata: Metadata = {
    title: "Opire - Payment successful",
};

export default function Page () {
    return (
        <PaymentSuccess />
    );
}
