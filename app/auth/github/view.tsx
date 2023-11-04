'use client'

import { API_ROUTES } from "../../../constants";
import { AuthCodeOverlay } from "../../_components/User/AuthCodeOverlay";

export function AuthGithubView() {
    return (
        <AuthCodeOverlay
            urlForApiToken={API_ROUTES.AUTH.GITHUB}
        />
    );
}
