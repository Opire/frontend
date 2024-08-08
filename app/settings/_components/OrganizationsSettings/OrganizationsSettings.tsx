'use client'
import { SimpleGrid } from "@mantine/core";
import { FC } from "react";
import { UserSettingsDTO } from "../../../_core/_dtos/UserSettingsDTO";
import { OrganizationSettingsCard } from "./OrganizationSettingsCard";

interface OrganizationsSettingsProps {
    organizations: UserSettingsDTO['payments']['organizations'];
}

export const OrganizationsSettings: FC<OrganizationsSettingsProps> = ({
    organizations,
}) => {

    return (
        <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} w='100%' spacing='xl' verticalSpacing='xl' >
            {organizations.map(organization => (<OrganizationSettingsCard key={organization.id} organization={organization} />))}
        </SimpleGrid>
    );
}
