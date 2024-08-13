import { StripePricingPage } from "../../../_components/StripePricingTable";

export interface IndividualTiersStripePricingPageProps {
    userId: string;
}

export function IndividualTiersStripePricingPage({ userId }: IndividualTiersStripePricingPageProps) {
    const pricingTableId = process.env.NEXT_PUBLIC_STRIPE_INDIVIDUAL_PRICING_TABLE_ID ?? 'prctbl_1PlDKsAiqyUpICJDbA2t0SD6';
    const clientReference = `user_${userId}`

    return (
      <StripePricingPage pricingTableId={pricingTableId} clientReference={clientReference} />
    );
  }
  