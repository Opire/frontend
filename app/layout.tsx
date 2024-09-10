import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <head>
                <link rel="shortcut icon" href="/opire_logo.svg" />

                <ColorSchemeScript />

                <style>
                    {`
                    .filters::-webkit-scrollbar {
                        height: 0px;
                        width: 0px;
                    }

                    .links::-webkit-scrollbar {
                        width: 4px;
                    }

                    ::-webkit-scrollbar {
                        width: 8px;
                    }

                    ::-webkit-scrollbar-track {
                        background: transparent;
                    }

                    ::-webkit-scrollbar-thumb {
                        background: linear-gradient(45deg, var(--mantine-color-teal-6) 0%, var(--mantine-color-cyan-7) 100%);
                        border-radius: 8px;
                        height: 10%;
                    }
                `}
                </style>
                <script defer src="https://eu.umami.is/script.js" data-website-id={process.env.NEXT_PUBLIC_UMAMI_TOKEN}></script>
                <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
            </head>

            <body>
                <MantineProvider
                    defaultColorScheme="dark"
                    theme={{
                        primaryColor: 'cyan',
                        defaultGradient: {
                            from: 'teal.6',
                            to: 'cyan.7'
                        },
                    }}
                >
                    <Notifications limit={5} position='bottom-right' />
                    <ModalsProvider>
                        {children}
                    </ModalsProvider>
                </MantineProvider>
            </body>


        </html>
    )
}
