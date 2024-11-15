import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import React, { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import { Divider, Box, Space } from "@mantine/core";

import { NewChallengeSection } from "../../shared/NewChallengeSection";
import { PrizesSection } from "../../shared/PrizesSection";
import { ChallengeMainData } from "../../shared/ChallengeMainData";
import { useGetChallenge } from "../../../../../../hooks/useGetChallenge";
import { PublishedChallengePublicParticipationsData } from "../published/PublishedChallengePublicParticipationsData";
import { ChallengeLeaderboard } from "../../shared/ChallengeLeaderboard";

interface CompletedChallengePublicDataProps {
    challenge: ChallengeDTO;
    userAuth: UserAuthDTO | null;
}

export const CompletedChallengePublicData: FC<CompletedChallengePublicDataProps> = ({ challenge: initialChallenge, userAuth }) => {
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
            <ChallengeLeaderboard challenge={challenge} />

            <Space h='4rem' />
            <PublishedChallengePublicParticipationsData challenge={challenge} userAuth={userAuth} />

            <Space h='4rem' />
            <NewChallengeSection challenge={challenge} userAuth={userAuth} />

            <Space h='2rem' />
        </Box>
    );
};
