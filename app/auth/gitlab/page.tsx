import { Metadata } from "next";
import { AuthGitlabView } from "./view";

export const metadata: Metadata = {
    title: 'Make my Change - GitLab',
}

export default function Page() {
    return (
        <AuthGitlabView />
    );
}
