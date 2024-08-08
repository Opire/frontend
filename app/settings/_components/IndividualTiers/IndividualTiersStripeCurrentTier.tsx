// https://billing.stripe.com/p/login/test_eVadSM2vK0CldTq3cc


import { Button, Text } from "@mantine/core";
import { INDIVIDUAL_TIER_NAMES } from "../../../_core/_types/TierNames";
import { IconBrandStripe } from "@tabler/icons-react";

export interface IndividualTiersStripeCurrentTierProps {
    currentTier: INDIVIDUAL_TIER_NAMES;
}

export function IndividualTiersStripeCurrentTier({ }: IndividualTiersStripeCurrentTierProps) {
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
                Visit your customer portal
            </Text>
        </Button>
    );
  }
  