'use client'

import { API_ROUTES } from "../../../constants";
import { AuthCodeOverlay } from "../../_components/User/AuthCodeOverlay";

export function AuthBitbucketView() {
    return (
        <AuthCodeOverlay
            urlForApiToken={API_ROUTES.AUTH.BITBUCKET}
        />
    );
}
