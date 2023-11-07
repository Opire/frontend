'use client'

import { NavLink } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { API_ROUTES } from "../../../constants";
import { clientCustomFetch } from "../../_utils/clientCustomFetch";

export const LogoutButton: FC<{}> = ({ }) => {
    const router = useRouter();

    return (
        <>
            <NavLink
                label='Logout'
                leftSection={<IconLogout size={18} />}
                variant={"subtle"}
                active={true}
                color='red'
                onClick={async () => {
                    await clientCustomFetch('/api/auth/logout', { method: 'POST' })
                    router.refresh()
                }}
                styles={{
                    label: {
                        fontSize: '16px',
                    },
                    body: {
                        margin: '4px 0'
                    },
                }}
            />
        </>
    )
}
