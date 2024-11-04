import { ChallengePrimitive } from '../_core/_primitives/ChallengePrimitive'
import { ChallengePrizePrimitive, EMPTY_CHALLENGE_PRIZE_AMOUNT } from '../_core/_primitives/ChallengePrizePrimitive'
import { PricePrimitive } from '../_core/_primitives/PricePrimitive'
import { getPriceInUSD_CENT } from './formatPrice'

export function getChallengeHighestPrize (challenge: ChallengePrimitive): PricePrimitive {
  if (!challenge.configuration.allowMultipleParticipationsPerUser) {
    const firstPrize = challenge.configuration.prizes[0] as ChallengePrizePrimitive | undefined

    if (!firstPrize) {
      return { unit: 'USD_CENT', value: 0 }
    }

    return firstPrize.amount ?? EMPTY_CHALLENGE_PRIZE_AMOUNT
  }

  const prizesSum: PricePrimitive = challenge.configuration.prizes.reduce((accumulator: PricePrimitive, currentPrize: ChallengePrizePrimitive): PricePrimitive => {
    return {
      value: accumulator.value + getPriceInUSD_CENT(currentPrize.amount ?? EMPTY_CHALLENGE_PRIZE_AMOUNT),
      unit: accumulator.unit
    }
  }, { unit: 'USD_CENT', value: 0 })

  return prizesSum
}
