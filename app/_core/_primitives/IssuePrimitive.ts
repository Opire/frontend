import { PlatformType } from '../_types/PlatformType';
import { ProjectPrimitive } from './ProjectPrimitive';
import { RewardPrimitive } from './RewardPrimitive';

export interface IssuePrimitive {
  platform: PlatformType;
  platformId: string;

  id: string;
  issueURL: string;
  project: ProjectPrimitive;
  title: string;
  labels: string[];
  rewards: RewardPrimitive[];
  usersTrying: string[];
  usersClaiming: string[];
  isDeleted: boolean;
  isClosed: boolean;
  createdAt: number;
  updatedAt: number;
}
