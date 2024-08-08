import { Button, Text } from "@mantine/core";
import { IconBrandStripe } from "@tabler/icons-react";
import { ORGANIZATION_TIER_NAMES } from "../../../../_core/_types/TierNames";

export interface OrganizationTiersStripeCurrentTierProps {
    currentTier: ORGANIZATION_TIER_NAMES;
}

export function OrganizationTiersStripeCurrentTier({ }: OrganizationTiersStripeCurrentTierProps) {
    // TODO: Use .env var
    const stripeCustomerPortalURL = 'https://billing.stripe.com/p/login/test_eVadSM2vK0CldTq3cc'

    return (
        <Button
            radius='2rem'
            size="lg"
            variant="light"
            component="a"
            target="_blank"
            mt={'1rem'}
            href={stripeCustomerPortalURL}
            >
            <IconBrandStripe style={{ marginRight: '8px' }} />
            <Text lineClamp={2} style={{ fontSize: '1.2rem' }}>
                Manage organization subscription
            </Text>
        </Button>
    );
  }
  