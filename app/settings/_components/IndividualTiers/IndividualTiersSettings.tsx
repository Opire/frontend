'use client';
import { INDIVIDUAL_TIER_NAMES } from '../../../_core/_types/TierNames';
import { IndividualTiersStripeCurrentTier } from './IndividualTiersStripeCurrentTier';
import { IndividualTiersStripePricingPage } from './IndividualTiersStripePricingTable';

export interface IndividualTiersSettingsProps {
  userId: string;
  paymentsEmail: string | null;
  currentTier: INDIVIDUAL_TIER_NAMES;
}

export function IndividualTiersSettings({
  userId,
  paymentsEmail,
  currentTier,
}: IndividualTiersSettingsProps) {
  if (currentTier === INDIVIDUAL_TIER_NAMES.INDIVIDUAL_BASIC) {
    return <IndividualTiersStripePricingPage userId={userId} />;
  }

  return (
    <IndividualTiersStripeCurrentTier currentTier={currentTier} paymentsEmail={paymentsEmail} />
  );
}
