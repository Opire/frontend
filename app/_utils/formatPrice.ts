import { PriceDTO } from "../_core/_dtos/PriceDTO";

export function formatPrice(price: PriceDTO): string {
    if (price.unit === "USD_CENT") {
        return formatPriceFromCents(price.value);
    }
    return formatPriceFromUsd(price.value);
}

function formatPriceFromUsd(usd: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(usd);
}

function formatPriceFromCents(cents: number): string {
    const usd = cents / 100;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(usd);
}
