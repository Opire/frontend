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
    // TODO: use .env var
    const publishableKey = "pk_test_51PLoVWAiqyUpICJD6r0n2rDAUo4imcRJ29enjeM0BoSTjP7Pqez8loy3KuGAmVK2k6X0K5vCKPqidw1ghAk7x2FD003mZANGdZ";

    return (
        <stripe-pricing-table
            pricing-table-id={pricingTableId}
            client-reference-id={clientReference}
            publishable-key={publishableKey}
            >
        </stripe-pricing-table>
    );
  }
  