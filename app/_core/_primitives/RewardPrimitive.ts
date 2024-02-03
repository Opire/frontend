import { PricePrimitive } from "./PricePrimitive";
import { RewardStatusType } from "../_types/RewardStatusType";

export interface RewardPrimitive {
    id: string;
    price: PricePrimitive,
    commentURL: string;
    creatorId: string;
    rewardedUserId: string | null;
    status: RewardStatusType;
    createdAt: number;
    updatedAt: number;
}
