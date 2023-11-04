import { FC } from "react";
import { MainLayout } from "./MainLayout";

interface DetailLayoutProps {
}

export const DetailLayout: FC<DetailLayoutProps> = ({
    children,
}) => {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}
