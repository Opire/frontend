import { ChallengePrizePrimitive } from './ChallengePrizePrimitive';

export interface ChallengeConfigurationPrimitive {
  prizes: ChallengePrizePrimitive[];
  limitOfParticipations: number | null;
  allowMultipleParticipationsPerUser: boolean;
  deadline: number | null;
}
