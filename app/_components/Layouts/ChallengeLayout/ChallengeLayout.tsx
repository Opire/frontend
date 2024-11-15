import { FC } from "react";
import { ChallengeLayoutClient } from "./ChallengeLayoutClient";
import { getUserAuth } from "../../../_utils/getUserAuth";

export const ChallengeLayout: FC = (props) => {
    const userAuth = getUserAuth();

    return (
        <ChallengeLayoutClient {...props} userAuth={userAuth} />
    );
};
