import { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingOverlay } from "@mantine/core";
import { clientCustomFetch } from "../../_utils/clientCustomFetch";

export const AuthCodeOverlay: FC<{
    urlForApiToken: (code: string) => string
}> = ({
    urlForApiToken
}) => {
        const router = useRouter()
        const searchParams = useSearchParams()

        useEffect(() => {
            const code = searchParams.get('code') as string;
            getAndSaveToken(code)
        }, [searchParams])

        async function getAndSaveToken(code: string) {
            await clientCustomFetch(`${process.env.NEXT_PUBLIC_API_URL}${urlForApiToken(code)}`);
            router.push('/home')
        }

        return (
            <LoadingOverlay visible={true}></LoadingOverlay>
        );
    }
