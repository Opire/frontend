import { Container, Text } from "@mantine/core";
import { MainLayout } from "../../_components/Layouts/MainLayout";
import { SearchInput } from "./_components/SearchInput";

export default function Layout ({
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
                style={{ textAlign: "center", padding: "20px 0", fontSize: "2.4rem", fontWeight: "bold" }}
            >
                Challenges
            </Text>

            <Container size='lg' style={{ paddingBottom: "20px" }}>
                {children}
            </Container>
        </MainLayout>
    );
}
