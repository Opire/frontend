'use client'

import { Button, SimpleGrid } from "@mantine/core";
import { IconListNumbers, IconFileSearch, IconBrandReddit, IconBrandTwitter, IconBrandDiscord, IconBrandThreads, IconMail, IconCoffee, } from "@tabler/icons-react";
import { URL_DOCUMENTATION } from "../../../constants";

interface Link {
    icon: JSX.Element;
    text: string;
    path: string;
    color: string;
}

export const InterestingLinks = () => {
    const links: Link[] = [
        {
            icon: <IconListNumbers size={18} />,
            text: 'Start',
            path: `${URL_DOCUMENTATION}/overview/getting-started`,
            color: 'gray',
        },
        {
            icon: <IconFileSearch size={18} />,
            text: 'Docs',
            path: `${URL_DOCUMENTATION}`,
            color: 'lime',
        },
        {
            icon: <IconBrandReddit size={18} />,
            text: 'Reddit',
            path: 'https://www.reddit.com/r/opire',
            color: 'orange',
        },
        {
            icon: <IconBrandTwitter size={18} />,
            text: 'Twitter',
            path: 'https://twitter.com/opire_dev',
            color: 'blue',
        },
        {
            icon: <IconBrandDiscord size={18} />,
            text: 'Discord',
            path: 'https://discord.gg/jWwwsHRbnJ',
            color: 'violet',
        },
        {
            icon: <IconBrandThreads size={18} />,
            text: 'Threads',
            path: 'https://www.threads.net/@opiredev',
            color: 'gray',
        },
        // {
        //     icon: <IconBrandYoutube size={18} />,
        //     text: 'YouTube',
        //     path: 'https://www.youtube.com/@opire', // TODO: review
        //     color: 'red',
        // },
        {
            icon: <IconMail size={18} />,
            text: 'Contact',
            path: 'mailto:opiredev@gmail.com',
            color: 'teal',
        },
        {
            icon: <IconCoffee size={18} />,
            text: 'Donate',
            path: 'https://ko-fi.com/opire',
            color: 'cyan',
        },
    ];

    return (
        <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
            {links.map(link => (
                <Button
                    key={link.text}
                    component="a"
                    color={link.color}
                    leftSection={link.icon}
                    variant="subtle"
                    href={link.path}
                    target="_blank"
                >
                    {link.text}
                </Button>
            ))}
        </SimpleGrid>
    )
}
