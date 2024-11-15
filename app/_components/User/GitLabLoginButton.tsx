import { Button } from "@mantine/core";
import querystring from "querystring";
import { FC } from "react";
import { IconBrandGitlab } from "@tabler/icons-react";

export async function openGitlabExternalLoginPage() {
    const params = querystring.stringify({
        client_id: process.env.NEXT_PUBLIC_GITLAB_APP_ID,
        redirect_uri: `${process.env.NEXT_PUBLIC_URL!}/auth/gitlab`,
        response_type: "code",
        // state: 'STATE', // TODO: spike about STATE and random hash here for security
        scope: ["read_user"].join(" "),
    });
    const url = `https://gitlab.com/oauth/authorize?${params}`;

    window.open(url, "_self", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500");
    // window.open(url, 'targetWindow', `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500`);
}

export const GitLabLoginButton: FC = () => (
    <Button leftSection={<IconBrandGitlab size='1rem' />} onClick={openGitlabExternalLoginPage} variant="gradient">Continue with GitLab</Button>
);
