import { useMemo } from "react";
import { Token } from "../app/_core/_vos/Token";


export const useUserAuth = () => {
    // const cookies = useCookies();
    const token = 'patata';
    // const token = cookies.get('token');
    // const token = getCookieValue('token');
    // console.log({ token })

    const userAuth = useMemo(() => {
        if (token) {
            return Token.getTokenPayload(token);
        }

        return null;
    }, [token]);

    return userAuth;
}
