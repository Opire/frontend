import { Button, Text } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import { ORGANIZATION_TIER_NAMES } from "../../../../_core/_types/TierNames";

export interface OrganizationTiersStripeCurrentTierProps {
    currentTier: ORGANIZATION_TIER_NAMES;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function OrganizationTiersStripeCurrentTier({ currentTier }: OrganizationTiersStripeCurrentTierProps) {
    const stripeCustomerPortalURL = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL;

    return (
        <Button
            radius='2rem'
            size="lg"
            variant="light"
            component="a"
            target="_blank"
            mt={"1rem"}
            href={stripeCustomerPortalURL}
        >
            <IconUsersGroup style={{ marginRight: "8px" }} />
            <Text style={{ fontSize: "1.2rem" }}>
                Manage subscription
            </Text>
        </Button>
    );
}
