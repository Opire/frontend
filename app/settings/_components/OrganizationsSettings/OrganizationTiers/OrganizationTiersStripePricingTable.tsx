import { StripePricingPage } from "../../../../_components/StripePricingTable";

export interface OrganizationTiersStripePricingPageProps {
    organizationId: string;
}

export function OrganizationTiersStripePricingPage({ organizationId }: OrganizationTiersStripePricingPageProps) {
    // TODO: use .env var
    const pricingTableId = "prctbl_1PlDKsAiqyUpICJDbA2t0SD6";
    // const pricingTableId = "";
    const clientReference = `organization_${organizationId}`

    return (
      <StripePricingPage pricingTableId={pricingTableId} clientReference={clientReference} />
    );
  }
  