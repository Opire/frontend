"use client";

import { useState } from "react";
import { API_ROUTES } from "../../constants";
import { InfinityList } from "../_components/InfinityList";
import { clientCustomFetch } from "../_utils/clientCustomFetch";
import { buildEndpointWithSearchAndPagination } from "./_utils/buildEndpointWithSearchAndPagination";
import { ProjectListDTO } from "../_core/_dtos/ProjectListDTO";
import { useExternalStateOverride } from "../../hooks/useExternalStateOverride";
import { ProjectCard } from "./_components/ProjectCard";
// import { faker } from "@faker-js/faker";

const PAGE_SIZE = 30;

export function ProjectView ({
    initialProjects,
    search,
}: {
    initialProjects: ProjectListDTO[],
    search: string | undefined,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useExternalStateOverride(initialProjects);
    const [page, setPage] = useState(1);

    async function loadMoreProject () {
        setIsLoading(true);

        const next = page + 1;
        const newProjectsResponse = await clientCustomFetch(buildEndpointWithSearchAndPagination(API_ROUTES.PROJECTS.ALL(), {
            itemsPerPage: PAGE_SIZE,
            page: next,
            search,
        }));

        const newProjects = await newProjectsResponse.json() as ProjectListDTO[];

        // setIsLoading(false); // Here?

        if (newProjects?.length) {
            setPage(next);
            setProjects((prev: ProjectListDTO[] | undefined) => [
                ...(prev?.length ? prev : []),
                ...newProjects,
            ]);
        }

        setIsLoading(false); // Or here?
    }

    return (
        <InfinityList
            items={projects}
            isLoading={isLoading}
            keyIdentifier="id"
            loadNextPage={loadMoreProject}
            ItemComponent={ProjectCard}
            ItemSkeletonComponent={() => <div />} // TODO: with the new approach we don't need this
        />
    );
}
