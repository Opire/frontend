import { PlatformType } from "../_types/PlatformType";
import { UserPlatformInfoDTO } from "./UserPlatformInfoDTO";

interface UserSettingOrganizationPayments {
    canReceivePayments: boolean;
    email: string | null;
}

interface UserSettingOrganization {
    id: string;
    name: string;
    url: string;
    hasEmail: boolean;
    platform: PlatformType;
    logoURL: string;
    payments: UserSettingOrganizationPayments;
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
