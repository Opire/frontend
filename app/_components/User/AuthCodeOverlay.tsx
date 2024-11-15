import { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingOverlay } from "@mantine/core";
import { clientCustomFetch } from "../../_utils/clientCustomFetch";
import { TokenServiceLocalStorage } from "../../../TokenServiceLocalStorage";

export const AuthCodeOverlay: FC<{
    urlForApiToken: (code: string) => string;
}> = ({ urlForApiToken }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code") as string;
        getAndSaveToken(code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    async function getAndSaveToken(code: string) {
        const res = await clientCustomFetch(urlForApiToken(code));
        const { token } = await res.json();
        TokenServiceLocalStorage.saveToken(token);
        router.push("/home");
    }

    return (
        <LoadingOverlay visible={true}></LoadingOverlay>
    );
};
