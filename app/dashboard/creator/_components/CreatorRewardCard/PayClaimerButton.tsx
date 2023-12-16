'use client'

import { FC } from "react";
import { Button } from "@mantine/core";
import { API_ROUTES } from "../../../../../constants";
import { clientCustomFetch } from "../../../../_utils/clientCustomFetch";
import { formatPrice } from "../../../../_utils/formatPrice";

interface PayButtonProps {
    claimerId: string;
    issueId: string;
    priceToPay?: number;
}

export const PayClaimerButton: FC<PayButtonProps> = ({
    claimerId,
    issueId,
    priceToPay,
}) => {
    return (
        <Button
            size={'md'}
            variant='gradient'
            onClick={() => handleClickPayClaimer(claimerId, issueId)}
        >
            {priceToPay ? `Pay: ${formatPrice({ unit: 'USD_CENT', value: priceToPay })}` : 'Pay'}
        </Button>

    );
};

export async function handleClickPayClaimer(claimerId: string, issueId: string): Promise<void> {
    const response = await clientCustomFetch(
        API_ROUTES.PAYMENTS.LINK_TO_PAY_REWARDS_FOR_ISSUE(issueId),
        { method: 'POST', body: { claimerId } }
    );
    const responseData = await response.json();

    if (responseData) {
        window.open(responseData.url, '_blank');
    }
}