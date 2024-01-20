'use client'

import { IconGitBranch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const LogoIcon: FC<{}> = () => {
    const router = useRouter()

    function goToHome() {
        router.push('/')
    }

    return (
        <IconGitBranch onClick={goToHome} style={{ cursor: 'pointer' }} />
    )
}