import { Button, Text } from '@mantine/core';
import { INDIVIDUAL_TIER_NAMES } from '../../../_core/_types/TierNames';
import { IconUser } from '@tabler/icons-react';

export interface IndividualTiersStripeCurrentTierProps {
  currentTier: INDIVIDUAL_TIER_NAMES;
  paymentsEmail: string | null;
}

export function IndividualTiersStripeCurrentTier({
  paymentsEmail,
}: IndividualTiersStripeCurrentTierProps) {
  const stripeCustomerPortalURL = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL;

  return (
    <Button
      radius="2rem"
      size="lg"
      variant="light"
      component="a"
      target="_blank"
      mt={'1rem'}
      href={
        paymentsEmail
          ? `${stripeCustomerPortalURL}?prefilled_email=${paymentsEmail}`
          : stripeCustomerPortalURL
      }
    >
      <IconUser style={{ marginRight: '8px' }} />
      <Text style={{ fontSize: '1.2rem' }}>Manage subscription</Text>
    </Button>
  );
}
