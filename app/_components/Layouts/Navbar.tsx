'use client'

import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Divider, NavLink, Space } from "@mantine/core";
import { IconChartBar, IconDeviceLaptop, IconCoin, IconSettings, IconLayoutDashboard, IconMoneybag } from "@tabler/icons-react";
import { LogoutButton } from "./LogoutButton";
import { useExternalStateOverride } from "../../../hooks/useExternalStateOverride";
import { UserInfo } from "../User/UserInfo";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";
import { InterestingLinks } from "./InterestingLinks";

interface NavbarProps {
    userAuth: UserAuthDTO | null;
}

interface ItemMenu {
    id: string;
    icon?: JSX.Element;
    text: string;
    path?: string;
    isPublic: boolean;
    children?: ItemMenu[];
}


export const Navbar: FC<NavbarProps> = ({
    userAuth,
}) => {
    const path = usePathname()

    const menuItems: ItemMenu[] = [
        {
            id: 'home',
            icon: <IconMoneybag size={18} />,
            text: 'Rewards',
            path: '/home',
            isPublic: true,
        },
        {
            id: 'dashboard',
            icon: <IconLayoutDashboard size={18} />,
            text: 'My dashboard',
            // path: '/dashboard',
            isPublic: false,
            children: [
                {
                    id: 'dashboard-creator',
                    icon: <IconChartBar size={18} />,
                    text: 'Creator',
                    // path: '/dashboard/creator',
                    isPublic: false,
                    children: [
                        {
                            id: 'dashboard-creator-rewards',
                            icon: <IconMoneybag size={18} />,
                            text: 'Rewards',
                            path: '/dashboard/creator/rewards',
                            isPublic: false,
                        },
                        {
                            id: 'dashboard-creator-tips',
                            icon: <IconCoin size={18} />,
                            text: 'Tips',
                            path: '/dashboard/creator/tips',
                            isPublic: false,
                        }
                    ]
                },
                {
                    id: 'dashboard-programmer',
                    icon: <IconDeviceLaptop size={18} />,
                    text: 'Programmer',
                    // path: '/dashboard/programmer',
                    isPublic: false,
                    children: [
                        {
                            id: 'dashboard-programmer-rewards',
                            icon: <IconMoneybag size={18} />,
                            text: 'Rewards',
                            path: '/dashboard/programmer/rewards',
                            isPublic: false,
                        },
                        {
                            id: 'dashboard-programmer-tips',
                            icon: <IconCoin size={18} />,
                            text: 'Tips',
                            path: '/dashboard/programmer/tips',
                            isPublic: false,
                        }
                    ]
                },
                // {
                //     icon: <IconChartHistogram size={18} />,
                //     text: 'Metrics',
                //     path: '/dashboard/metrics',
                //     isPublic: false,
                // }
            ]
        },
        {
            id: 'settings',
            icon: <IconSettings size={18} />,
            text: 'Settings',
            path: '/settings',
            isPublic: false,
            // children: [
            //     {
            //         icon: <IconUserCircle size={18} />,
            //         text: 'Profile',
            //         path: '/settings/profile',
            //         isPublic: false,
            //     }
            // ]
        }
    ];

    return (
        <>
            <Space h='4px' />
            <UserInfo userAuth={userAuth} />
            <Space h='8px' />

            {userAuth && <LogoutButton />}

            <Divider my="sm" />
            <NavbarMenu
                menuItems={menuItems}
                path={path}
                userAuth={userAuth}
            />

            <Divider style={{ marginTop: 'auto', marginBottom: '10px' }} />

            <div className="links" style={{ marginBottom: '10px', overflow: 'auto' }} >
                <InterestingLinks />
            </div>
        </>
    )
}

function NavbarMenu({
    menuItems,
    userAuth,
    path
}: {
    menuItems: ItemMenu[],
    userAuth: UserAuthDTO | null,
    path: string
}): JSX.Element {
    // TODO: Check if it's worth to include an state for open

    return <>
        {
            menuItems.filter(item => item.isPublic || userAuth !== null).map(item => (
                <NavbarMenuItem
                    key={item.id}
                    item={item}
                    path={path}
                    userAuth={userAuth}
                />
            ))
        }
    </>

}



function NavbarMenuItem({
    item,
    userAuth,
    path
}: {
    item: ItemMenu,
    userAuth: UserAuthDTO | null,
    path: string
}): JSX.Element {
    const router = useRouter();

    const [isOpen, setIsOpen] = useExternalStateOverride(shouldStartOpened(item, path));

    return <>
        {
            <NavLink
                key={item.text}
                label={item.text}
                leftSection={item.icon}
                variant={"subtle"}
                active={path === item.path}
                defaultOpened={isOpen}
                opened={isOpen}
                styles={{
                    label: {
                        fontSize: '16px',
                    },
                    body: {
                        margin: '4px 0'
                    },
                }}
                onClick={() => {
                    setIsOpen(prev => !prev);
                    handleClickNavLink(item);
                }}
            >
                {item.children && item.children.length > 0 && (
                    <NavbarMenu
                        menuItems={item.children}
                        userAuth={userAuth}
                        path={path}
                    />
                )}
            </NavLink >
        }
    </>

    function handleClickNavLink(item: ItemMenu) {
        if (!item.path) {
            return;
        }

        router.push(item.path);
    }

    function shouldStartOpened(item: ItemMenu, path: string): boolean {
        const hasTheSamePath = item.path === path;
        const childrenHaveSamePath = item.children?.some(child => child.path === path
            || shouldStartOpened(child, path));

        return (hasTheSamePath || childrenHaveSamePath) ?? false;
        // return childrenHaveSamePath ?? false;
    }

}

