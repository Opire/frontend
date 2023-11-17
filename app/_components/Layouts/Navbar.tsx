'use client'

import { FC } from "react";
import { IconCoinEuro, IconSettings, IconLayoutDashboard, IconMoneybag, IconUserCircle, IconChartHistogram } from "@tabler/icons";
import { usePathname, useRouter } from "next/navigation";
import { Divider, NavLink, Space } from "@mantine/core";
import { ChartBar, DeviceLaptop } from "tabler-icons-react";
import { LogoutButton } from "./LogoutButton";
import { useExternalStateOverride } from "../../../hooks/useExternalStateOverride";
import { UserInfo } from "../User/UserInfo";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";
import { InterestingLinks } from "./InterestingLinks";

interface NavbarProps {
    userAuth: UserAuthDTO | null;
}

interface ItemMenu {
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
            icon: <IconMoneybag size={18} />,
            text: 'Rewards',
            path: '/home',
            isPublic: true,
        },
        {
            icon: <IconLayoutDashboard size={18} />,
            text: 'My dashboard',
            // path: '/dashboard',
            isPublic: false,
            children: [
                {
                    icon: <ChartBar size={18} />,
                    text: 'Creator',
                    // path: '/dashboard/creator',
                    isPublic: false,
                    children: [
                        {
                            icon: <IconMoneybag size={18} />,
                            text: 'Rewards',
                            path: '/dashboard/creator/rewards',
                            isPublic: false,
                        },
                        {
                            icon: <IconCoinEuro size={18} />,
                            text: 'Tips',
                            path: '/dashboard/creator/tips',
                            isPublic: false,
                        }
                    ]
                },
                {
                    icon: <DeviceLaptop size={18} />,
                    text: 'Programmer',
                    // path: '/dashboard/programmer',
                    isPublic: false,
                    children: [
                        {
                            icon: <IconMoneybag size={18} />,
                            text: 'Rewards',
                            path: '/dashboard/programmer/rewards',
                            isPublic: false,
                        },
                        {
                            icon: <IconCoinEuro size={18} />,
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

            <div className={'.links-scrollbar'} style={{ marginBottom: '10px', overflow: 'auto' }}>
                <InterestingLinks />
            </div>

            <style>
                {`
                    .links-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: transparent;
                    }

                    ::-webkit-scrollbar {
                        width: 6px;
                    }

                    ::-webkit-scrollbar-track {
                        background: transparent;
                    }
                `}
            </style>
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
                    key={item.path}
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
                label={<div onClick={handleClickNavLink(item)}>
                    {item.text}
                </div>
                }
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
                onClick={() => setIsOpen(prev => !prev)}
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
        return (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (!item.path) {
                return;
            }

            event.stopPropagation();
            router.push(item.path);
        };
    }

    function shouldStartOpened(item: ItemMenu, path: string): boolean {
        const hasTheSamePath = item.path === path;
        const childrenHaveSamePath = item.children?.some(child => child.path === path
            || shouldStartOpened(child, path));

        return (hasTheSamePath || childrenHaveSamePath) ?? false;
        // return childrenHaveSamePath ?? false;
    }

}

