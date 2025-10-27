import { UserPrimitive } from '../_primitives/UserPrimitive';
import { PlatformType } from '../_types/PlatformType';

export interface OrganizationPrimitive {
  platform: PlatformType;
  platformId: string;

  id: string;
  name: string;
  email: string | null;
  members: UserPrimitive[];
  url: string;
  logoUrl: string;
  isSuspended: boolean;
  isDeleted: boolean;
  createdAt: number;
  updatedAt: number;
}
