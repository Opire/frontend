import { Metadata } from "next";
import { AuthGithubView } from "./view";

export const metadata: Metadata = {
    title: 'Make my Change',
}

export default function Page() {
    return (
        <AuthGithubView />
    );
}
