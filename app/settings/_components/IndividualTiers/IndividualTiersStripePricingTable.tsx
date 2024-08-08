import { StripePricingPage } from "../../../_components/StripePricingTable";

export interface IndividualTiersStripePricingPageProps {
    userId: string;
}

export function IndividualTiersStripePricingPage({ userId }: IndividualTiersStripePricingPageProps) {
    // TODO: use .env var
    const pricingTableId = "prctbl_1PlDKsAiqyUpICJDbA2t0SD6";
    const clientReference = `user_${userId}`

    return (
      <StripePricingPage pricingTableId={pricingTableId} clientReference={clientReference} />
    );
  }
  