'use client'
import { INDIVIDUAL_TIER_NAMES } from "../../../_core/_types/TierNames";
import { IndividualTiersStripeCurrentTier } from "./IndividualTiersStripeCurrentTier";
import { IndividualTiersStripePricingPage } from "./IndividualTiersStripePricingTable";

export interface IndividualTiersSettingsProps {
    userId: string;
    currentTier: INDIVIDUAL_TIER_NAMES;
}

export function IndividualTiersSettings({ userId, currentTier }: IndividualTiersSettingsProps) {
    
    if(currentTier === INDIVIDUAL_TIER_NAMES.INDIVIDUAL_BASIC) {
           return (
            <IndividualTiersStripePricingPage userId={userId} />
        );
    }

    return (
        <IndividualTiersStripeCurrentTier currentTier={currentTier}/>
    );
  }
  