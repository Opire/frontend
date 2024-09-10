import { CHALLENGE_PRIZE_WITHOUT_LIMIT, CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE, ChallengePrizePrimitive, SpecificPositionPrizePrimitive, ThresholdPrizePrimitive, ThresholdWithoutLimitPrizePrimitive } from "../_core/_primitives/ChallengePrizePrimitive";

export function sortPrizes(prizes: ChallengePrizePrimitive[]): ChallengePrizePrimitive[] {
    return [...prizes].sort((a, b) => {
        const minPositionA = getChallengePrizeMinPosition(a);
        const minPositionB = getChallengePrizeMinPosition(b);
        const maxPositionA = getChallengePrizeMaxPosition(a);
        const maxPositionB = getChallengePrizeMaxPosition(b);

        if (minPositionA !== minPositionB) {
            return minPositionA - minPositionB;
        }

        if (maxPositionA === CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE) {
            return 1;
        }

        if (maxPositionB === CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE) {
            return -1;
        }

        return maxPositionA - maxPositionB;
    });
}

export function getChallengePrizeMinPosition(primitive: ChallengePrizePrimitive): number {
    if (isPrimitiveSpecificPositionPrize(primitive)) {
        return primitive.position;
    }

    return primitive.fromPosition;
}

export function getChallengePrizeMaxPosition(primitive: ChallengePrizePrimitive): number | CHALLENGE_PRIZE_WITHOUT_LIMIT {
    if (isPrimitiveSpecificPositionPrize(primitive)) {
        return primitive.position;
    }

    return primitive.toPosition;
}

export function isPrimitiveSpecificPositionPrize(primitive: ChallengePrizePrimitive): primitive is SpecificPositionPrizePrimitive {
    return 'position' in primitive;
}

export function isPrimitiveThresholdPrize(primitive: ChallengePrizePrimitive): primitive is ThresholdPrizePrimitive {
    return 'fromPosition' in primitive && 'toPosition' in primitive && primitive.toPosition !== CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE;
}

export function isPrimitiveThresholdWithoutLimitPrize(primitive: ChallengePrizePrimitive): primitive is ThresholdWithoutLimitPrizePrimitive {
    return 'fromPosition' in primitive && primitive.toPosition === CHALLENGE_PRIZE_WITHOUT_LIMIT_VALUE;
}