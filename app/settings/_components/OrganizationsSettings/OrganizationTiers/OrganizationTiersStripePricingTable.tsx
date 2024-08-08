import { StripePricingPage } from "../../../../_components/StripePricingTable";

export interface OrganizationTiersStripePricingPageProps {
    organizationId: string;
}

export function OrganizationTiersStripePricingPage({ organizationId }: OrganizationTiersStripePricingPageProps) {
    // TODO: use .env var
    const pricingTableId = "prctbl_1Pla1dAiqyUpICJDKK2oOhCh";
    const clientReference = `organization_${organizationId}`

    return (
      <StripePricingPage pricingTableId={pricingTableId} clientReference={clientReference} />
    );
  }
  