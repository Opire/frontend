import { ChallengePrizePrimitive } from "./ChallengePrizePrimitive";

export type ChallengeParticipationStatusType = "waiting_for_approval" | "rejected" | "approved" | "paid";

export interface ChallengeParticipationPrimitive {
    id: string;
    userId: string;
    proposedSolution: string;
    status: ChallengeParticipationStatusType;
    position: number | null;
    prize: ChallengePrizePrimitive | null;
    reasonForRejection: string | null;
    createdAt: number;
    updatedAt: number;
}
