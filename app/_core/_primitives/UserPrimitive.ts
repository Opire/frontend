import { UserPlatformInfoDTO } from '../_dtos/UserPlatformInfoDTO';

export interface UserPrimitive {
  id: string;
  email: string | null;
  userPlatformInfo: UserPlatformInfoDTO[];
  isDefaulter: boolean;
  createdAt: number;
}
