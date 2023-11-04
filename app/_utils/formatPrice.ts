import { PriceDTO } from "../_core/_dtos/PriceDTO";

export function formatPrice(price: PriceDTO): string {
    if (price.unit === "EUR_CENT") {
        return formatPriceFromCents(price.value);
    }
    return formatPriceFromEur(price.value);
}

function formatPriceFromEur(eurs: number): string {
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(eurs);
}

function formatPriceFromCents(cents: number): string {
    const eurs = cents / 100;
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 2,
    }).format(eurs);
}
