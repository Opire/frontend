'use client'

import { NavLink } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { clientCustomFetch } from "../../_utils/clientCustomFetch";
import { TokenServiceLocalStorage } from "../../../TokenServiceLocalStorage";
import { NEXT_SERVER_ROUTES } from "../../../constants";

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
                    TokenServiceLocalStorage.removeToken();
                    await clientCustomFetch(NEXT_SERVER_ROUTES.AUTH.LOGOUT(), { method: "POST" });
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
