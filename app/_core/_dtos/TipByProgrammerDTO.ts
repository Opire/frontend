import { TipStatusType } from "../_types/TipStatusType";
import { PriceDTO } from "./PriceDTO";

interface User {
    id: string;
    username: string;
    avatarURL: string | null;
}

export interface TipByProgrammerDTO {
    id: string,
    price: PriceDTO,
    commentURL: string,
    creator: User,
    programmer: User,
    status: TipStatusType,
    createdAt: number,
}
