"use client";

import React, { FC, useState } from "react";
import { usePopulateToURL } from "../../../../hooks/usePopulateToURL";
import { PriceFilter } from "./PriceFilter";
import { ProgrammingLanguagesFilter } from "./ProgrammingLanguagesFilter";
import { ProgrammingLanguageType } from "../../../_core/_types/ProgrammingLanguageType";

export interface RewardFilters {
    price: {
        min: number;
        max: number | null;
    };
    programmingLanguages: ProgrammingLanguageType[];
}

export const DEFAULT_REWARD_FILTERS: RewardFilters = {
    price: {
        min: 0,
        max: null,
    },
    programmingLanguages: [],
};

const URL_KEYS = {
    PRICE: {
        MIN: "minPrice",
        MAX: "maxPrice",
    },
    PROGRAMMING_LANGUAGES: "programmingLanguages",
};

export const Filters: FC<{}> = () => {
    const { populateParamToURL, populateMultipleParamToURL, searchParams } =
        usePopulateToURL();
    const [filters, setFilters] = useState<RewardFilters>(getFiltersFromURL);

    function getFiltersFromURL(): RewardFilters {
        const minPrice = searchParams.get(URL_KEYS.PRICE.MIN)
            ? +searchParams.get(URL_KEYS.PRICE.MIN)!
            : 0;
        const maxPrice = searchParams.get(URL_KEYS.PRICE.MAX)
            ? +searchParams.get(URL_KEYS.PRICE.MAX)!
            : null;
        const programmingLanguages = searchParams.get(
            URL_KEYS.PROGRAMMING_LANGUAGES
        )
            ? (searchParams
                .get(URL_KEYS.PROGRAMMING_LANGUAGES)!
                .split(",") as ProgrammingLanguageType[])
            : [];

        return {
            price: {
                min: minPrice,
                max: maxPrice,
            },
            programmingLanguages,
        };
    }

    const updatePriceFilter = (min: number, max: number | null) => {
        setFilters((oldFilters) => ({
            ...oldFilters,
            price: { min, max },
        }));

        populateMultipleParamToURL([
            { key: URL_KEYS.PRICE.MIN, value: min === 0 ? "" : min.toString() },
            { key: URL_KEYS.PRICE.MAX, value: max?.toString() ?? "" },
        ]);
    };

    const updateProgrammingLanguageFilter = (
        programmingLanguages: ProgrammingLanguageType[]
    ) => {
        setFilters((oldFilters) => ({
            ...oldFilters,
            programmingLanguages,
        }));

        populateParamToURL(
            URL_KEYS.PROGRAMMING_LANGUAGES,
            programmingLanguages.join(",")
        );
    };

    return (
        <div
            className="filters"
            style={{
                display: "flex",
                gap: "1rem",
                padding: "20px",
                backgroundColor: "var(--mantine-color-body)",
                overflow: "auto",
            }}
        >
            <PriceFilter
                value={[filters.price.min, filters.price.max]}
                onApply={updatePriceFilter}
            />
            <ProgrammingLanguagesFilter
                value={filters.programmingLanguages}
                onApply={updateProgrammingLanguageFilter}
            />
        </div>
    );
};
