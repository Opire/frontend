
const NEXT_REDIRECTION_KEY = 'opire-app-redirect-to-after-login'

function prepareNextRedirection(path: string) {
    localStorage.setItem(NEXT_REDIRECTION_KEY, path);
}

function getNextRedirection(): string | null {
    return localStorage.getItem(NEXT_REDIRECTION_KEY);
}

function clearNextRedirection() {
    localStorage.removeItem(NEXT_REDIRECTION_KEY);
}

export const redirectAfterLogin = {
    prepareNextRedirection,
    getNextRedirection,
    clearNextRedirection,
}
