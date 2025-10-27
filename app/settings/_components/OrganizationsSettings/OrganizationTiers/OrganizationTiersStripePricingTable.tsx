import { StripePricingPage } from '../../../../_components/StripePricingTable';

export interface OrganizationTiersStripePricingPageProps {
  organizationId: string;
}

export function OrganizationTiersStripePricingPage({
  organizationId,
}: OrganizationTiersStripePricingPageProps) {
  const pricingTableId =
    process.env.NEXT_PUBLIC_STRIPE_ORGANIZATION_PRICING_TABLE_ID ??
    'prctbl_1Pla1dAiqyUpICJDKK2oOhCh';
  const clientReference = `organization_${organizationId}`;

  return <StripePricingPage pricingTableId={pricingTableId} clientReference={clientReference} />;
}
