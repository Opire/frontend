import { PricePrimitive } from "../_core/_primitives/PricePrimitive";

export function formatPrice(price: PricePrimitive): string {
    if (price.unit === "USD_CENT") {
        return formatPriceFromCents(price.value);
    }
    return formatPriceFromUsd(price.value);
}

function formatPriceFromUsd(usd: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
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

export function getPriceInUSD(price: PricePrimitive): number {
    if (price.unit === "USD_CENT") {
        return price.value / 100;
    }

    return price.value
}


export function getPriceInUSD_CENT(price: PricePrimitive): number {
    if (price.unit === "USD") {
        return price.value * 100;
    }

    return price.value
}