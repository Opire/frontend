'use client'

import { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingOverlay } from "@mantine/core";
import { API_ROUTES } from "../../../constants";
import { clientCustomFetch } from "../../_utils/clientCustomFetch";
import { generalLoadingNotification } from "../../_utils/generalLoadingNotification";

const PaymentCodeOverlay: FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    useEffect(() => {
        const paypalToken = searchParams.get('token') as string | undefined;

        if (paypalToken) {
            processPayment(paypalToken)
        }
    }, [router])

    async function processPayment(paymentToken: string) {
        generalLoadingNotification({
            titleOnStart: 'Processing payment...',
            titleOnEnd: 'Payment succesfull',
            titleOnError: 'Error while processing the payment',
            actionToNotify: async () => {
                await clientCustomFetch(API_ROUTES.PAYMENTS.CAPTURE(), {
                    method: 'POST',
                    body: {
                        paymentToken
                    }
                });

                setTimeout(() => {
                    window.close();
                }, 5000)
            }
        })
    }

    return (
        <LoadingOverlay visible={true}></LoadingOverlay>
    );
}

export default PaymentCodeOverlay;
