"use client";

import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientCustomFetch } from "../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../constants";

export function AuthStripeView({ userId }: { userId: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code") as string;
        configureStripe(code);
    }, [searchParams]);

    async function configureStripe(code: string) {
        await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_CONNECT_ACCOUNT(), {
            method: "POST",
            body: { code, ownerId: userId },
        });
        router.push('/settings')
    }

    return (
        <LoadingOverlay visible={true}></LoadingOverlay>
    );
}
