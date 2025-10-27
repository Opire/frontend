import { UserPlatformInfoDTO } from './UserPlatformInfoDTO';

export interface AuthInfoDTO {
  email: string;
  platformInfo: UserPlatformInfoDTO;
  accessToken: string;
  refreshToken: string | null;
}
