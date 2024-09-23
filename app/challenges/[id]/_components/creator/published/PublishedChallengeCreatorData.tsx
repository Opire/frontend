import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";

interface PublishedChallengeCreatorDataProps {
    challenge: ChallengePrimitive;
    creator: UserAuthDTO;
}

export const PublishedChallengeCreatorData: FC<PublishedChallengeCreatorDataProps> = ({ challenge, creator }) => {
    return (
        <section style={{ height: 'auto' }}>
            (creator view) Published challenge: "{challenge.title}"
        </section >
    );
};
