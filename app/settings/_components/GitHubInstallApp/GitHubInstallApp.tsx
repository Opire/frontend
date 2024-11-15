"use client";

import { Card, Button, Center } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

export function GitHubInstallApp() {
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
