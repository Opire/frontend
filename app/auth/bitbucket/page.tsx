import { Metadata } from "next";
import { AuthBitbucketView } from "./view";

export const metadata: Metadata = {
    title: 'Make my Change - Bitbucket',
}

export default function Page() {
    return (
        <AuthBitbucketView />
    );
}
