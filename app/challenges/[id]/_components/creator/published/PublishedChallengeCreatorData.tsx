import { ChallengeDTO } from "../../../../../_core/_primitives/ChallengePrimitive";
import { FC } from "react";
import { UserAuthDTO } from "../../../../../_core/_dtos/UserAuthDTO";
import React from "react";
import { Divider, Box, Space } from "@mantine/core";
import { ChallengeMainData } from "../../shared/ChallengeMainData";
import { NewChallengeSection } from "../../shared/NewChallengeSection";
import { PrizesSection } from "../../shared/PrizesSection";
import { useGetChallenge } from "../../../../../../hooks/useGetChallenge";
import { CompleteChallengeForm } from "./CompleteChallengeForm";
import { ParticipationsSection } from "./ParticipationsSection";

interface PublishedChallengeCreatorDataProps {
    challenge: ChallengeDTO;
    creator: UserAuthDTO;
}

export const PublishedChallengeCreatorData: FC<PublishedChallengeCreatorDataProps> = ({
    challenge: initialChallenge,
    creator }) => {
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
            <ParticipationsSection challenge={challenge} />

            <Space h='2rem' />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <CompleteChallengeForm challenge={challenge} />
            </div>

            <Space h='4rem' />
            <NewChallengeSection challenge={challenge} userAuth={creator} />

            <Space h='2rem' />
        </Box>
    );
};

