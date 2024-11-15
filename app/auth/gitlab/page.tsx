import { Metadata } from "next";
import { AuthGitlabView } from "./view";

export const metadata: Metadata = {
    title: "Opire - GitLab",
};

export default function Page () {
    return (
        <AuthGitlabView />
    );
}
