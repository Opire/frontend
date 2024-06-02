import { PlatformType } from "../_types/PlatformType";
import { ProgrammingLanguageType } from "../_types/ProgrammingLanguageType";
import { OrganizationPrimitive } from "./OrganizationPrimitive";

export interface ProjectPrimitive {
    platform: PlatformType;
    platformId: string;

    id: string;
    name: string;
    description: string | null;
    programmingLanguages: ProgrammingLanguageType[];
    url: string;
    organization: OrganizationPrimitive;
    installationId: string | null;
    isInstalled: boolean;
    isArchived: boolean;
    isPublic: boolean;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
}
