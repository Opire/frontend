'use client'

import { AppShell, Burger, AppShellHeader, AppShellNavbar, AppShellMain, Group, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { LogoIcon } from "../LogoIcon";
import { Navbar } from "./Navbar";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";

interface MainLayoutProps {
    headerContent?: JSX.Element;
    userAuth: UserAuthDTO | null;
}

export const MainLayoutClient: FC<MainLayoutProps> = ({
    children,
    headerContent,
    userAuth,
}) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            px="none"
        >
            <AppShellHeader>
                <Group h="100%" px="md" justify={'space-between'}>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

                    {headerContent &&
                        <Box hiddenFrom="sm" style={{ width: '70%' }}>
                            {headerContent}
                        </Box>
                    }

                    <LogoIcon />

                    {headerContent &&
                        <Box visibleFrom="sm" style={{ width: 'calc(100% - 300px)' }}>
                            {headerContent}
                        </Box>
                    }
                </Group>
            </AppShellHeader>

            <AppShellNavbar p="md">
                <Navbar userAuth={userAuth} />
            </AppShellNavbar>

            <AppShellMain>
                {children}
            </AppShellMain>
        </AppShell>
    )
}
