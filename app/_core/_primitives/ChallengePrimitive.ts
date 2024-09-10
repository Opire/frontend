import { ChallengeConfigurationPrimitive } from "./ChallengeConfigurationPrimitive";
import { ChallengeParticipationPrimitive } from "./ChallengeParticipationPrimitive";

export interface ChallengePrimitive {
    id: string;
    creatorId: string;
    title: string;
    configuration: ChallengeConfigurationPrimitive;
    participations: ChallengeParticipationPrimitive[];
    isPublished: boolean;
    isAcceptingParticipations: boolean;
    isCompleted: boolean;
    createdAt: number;
    updatedAt: number;
}

type ChallengePrimitivePropsToOmit = 'id' | 'creatorId' | 'participations' | 'isPublished' | 'isAcceptingParticipations' | 'isCompleted' | 'createdAt' | 'updatedAt';

export interface CreateChallengeDTO extends Omit<ChallengePrimitive, ChallengePrimitivePropsToOmit> {}
export interface EditDraftChallengeDTO extends Omit<ChallengePrimitive, ChallengePrimitivePropsToOmit> {}
