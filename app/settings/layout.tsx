import { MainLayout } from "../_components/Layouts/MainLayout"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}
