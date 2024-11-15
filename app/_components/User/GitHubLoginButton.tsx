import { Button } from "@mantine/core";
import querystring from "querystring";
import { FC } from "react";
import { IconBrandGithub } from "@tabler/icons-react";

export async function openGithubExternalLoginPage() {
    const params = querystring.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID,
        redirect_uri: `${process.env.NEXT_PUBLIC_URL!}/auth/github`,
        scope: ["read:user", "user:email"].join(" "), // space seperated string
        allow_signup: true,
    });
    const url = `https://github.com/login/oauth/authorize?${params}`;

    window.open(url, "_self", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500");
    // window.open(githubLoginUrl, 'targetWindow', 'popup=yes'); // Default behavior of the browser
}

export const GitHubLoginButton: FC = () => (
    <Button leftSection={<IconBrandGithub size='1rem' />} onClick={openGithubExternalLoginPage} variant="gradient">Continue with GitHub</Button>
);
