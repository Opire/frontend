'use client'

import { useState } from "react";
import { API_ROUTES } from "../../constants";
import { RewardFilters } from "./_components/Filters/Filters";
import { HomeRewardCard } from "./_components/HomeRewardCard";
import { InfinityList } from "../_components/InfinityList";
import { clientCustomFetch } from "../_utils/clientCustomFetch";
import { buildEndpointWithSearchAndPagination } from "./_utils/buildEndpointWithSearchAndPagination";
import { IssueListDTO } from "../_core/_dtos/IssueListDTO";
// import { faker } from "@faker-js/faker";

const PAGE_SIZE = 30;

export function HomeView({
    initialRewards,
    filters,
    search,
}: {
    initialRewards: IssueListDTO[],
    filters: RewardFilters,
    search: string | undefined,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [rewards, setRewards] = useState(initialRewards);
    const [page, setPage] = useState(1);

    async function loadMoreRewards() {
        setIsLoading(true);

        const next = page + 1;
        const newRewardsResponse = await clientCustomFetch(buildEndpointWithSearchAndPagination(API_ROUTES.REWARDS.ALL(), {
            itemsPerPage: PAGE_SIZE,
            page: next,
            filters,
            search,
        }))

        const newRewards = await newRewardsResponse.json() as IssueListDTO[];

        // setIsLoading(false); // Here?

        if (newRewards?.length) {
            setPage(next)
            setRewards((prev: IssueListDTO[] | undefined) => [
                ...(prev?.length ? prev : []),
                ...newRewards
            ])
        }

        setIsLoading(false); // Or here?
    }

    return (
        <InfinityList
            items={rewards}
            isLoading={isLoading}
            loadNextPage={loadMoreRewards}
            ItemComponent={HomeRewardCard}
            ItemSkeletonComponent={() => <div />} // TODO: with the new approach we don't need this
        />
    );
}

// const customRewards: IssueListDTO[] = faker.helpers.multiple(() => ({
//     claimerUsers: faker.helpers.multiple(() => ({
//         avatarURL: faker.internet.avatar(),
//         id: faker.string.uuid(),
//         username: faker.internet.userName(),
//     }), { count: { min: 0, max: 100 } }),
//     createdAt: faker.date.recent().getTime(),
//     id: faker.string.uuid(),
//     organization: {
//         id: faker.string.uuid(),
//         logoURL: faker.internet.avatar(),
//         url: faker.internet.url(),
//         name: faker.company.name()
//     },
//     pendingPrice: {
//         unit: 'USD',
//         value: faker.number.int({ min: 20, max: 10000 })
//     },
//     platform: faker.helpers.arrayElement(['GitHub', 'GitLab', 'BitBucket']),
//     programmingLanguages: faker.helpers.arrayElements(['Ruby', 'Python', 'C', 'TypeScript']),
//     title: faker.lorem.sentence(),
//     url: faker.internet.url()
// }), { count: { min: 0, max: 100 } })
