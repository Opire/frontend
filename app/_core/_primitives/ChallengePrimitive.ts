import { ChallengeConfigurationPrimitive } from "./ChallengeConfigurationPrimitive";
import { ChallengeParticipationPrimitive } from "./ChallengeParticipationPrimitive";

export interface ChallengePrimitive {
    id: string;
    creatorId: string;
    title: string;
    summary: string | null;
    mainObjetive: string | null;
    otherObjetives: string | null;
    requirements: string | null;
    evaluationCriteria: string | null;
    contactInformation: string | null;
    additionalComments: string | null;
    configuration: ChallengeConfigurationPrimitive;
    participations: ChallengeParticipationPrimitive[];
    isPublished: boolean;
    isAcceptingParticipations: boolean;
    isCompleted: boolean;
    createdAt: number;
    updatedAt: number;
}

type ChallengePrimitivePropsToOmitForCreateChallengeDTO = "id" | "creatorId" | "participations" | "isPublished" | "isAcceptingParticipations" | "isCompleted" | "createdAt" | "updatedAt";
export interface CreateChallengeDTO extends Omit<ChallengePrimitive, ChallengePrimitivePropsToOmitForCreateChallengeDTO> {}

type ChallengePrimitivePropsToOmitForEditDraftChallengeDTO = ChallengePrimitivePropsToOmitForCreateChallengeDTO;
export interface EditDraftChallengeDTO extends Omit<ChallengePrimitive, ChallengePrimitivePropsToOmitForEditDraftChallengeDTO> {}

type ChallengePrimitivePropsToOmitForEditPublishedChallengeDTO = ChallengePrimitivePropsToOmitForCreateChallengeDTO | "title" | "summary" | "mainObjetive" | "otherObjetives" | "requirements" | "evaluationCriteria" | "contactInformation" | "additionalComments";
export interface EditPublishedChallengeDTO extends Omit<ChallengePrimitive, ChallengePrimitivePropsToOmitForEditPublishedChallengeDTO> {}

export interface ChallengeDTO extends ChallengePrimitive {
    canBePublished: boolean;
    canPrizesBePaid: boolean;
}
