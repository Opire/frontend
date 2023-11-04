import '@mantine/core/styles.css';

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
                <ColorSchemeScript />
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
                    <Notifications limit={5} />
                    <ModalsProvider>
                        {children}
                    </ModalsProvider>
                </MantineProvider>
            </body>
        </html>
    )
}
