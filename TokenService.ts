import { cookies } from 'next/headers'

export abstract class TokenService {

    private static readonly keyPersistenceToken = 'token';

    public static getToken(): string | null {
        const cookieStore = cookies()
        const token = cookieStore.get(TokenService.keyPersistenceToken)

        if (!token) {
            return null
        }

        return token.value;
    }

    public static saveToken(token: string): void {
        const cookieStore = cookies()
        cookieStore.set(TokenService.keyPersistenceToken, token, { httpOnly: true });
        // TokenService.notifyChangeStore();
    }


    public static removeToken(): void {
        const cookieStore = cookies()
        cookieStore.delete(TokenService.keyPersistenceToken);
        // TokenService.notifyChangeStore();
    }

    // private static notifyChangeStore() {
    //     if (window) {
    //         window.dispatchEvent(new Event("storage"));
    //     }
    // }
}
