import { TipStatusType } from "../_types/TipStatusType";
import { PricePrimitive } from "../_primitives/PricePrimitive";

interface User {
    id: string;
    username: string;
    avatarURL: string | null;
}

export interface TipByProgrammerDTO {
    id: string,
    price: PricePrimitive,
    commentURL: string,
    creator: User,
    programmer: User,
    status: TipStatusType,
    createdAt: number,
}
