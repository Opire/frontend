import { PlatformType } from "../_types/PlatformType";
import { INDIVIDUAL_TIER_NAMES, ORGANIZATION_TIER_NAMES } from "../_types/TierNames";
import { UserPlatformInfoDTO } from "./UserPlatformInfoDTO";


interface UserSettingOrganization {
    id: string;
    name: string;
    url: string;
    hasEmail: boolean;
    platform: PlatformType;
    logoURL: string;
    tierName: ORGANIZATION_TIER_NAMES;
}

interface UserSettingPayments {
    canReceivePayments: boolean;
    organizations: UserSettingOrganization[];
    email: string | null;
}

export interface UserSettingsDTO {
    id: string;
    isDefaulter: boolean;
    tierName: INDIVIDUAL_TIER_NAMES;
    github: UserPlatformInfoDTO | null;
    gitlab: UserPlatformInfoDTO | null;
    bitbucket: UserPlatformInfoDTO | null;
    payments: UserSettingPayments;
}
