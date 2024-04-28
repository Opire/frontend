import { PlatformType } from "../_types/PlatformType";
import { ProgrammingLanguageType } from "../_types/ProgrammingLanguageType";
import { PricePrimitive } from "../_primitives/PricePrimitive";

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
    isBotInstalled: boolean;
}

export interface IssueListDTO {
    id: string;
    title: string;
    url: string;
    platform: PlatformType;
    organization: Organization;
    project: Project;
    programmingLanguages: ProgrammingLanguageType[];
    pendingPrice: PricePrimitive;
    claimerUsers: IssueListUser[];
    tryingUsers: IssueListUser[];
    createdAt: number;
}
