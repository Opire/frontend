import { PricePrimitive } from "./PricePrimitive";

export const CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE = 'WITHOUT_LIMIT';
export type CHALLENGE_PRIZE_WITHOUT_LIMIT = typeof CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE;

export interface SpecificPositionPrizePrimitive {
    position: number;
    amount: PricePrimitive | null;
    benefits: string[];
}

export interface ThresholdPrizePrimitive {
    fromPosition: number;
    toPosition: number;
    amount: PricePrimitive | null;
    benefits: string[];
}

export interface ThresholdWithoutLimitPrizePrimitive {
    fromPosition: number;
    toPosition: CHALLENGE_PRIZE_WITHOUT_LIMIT;
    amount: PricePrimitive | null;
    benefits: string[];
}

export type ChallengePrizePrimitive = SpecificPositionPrizePrimitive | ThresholdPrizePrimitive | ThresholdWithoutLimitPrizePrimitive;

export const EMPTY_CHALLENGE_PRIZE_AMOUNT: PricePrimitive = { unit: 'USD_CENT', value: 0 } 
