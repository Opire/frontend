import { Container } from "@mantine/core";
import { Filters } from "./_components/Filters/Filters";
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
            <div style={{ position: 'fixed', zIndex: 99, width: '100%' }}>
                <Filters />
            </div>

            <Container size='lg' style={{ paddingTop: '70px', paddingBottom: '20px' }}>
                {children}
            </Container>
        </MainLayout>
    )
}
