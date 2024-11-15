import { Button } from "@mantine/core";
import querystring from "querystring";
import { FC } from "react";
import { IconBrandBitbucket } from "@tabler/icons-react";

export async function openBitbucketExternalLoginPage () {
    const params = querystring.stringify({
        client_id: process.env.NEXT_PUBLIC_BITBUCKET_APP_KEY,
        response_type: "code",
    });
    const url = `https://bitbucket.org/site/oauth2/authorize?${params}`;

    window.open(url, "_self", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500");
}

export const BitBucketLoginButton: FC<{}> = ({
}) => (
    <Button leftSection={<IconBrandBitbucket size='1rem' />} onClick={openBitbucketExternalLoginPage} variant="gradient">Continue with BitBucket</Button>
);
