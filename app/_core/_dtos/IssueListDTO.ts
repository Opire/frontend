import { PlatformType } from "../_types/PlatformType";
import { ProgrammingLanguageType } from "../_types/ProgrammingLanguageType";
import { PriceDTO } from "./PriceDTO";

interface ClaimerUser {
    id: string;
    username: string;
    avatarURL: string | null;
}

interface Organization {
    id: string;
    name: string;
    logoURL: string;
    url: string;
}

export interface IssueListDTO {
    id: string;
    title: string;
    url: string;
    platform: PlatformType;
    organization: Organization;
    programmingLanguages: ProgrammingLanguageType[];
    pendingPrice: PriceDTO;
    claimerUsers: ClaimerUser[];
    createdAt: number;
}
