"use client";

import { NEXT_SERVER_ROUTES } from "../../../constants";
import { AuthCodeOverlay } from "../../_components/User/AuthCodeOverlay";

export function AuthGitlabView () {
    return <AuthCodeOverlay urlForApiToken={NEXT_SERVER_ROUTES.AUTH.GITLAB} />;
}
