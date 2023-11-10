import { TokenServiceLocalStorage } from "../../TokenServiceLocalStorage";
import { API_ROUTES } from "../../constants";
import { errorNotification } from "./errorNotification";

export async function clientCustomFetch(
    url: string,
    options: {
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        body?: Object;
        headers?: HeadersInit;
    } = {
            method: "GET",
            body: undefined,
            headers: {},
        }
): Promise<Response> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TokenServiceLocalStorage.getToken()}`,
            ...options.headers,
        },
        body: JSON.stringify(options.body),
        method: options.method,
        cache: "no-store",
    });

    if (!response.ok && response.status === 401) {
        errorNotification({
            title: "You need to login in order to perform this action",
        });
        clientCustomFetch(API_ROUTES.AUTH.LOGOUT(), { method: "POST" });
        TokenServiceLocalStorage.removeToken();
    }

    if (!response.ok) {
        const body = await response.json();
        const { error, message } = body;

        throw new Error(`${error}: ${message}`);
    }

    return response;
}
