import { PlatformType } from "../_types/PlatformType";
import { ProgrammingLanguageType } from "../_types/ProgrammingLanguageType";
import { PriceDTO } from "./PriceDTO";

interface IssueListUser {
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

interface Project {
    id: string;
    url: string;
    name: string;
    isPublic: boolean;
}

export interface IssueListDTO {
    id: string;
    title: string;
    url: string;
    platform: PlatformType;
    organization: Organization;
    project: Project;
    programmingLanguages: ProgrammingLanguageType[];
    pendingPrice: PriceDTO;
    claimerUsers: IssueListUser[];
    tryingUsers: IssueListUser[];
    createdAt: number;
}
