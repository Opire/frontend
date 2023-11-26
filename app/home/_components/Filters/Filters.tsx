"use client";

import React, { FC, useState } from "react";
import { usePopulateToURL } from "../../../../hooks/usePopulateToURL";
import { PriceFilter } from "./PriceFilter";
import { ProgrammingLanguagesFilter } from "./ProgrammingLanguagesFilter";
import { ProgrammingLanguageType } from "../../../_core/_types/ProgrammingLanguageType";
import { RewardFilterUserTrying, UsersTryingFilter } from "./UsersTryingFilter";

export interface RewardFilters {
    price: {
        min: number;
        max: number | null;
    };
    programmingLanguages: ProgrammingLanguageType[];
    usersTrying: RewardFilterUserTrying;
}

export const DEFAULT_REWARD_FILTERS: RewardFilters = {
    price: {
        min: 0,
        max: null,
    },
    programmingLanguages: [],
    usersTrying: 'BOTH',
};

const URL_KEYS = {
    PRICE: {
        MIN: "minPrice",
        MAX: "maxPrice",
    },
    PROGRAMMING_LANGUAGES: "programmingLanguages",
    USERS_TRYING: 'usersTrying',
};

export const Filters: FC<{}> = () => {
    const { populateParamToURL, populateMultipleParamToURL, searchParams } =
        usePopulateToURL();
    const [filters, setFilters] = useState<RewardFilters>(getFiltersFromURL);

    function getFiltersFromURL(): RewardFilters {
        const minPrice = searchParams.get(URL_KEYS.PRICE.MIN)
            ? +searchParams.get(URL_KEYS.PRICE.MIN)!
            : DEFAULT_REWARD_FILTERS.price.min;
        const maxPrice = searchParams.get(URL_KEYS.PRICE.MAX)
            ? +searchParams.get(URL_KEYS.PRICE.MAX)!
            : DEFAULT_REWARD_FILTERS.price.max;
        const programmingLanguages = searchParams.get(
            URL_KEYS.PROGRAMMING_LANGUAGES
        )
            ? (searchParams
                .get(URL_KEYS.PROGRAMMING_LANGUAGES)!
                .split(",") as ProgrammingLanguageType[])
            : DEFAULT_REWARD_FILTERS.programmingLanguages;

        const usersTrying = searchParams.get(
            URL_KEYS.USERS_TRYING
        )
            ? (searchParams
                .get(URL_KEYS.USERS_TRYING)! as RewardFilterUserTrying)
            : DEFAULT_REWARD_FILTERS.usersTrying;

        return {
            price: {
                min: minPrice,
                max: maxPrice,
            },
            programmingLanguages,
            usersTrying
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

    const updateUsersTryingFilter = (
        usersTrying: RewardFilterUserTrying
    ) => {
        setFilters((oldFilters) => ({
            ...oldFilters,
            usersTrying,
        }));

        populateParamToURL(
            URL_KEYS.USERS_TRYING,
            usersTrying === 'BOTH' ? '' : usersTrying,
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

            <UsersTryingFilter
                value={filters.usersTrying}
                onApply={updateUsersTryingFilter}
            />
        </div>
    );
};
