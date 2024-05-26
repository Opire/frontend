"use client";

import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientCustomFetch } from "../../_utils/clientCustomFetch";
import { API_ROUTES } from "../../../constants";

export function AuthStripeView() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const ownerId = searchParams.get("state");

        if (!code || !ownerId) {
            router.push("/settings");
            return;
        }

        configureStripe({ code, ownerId });
    }, [searchParams]);

    async function configureStripe({
        code,
        ownerId,
    }: {
        code: string;
        ownerId: string;
    }) {
        await clientCustomFetch(API_ROUTES.PAYMENTS.STRIPE_CONNECT_ACCOUNT(), {
            method: "POST",
            body: { code, ownerId },
        });
        router.push("/settings");
    }

    return <LoadingOverlay visible={true}></LoadingOverlay>;
}
