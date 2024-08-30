import { FC } from "react";
import { LoginButton } from "./LoginButton";
import { LoggedUser } from "./LoggedUser";
import { UserAuthDTO } from "../../_core/_dtos/UserAuthDTO";

export const UserInfo: FC<{
    userAuth: UserAuthDTO | null;
}> = ({ userAuth }) => {
    return (
        <>
            {!userAuth && <LoginButton />}
            {userAuth && <LoggedUser userAuth={userAuth} />}
        </>
    );
};
