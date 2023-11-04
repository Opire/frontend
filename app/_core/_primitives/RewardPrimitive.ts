import { PriceDTO } from "../_dtos/PriceDTO";
import { RewardStatusType } from "../_types/RewardStatusType";

export interface RewardPrimitive {
    id: string;
    price: PriceDTO,
    commentURL: string;
    creatorId: string;
    rewardedUserId: string | null;
    status: RewardStatusType;
    createdAt: number;
    updatedAt: number;
}
