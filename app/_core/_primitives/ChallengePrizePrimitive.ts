import { PricePrimitive } from "./PricePrimitive";

export const CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE = 'WITHOUT_LIMIT';
export type CHALLENGE_PRIZE_WITHOUT_LIMIT = typeof CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE;

export interface SpecificPositionPrizePrimitive {
    position: number;
    amount: PricePrimitive;
}

export interface ThresholdPrizePrimitive {
    fromPosition: number;
    toPosition: number;
    amount: PricePrimitive;
}

export interface ThresholdWithoutLimitPrizePrimitive {
    fromPosition: number;
    toPosition: CHALLENGE_PRIZE_WITHOUT_LIMIT;
    amount: PricePrimitive;
}

export type ChallengePrizePrimitive = SpecificPositionPrizePrimitive | ThresholdPrizePrimitive | ThresholdWithoutLimitPrizePrimitive;
