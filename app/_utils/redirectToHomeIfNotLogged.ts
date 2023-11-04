import { redirect } from "next/navigation";
import { TokenService } from "../../TokenService";


export function redirectToHomeIfNotLogged() {
    const token = TokenService.getToken();

    if (!token) {
        redirect('/');
    }
}
