import { Metadata } from "next";
import { getRewards } from "../_utils/getRewards";
import { RewardFilters } from "./_components/Filters/Filters";
import { HomeView } from "./view";
import { ProgrammingLanguageType } from "../_core/_types/ProgrammingLanguageType";
import { RewardFilterUserTrying } from "./_components/Filters/UsersTryingFilter";

export const metadata: Metadata = {
    title: "Opire",
};

export default async function Page ({
    searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
    const minPrice = typeof searchParams.minPrice === "string" ? searchParams.minPrice : undefined;
    const maxPrice = typeof searchParams.maxPrice === "string" ? searchParams.maxPrice : undefined;
    const programmingLanguages = typeof searchParams.programmingLanguages === "string" ? searchParams.programmingLanguages.split(",") : undefined;
    const usersTrying = typeof searchParams.usersTrying === "string" ? searchParams.usersTrying : undefined;

    const filters: RewardFilters = {
        price: {
            min: minPrice ? +minPrice : 0,
            max: maxPrice ? +maxPrice : null,
        },
        programmingLanguages: (programmingLanguages ?? []) as ProgrammingLanguageType[],
        usersTrying: usersTrying as RewardFilterUserTrying ?? "BOTH",
    };

    const rewards = await getRewards({
        search,
        filters,
    });

    return (
        <HomeView
            initialRewards={rewards}
            filters={filters}
            search={search}
        />
    );
}
