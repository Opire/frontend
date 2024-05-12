"use client";

import { LoadingOverlay } from "@mantine/core";
import { NEXT_SERVER_ROUTES } from "../../../constants";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { clientCustomFetch } from "../../_utils/clientCustomFetch";

export function AuthPaypalView() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code") as string;
        connectPayPalAccount(code);
    }, [searchParams]);


    async function connectPayPalAccount(code: string) {
        await clientCustomFetch(NEXT_SERVER_ROUTES.AUTH.PAYPAL(code));
        window.close()
    }

    return (
        <LoadingOverlay visible={true}></LoadingOverlay>
    );
}
