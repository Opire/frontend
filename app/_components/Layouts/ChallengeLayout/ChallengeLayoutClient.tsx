"use client";

import { AppShell, Burger, AppShellHeader, AppShellNavbar, AppShellMain, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { UserAuthDTO } from "../../../_core/_dtos/UserAuthDTO";
import { LogoIcon } from "../../LogoIcon";
import { Navbar } from "../Navbar";

interface ChallengeLayoutProps {
    userAuth: UserAuthDTO | null;
}

export const ChallengeLayoutClient: FC<ChallengeLayoutProps> = ({
    children,
    userAuth,
}) => {
    const [opened, { toggle }] = useDisclosure(true);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: "xs", collapsed: { mobile: !opened, desktop: !opened } }}
            px="none"
        >
            <AppShellHeader>
                <Group h="100%" px="md" justify={"space-between"}>
                    <Burger opened={opened} onClick={toggle} size="sm" />

                    <LogoIcon />
                </Group>
            </AppShellHeader>

            <AppShellNavbar p="md">
                <Navbar userAuth={userAuth} />
            </AppShellNavbar>

            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    );
};
