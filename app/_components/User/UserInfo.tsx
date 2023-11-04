import { Avatar, Flex, Text } from "@mantine/core";
import { FC } from "react";
import { LoginButton } from "./LoginButton";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";

export const UserInfo: FC<{
    userAuth: UserAuthDTO | null
}> = ({
    userAuth
}) => {

        return (
            <>
                {!userAuth && <LoginButton />}
                {userAuth && <Flex gap='1rem' align='center'>
                    <Avatar src={userAuth.platformInfo.avatarURL} radius='xl' size='lg' />
                    <Text size='lg'>
                        {userAuth.platformInfo.username}
                    </Text>
                </Flex>}
            </>
        )
    }
