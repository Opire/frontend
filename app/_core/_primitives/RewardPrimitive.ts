import { PricePrimitive } from "../_primitives/PricePrimitive";

export type RewardStatusType =
    | 'Available'
    | 'Paid'


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
