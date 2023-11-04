import { UserPlatformInfoDTO } from "./UserPlatformInfoDTO";

export interface UserSettingsDTO {
    id: string;
    isDefaulter: boolean;
    github: UserPlatformInfoDTO | null;
    gitlab: UserPlatformInfoDTO | null;
    bitbucket: UserPlatformInfoDTO | null;
    payments: {
        canReceivePayments: boolean;
    }
}
