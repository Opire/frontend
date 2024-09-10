import { ChallengePrimitive } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { useGetCreateChallengeTemplates } from "../../../../../../hooks/useGetCreateChallengeTemplates";

interface DraftChallengeCreatorDataProps {
    challenge: ChallengePrimitive;
    creator: UserAuthDTO;
}

export const DraftChallengeCreatorData: FC<DraftChallengeCreatorDataProps> = ({ challenge, creator }) => {
    const { templates, isLoadingTemplates } = useGetCreateChallengeTemplates();

    return (
        <section style={{ height: 'auto' }}>
            (creator view) Draft challenge: "{challenge.title}" (Id: "{challenge.id}") 
        </section >
    );
};
