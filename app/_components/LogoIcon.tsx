'use client'

import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const LogoIcon: FC<{}> = () => {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 50em)");
    const logoSize = isMobile ? '26px' : '48px';

    function goToHome() {
        router.push('/')
    }

    return (
        <img src={'/opire_logo.svg'} onClick={goToHome} style={{ cursor: 'pointer', width: logoSize, height: logoSize }} />
    )
}

