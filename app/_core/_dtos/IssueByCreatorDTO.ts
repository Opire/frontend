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

export interface IssueByCreatorDTO {
    // Clave compuesta
    issueId: string;
    creatorId: string;
    // Clave compuesta

    platform: PlatformType;
    platformId: string;
    title: string;
    url: string;
    organization: Organization;
    project: Project;
    usersTrying: UserTrying[];
    isClosed: boolean;
    isDeleted: boolean;
    isFullyPaid: boolean;
    alreadyPaid: PricePrimitive;
    pendingToBePaid: PricePrimitive;
    createdAt: number;
}
