import { Metadata } from "next";
import { AuthBitbucketView } from "./view";

export const metadata: Metadata = {
    title: "Opire - Bitbucket",
};

export default function Page () {
    return (
        <AuthBitbucketView />
    );
}
