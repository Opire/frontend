import { PlatformType } from "../_types/PlatformType";

export interface UserPlatformInfoDTO {
    platform: PlatformType;
    platformId: string;
    username: string;
    avatarURL: string | null;
}
