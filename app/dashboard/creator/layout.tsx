import { Space, Title } from "@mantine/core"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <Title style={{ textAlign: 'center' }} fw={300}>Creator dashboard</Title>
            <Space h='1rem' />
            {children}
        </>
    )
}
