import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { Divider, Box, Space } from "@mantine/core";

import { NewChallengeSection } from "../../shared/NewChallengeSection";
import { PrizesSection } from "../../shared/PrizesSection";
import { ChallengeMainData } from "../../shared/ChallengeMainData";
import { useGetChallenge } from "../../../../../../hooks/useGetChallenge";
import { PublishedChallengePublicParticipationsData } from "./PublishedChallengePublicParticipationsData";

interface PublishedChallengePublicDataProps {
    challenge: ChallengeDTO;
    userAuth: UserAuthDTO | null;
}

export const PublishedChallengePublicData: FC<PublishedChallengePublicDataProps> = ({ challenge: initialChallenge, userAuth }) => {
    const { challenge } = useGetChallenge({
        initialChallenge,
        revalidateOnFocus: true,
    });

    return (
        <Box>
            <ChallengeMainData challenge={challenge} />

            <Divider my="xl" />
            <PrizesSection challenge={challenge} />

            <Space h='4rem' />
            <PublishedChallengePublicParticipationsData challenge={challenge} userAuth={userAuth} />

            <Space h='4rem' />
            <NewChallengeSection challenge={challenge} userAuth={userAuth} />

            <Space h='2rem' />
        </Box>
    );
};
