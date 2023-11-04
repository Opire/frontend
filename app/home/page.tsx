import { Metadata } from "next";
import { getRewards } from "../_utils/getRewards";
import { RewardFilters } from "./_components/Filters/Filters";
import { HomeView } from "./view";
import { ProgrammingLanguageType } from "../_core/_types/ProgrammingLanguageType";
import crypto from "crypto";

export const metadata: Metadata = {
    title: 'Make my Change',
}

export default async function Page({
    searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const minPrice = typeof searchParams.minPrice === 'string' ? searchParams.minPrice : undefined;
    const maxPrice = typeof searchParams.maxPrice === 'string' ? searchParams.maxPrice : undefined;
    const programmingLanguages = typeof searchParams.programmingLanguages === 'string' ? searchParams.programmingLanguages.split(',') : undefined;


    const filters: RewardFilters = {
        price: {
            min: minPrice ? +minPrice : 0,
            max: maxPrice ? +maxPrice : null,
        },
        programmingLanguages: (programmingLanguages ?? []) as ProgrammingLanguageType[],
    }

    const rewards = await getRewards({
        search,
        filters,
    });

    return (
        <HomeView
            key={crypto.randomUUID()}
            initialRewards={rewards}
            filters={filters}
            search={search}
        />
    );
}
