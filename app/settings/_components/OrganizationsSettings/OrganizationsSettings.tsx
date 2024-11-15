"use client";
import { Blockquote, SimpleGrid, Text } from "@mantine/core";
import { FC } from "react";
import { UserSettingsDTO } from "../../../_core/_dtos/UserSettingsDTO";
import { OrganizationSettingsCard } from "./OrganizationSettingsCard";
import { ORGANIZATION_TIER_NAMES } from "../../../_core/_types/TierNames";
import { IconInfoCircle } from "@tabler/icons-react";

interface OrganizationsSettingsProps {
    organizations: UserSettingsDTO["payments"]["organizations"];
}

export const OrganizationsSettings: FC<OrganizationsSettingsProps> = ({
    organizations,
}) => {
    const hasAccessToSomeOrganizationCustomerPortal = organizations.some(organization => organization.tierName !== ORGANIZATION_TIER_NAMES.ORGANIZATION_BASIC);

    return (
        <>
            {hasAccessToSomeOrganizationCustomerPortal &&
                <Blockquote color='green' icon={<IconInfoCircle />}>
                    <Text style={{ fontSize: "1rem" }}>
                       To manage an organization subscription, you will need to provide the email address that was used when making the first payment of the subscription
                    </Text>
                </Blockquote>
            }

            <SimpleGrid cols={{ xs: 1, md: 2, lg: 3 }} w='100%' spacing='xl' verticalSpacing='xl' >
                {organizations.map(organization => (<OrganizationSettingsCard key={organization.id} organization={organization} />))}
            </SimpleGrid>
        </>
    );
};
