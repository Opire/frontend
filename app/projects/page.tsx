import { Metadata } from "next";
import { getProjects } from "../_utils/getProjects";
import { ProjectView } from "./view";

export const metadata: Metadata = {
    title: 'Opire - Projects',
}

export default async function Page({
    searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

    const projects = await getProjects({
        search,
    });

    return (
        <ProjectView
            initialProjects={projects}
            search={search}
        />
    );
}
