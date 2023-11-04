import { Container } from "@mantine/core"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Container size='lg' style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            {children}
        </Container>
    )
}
