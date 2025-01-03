import { cookies } from "next/headers";
import { API_ROUTES } from "../../constants";

export async function serverCustomFetch (
    url: string,
    options: {
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        body?: object;
        headers?: HeadersInit;
    } = {
        method: "GET",
        body: undefined,
        headers: {},
    },
): Promise<Response> {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            "x-opire-handshake": process.env.OPIRE_HANDSHAKE || "",
            ...options.headers,
        },
        body: JSON.stringify(options.body),
        method: options.method,
        cache: "no-store",
    });

    if (!response.ok && response.status === 401) {
    // TODO: can we show error from server?
        serverCustomFetch(API_ROUTES.AUTH.LOGOUT(), { method: "POST" });
    }

    if (!response.ok) {
        const body = await response.json();
        const { error, message } = body;

        throw new Error(`${error}: ${message}`);
    }

    return response;
}
