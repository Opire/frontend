'use client'

import { useState } from "react";
import { API_ROUTES } from "../../constants";
import { InfinityList } from "../_components/InfinityList";
import { clientCustomFetch } from "../_utils/clientCustomFetch";
import { buildEndpointWithSearchAndPagination } from "./_utils/buildEndpointWithSearchAndPagination";
import { useExternalStateOverride } from "../../hooks/useExternalStateOverride";
import { ChallengePrimitive } from "../_core/_primitives/ChallengePrimitive";
import { ChallengeCard } from "./_components/ChallengeCard";

const PAGE_SIZE = 30;

export function ChallengesView({
    initialChallenges,
    search,
}: {
    initialChallenges: ChallengePrimitive[],
    search: string | undefined,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [challenges, setChallenges] = useExternalStateOverride(initialChallenges);
    const [page, setPage] = useState(1);

    async function loadMoreChallenges() {
        setIsLoading(true);

        const next = page + 1;
        const nextChallengesResponse = await clientCustomFetch(buildEndpointWithSearchAndPagination(API_ROUTES.CHALLENGES.ALL(), {
            itemsPerPage: PAGE_SIZE,
            page: next,
            search,
        }))

        const nextChallenges = await nextChallengesResponse.json() as ChallengePrimitive[];

        if (nextChallenges?.length) {
            setPage(next)
            setChallenges((prev: ChallengePrimitive[] | undefined) => [
                ...(prev?.length ? prev : []),
                ...nextChallenges
            ])
        }

        setIsLoading(false);
    }

    return (
        <InfinityList
            items={challenges}
            keyIdentifier="id"
            isLoading={isLoading}
            loadNextPage={loadMoreChallenges}
            ItemComponent={ChallengeCard}
            ItemSkeletonComponent={() => <div />} // TODO: with the new approach we don't need this
        />
    );
}
