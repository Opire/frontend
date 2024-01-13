import { TokenServiceLocalStorage } from "../../TokenServiceLocalStorage";
import { NEXT_SERVER_ROUTES } from "../../constants";
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

    if (response.status === 401) {
        errorNotification({
            title: "You need to login in order to perform this action",
        });
        clientCustomFetch(NEXT_SERVER_ROUTES.AUTH.LOGOUT(), { method: "POST" });
        TokenServiceLocalStorage.removeToken();
    }

    if (!response.ok) {
        const body = await response.json();
        const { errorType, error } = body;

        errorNotification(mapErrorText(body));

        throw new Error(`${errorType}: ${error}`);
    }

    return response;
}

interface BackendError {
    error: string;
    errorType: string;
    data: Record<string, unknown>;
}

function mapErrorText(error: BackendError): { title: string; message?: string } {
    switch (error.errorType) {
        case "ProgrammerPaymentAccountIsNotActivated":
            return {
                title: "The programmer doesn't have their payment account ready yet",
                message: "Contact the programmer and ask them to activate their payment account, and try again after they are done"
            };
        case "PaymentAccountNotFound":
            return {
                title: "The programmer doesn't have their payment account ready yet",
                message: "Contact the programmer, ask them to login into Opire to activate their payment account, and try again after they are done"
            };
        default:
            return {
                title: 'Ups...',
                message: error.error,
            };
    }
}