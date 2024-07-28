import { PlatformType } from "../_types/PlatformType";
import { UserPlatformInfoDTO } from "./UserPlatformInfoDTO";


interface UserSettingOrganization {
    id: string;
    name: string;
    url: string;
    hasEmail: boolean;
    platform: PlatformType;
    logoURL: string;
}

interface UserSettingPayments {
    canReceivePayments: boolean;
    organizations: UserSettingOrganization[];
    email: string | null;
}

export interface UserSettingsDTO {
    id: string;
    isDefaulter: boolean;
    github: UserPlatformInfoDTO | null;
    gitlab: UserPlatformInfoDTO | null;
    bitbucket: UserPlatformInfoDTO | null;
    payments: UserSettingPayments;
}
