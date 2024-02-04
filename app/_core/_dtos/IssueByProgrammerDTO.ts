import { PlatformType } from "../_types/PlatformType";
import { ProgrammingLanguageType } from "../_types/ProgrammingLanguageType";
import { PricePrimitive } from "../_primitives/PricePrimitive";


interface IssueDashboardUser {
    id: string;
    username: string;
    avatarURL: string | null;
}

interface UserTrying extends IssueDashboardUser {
    hasClaimed: boolean;
    alreadyPaid: PricePrimitive;
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
    programmingLanguages: ProgrammingLanguageType[];
}

export interface IssueByProgrammerDTO {
    issueId: string;
    programmerId: string;

    platform: PlatformType;
    platformId: string;
    title: string;
    url: string;
    organization: Organization;
    project: Project;
    otherUsersTrying: UserTrying[];
    programmer: UserTrying;
    isClosed: boolean;
    isDeleted: boolean;
    isFullyPaid: boolean;
    pendingToBePaid: PricePrimitive;
    createdAt: number;
}