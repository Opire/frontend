import { TokenService } from "../../TokenService";
import { Token } from "../_core/_vos/Token";


export function getUserAuth() {
    const token = TokenService.getToken();

    if (token) {
        return Token.getTokenPayload(token);
    }

    return null;
}
