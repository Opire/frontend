"use client";

import { Avatar, Flex, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";
import { redirectAfterLogin } from "../../_utils/redirectAfterLogin";

export const LoggedUser = ({ userAuth }: { userAuth: UserAuthDTO }) => {
    const router = useRouter();

    useEffect(() => {
        const nextRedirection = redirectAfterLogin.getNextRedirection();

        if (nextRedirection) {
            redirectAfterLogin.clearNextRedirection();
            router.push(nextRedirection);
        }
    }, []);

    return (
        <Flex gap="1rem" align="center">
            <Avatar
                src={userAuth.platformInfo.avatarURL}
                radius="xl"
                size="lg"
            />
            <Text size="lg">{userAuth.platformInfo.username}</Text>
        </Flex>
    );
};
