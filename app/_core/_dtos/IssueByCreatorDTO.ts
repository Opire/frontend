import { PlatformType } from "../_types/PlatformType";
import { ProgrammingLanguageType } from "../_types/ProgrammingLanguageType";
import { RewardStatusType } from "../_types/RewardStatusType";
import { PriceDTO } from "./PriceDTO";

interface User {
    id: string;
    username: string;
    avatarURL: string | null;
}

interface UserTrying extends User {
    hasClaimed: boolean;
}

interface Reward {
    id: string;
    status: RewardStatusType;
    price: PriceDTO;
    commentURL: string;
    rewardedUserId: string | null;
    creator: User;
    createdAt: number;
}

export interface IssueByCreatorDTO {
    id: string;
    title: string;
    url: string;
    labels: string[];
    platform: PlatformType;
    platformId: string;
    programmingLanguages: ProgrammingLanguageType[];
    organizationLogoURL: string;
    organizationName: string;
    usersTrying: UserTrying[];
    rewards: Reward[];
    isClosed: boolean;
    isDeleted: boolean;
    createdAt: number;
}
