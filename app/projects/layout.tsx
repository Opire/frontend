import { Container, Text } from "@mantine/core";
import { SearchInput } from "./_components/SearchInput";
import { MainLayout } from "../_components/Layouts/MainLayout";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <MainLayout
            headerContent={
                <Container size='lg'>
                    <SearchInput />
                </Container>
            }
        >
            <Text
                style={{ textAlign: 'center', padding: '20px 0', fontSize: "2.4rem", fontWeight: "bold" }}
            >
                Projects
            </Text>

            <Container size='lg' style={{ paddingBottom: '20px' }}>
                {children}
            </Container>
        </MainLayout>
    )
}
