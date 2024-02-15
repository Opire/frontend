import { PlatformType } from "../_types/PlatformType";
import { UserPlatformInfoDTO } from "./UserPlatformInfoDTO";

interface UserSettingOrganization {
    id: string;
    name: string;
    url: string;
    hasEmail: boolean;
    platform: PlatformType;
    logoURL: string;
    canReceivePayments: boolean;
}

export interface UserSettingsDTO {
    id: string;
    isDefaulter: boolean;
    github: UserPlatformInfoDTO | null;
    gitlab: UserPlatformInfoDTO | null;
    bitbucket: UserPlatformInfoDTO | null;
    payments: {
        canReceivePayments: boolean;
        organizations: UserSettingOrganization[];
    };
}
