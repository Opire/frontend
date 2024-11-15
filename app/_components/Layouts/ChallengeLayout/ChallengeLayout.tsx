import { FC } from "react";
import { ChallengeLayoutClient } from "./ChallengeLayoutClient";
import { getUserAuth } from "../../../_utils/getUserAuth";

interface ChallengeLayoutProps { }

export const ChallengeLayout: FC<ChallengeLayoutProps> = (props) => {
    const userAuth = getUserAuth();

    return (
        <ChallengeLayoutClient {...props} userAuth={userAuth} />
    );
};
