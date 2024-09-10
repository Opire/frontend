import { ChallengePrimitive } from "../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../_core/_dtos/UserAuthDTO";
import React from "react";

interface PublishedChallengePublicDataDataProps {
    challenge: ChallengePrimitive;
    userAuth: UserAuthDTO | null;
}

export const PublishedChallengePublicDataData: FC<PublishedChallengePublicDataDataProps> = ({ challenge, userAuth }) => {
    return (
        <section style={{ height: 'auto' }}>
            (public view) Published challenge: "{challenge.title}"
        </section >
    );
};
