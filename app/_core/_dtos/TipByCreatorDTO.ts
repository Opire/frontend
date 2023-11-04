import { TipStatusType } from "../_types/TipStatusType";
import { PriceDTO } from "./PriceDTO";

interface User {
    id: string;
    username: string;
    avatarURL: string | null;
}

export interface TipByCreatorDTO {
    id: string,
    price: PriceDTO,
    commentURL: string,
    creatorId: string,
    programmer: User,
    status: TipStatusType,
    createdAt: number,
}
