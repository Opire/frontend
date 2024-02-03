import { TipStatusType } from "../_types/TipStatusType";
import { PricePrimitive } from "../_primitives/PricePrimitive";

interface User {
    id: string;
    username: string;
    avatarURL: string | null;
}

export interface TipByCreatorDTO {
    id: string,
    price: PricePrimitive,
    commentURL: string,
    creatorId: string,
    programmer: User,
    status: TipStatusType,
    createdAt: number,
}
