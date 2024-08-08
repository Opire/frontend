import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export interface StripePricingPageProps {
    pricingTableId: string;
    clientReference: string
}

export function StripePricingPage({ pricingTableId, clientReference }: StripePricingPageProps) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_PUBLISHABLE_KEY;

    return (
        <stripe-pricing-table
            pricing-table-id={pricingTableId}
            client-reference-id={clientReference}
            publishable-key={publishableKey}
            >
        </stripe-pricing-table>
    );
  }
  