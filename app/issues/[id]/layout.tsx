import { Container, Text } from "@mantine/core";
import { MainLayout } from "../../_components/Layouts/MainLayout";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <MainLayout>
            <Text
                style={{ textAlign: 'center', padding: '20px 0', fontSize: "2.4rem", fontWeight: "bold" }}
            >
                Issue details
            </Text>

            <Container size='lg' style={{ paddingBottom: '20px' }}>
                {children}
            </Container>
        </MainLayout>
    )
}
