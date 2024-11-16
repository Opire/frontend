import { Container } from "@mantine/core";
import { MainLayout } from "../../_components/Layouts/MainLayout";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <MainLayout>
            <Container size='xl' style={{ padding: "20px" }}>
                {children}
            </Container>
        </MainLayout>
    );
}
