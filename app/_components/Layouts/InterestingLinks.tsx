'use client'

import { Button, SimpleGrid } from "@mantine/core";
import { IconListNumbers, IconFileSearch, IconBrandReddit, IconBrandTwitter, IconBrandDiscord, IconBrandYoutube, IconMail, IconCoffee } from "@tabler/icons";
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
            path: `${URL_DOCUMENTATION}/getting-started`, // TODO: review
            color: 'gray',
        },
        {
            icon: <IconFileSearch size={18} />,
            text: 'Docs',
            path: `${URL_DOCUMENTATION}`, // TODO: review
            color: 'lime',
        },
        {
            icon: <IconBrandReddit size={18} />,
            text: 'Reddit',
            path: 'https://www.reddit.com/r/makemychange', // TODO: review
            color: 'orange',
        },
        {
            icon: <IconBrandTwitter size={18} />,
            text: 'Twitter',
            path: 'https://twitter.com/makemychange', // TODO: review
            color: 'blue',
        },
        {
            icon: <IconBrandDiscord size={18} />,
            text: 'Discord',
            path: 'https://discord.com/servers/makemychange', // TODO: review
            color: 'violet',
        },
        {
            icon: <IconBrandYoutube size={18} />,
            text: 'YouTube',
            path: 'https://www.youtube.com/@lacuevadelcodigo', // TODO: review
            color: 'red',
        },
        {
            icon: <IconMail size={18} />,
            text: 'Contact',
            path: 'mailto:makemychangedev@gmail.com', // TODO: review
            color: 'teal',
        },
        {
            icon: <IconCoffee size={18} />,
            text: 'Donate',
            path: 'https://ko-fi.com/makemychange', // TODO: review
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
