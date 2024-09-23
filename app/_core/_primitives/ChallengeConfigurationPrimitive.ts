import { ChallengePrizePrimitive } from "./ChallengePrizePrimitive";
import { PricePrimitive } from "./PricePrimitive";

export interface ChallengeConfigurationPrimitive {
    prizes: ChallengePrizePrimitive[];
    limitOfParticipations: number | null;
    allowMultipleParticipationsPerUser: boolean;
    deadline: number | null;
    budget: PricePrimitive | null;
}
