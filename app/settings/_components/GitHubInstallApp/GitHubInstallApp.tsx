'use client'

import { Card, Title, Button, Center } from "@mantine/core";
import { FC } from "react";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

interface GitHubInstallAppProps {
}

export const GitHubInstallApp: FC<GitHubInstallAppProps> = ({
}) => {
    const installationURL = `${process.env.NEXT_PUBLIC_GITHUB_APP_LINK}/installations/new`;

    return (
        <Card shadow="xl" padding="xl">
            <Card.Section p='md'>
                <Center>
                    <IconBrandGithub size={50} />
                </Center>
            </Card.Section>

            <Center>
                <Button component={Link} href={installationURL} target="_blank" size="xl" variant="gradient">Install in GitHub</Button>
            </Center>
        </Card >
    );
}
