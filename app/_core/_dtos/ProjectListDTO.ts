import { PlatformType } from "../_types/PlatformType";

interface UserPlatformInfo {
    platform: PlatformType;
    platformId: string;
    username: string;
    avatarURL: string | null;
}

interface User {
    id: string;
    email: string | null;
    userPlatformInfo: UserPlatformInfo[];
    isDefaulter: boolean;
    createdAt: number;
}

interface Organization {
    platform: PlatformType;
    platformId: string;
    id: string;
    name: string;
    email: string | null;
    members: User[];
    url: string;
    logoUrl: string;
    isSuspended: boolean;
    isDeleted: boolean;
    createdAt: number,
    updatedAt: number,
}

export interface ProjectListDTO {
    platform: PlatformType;
    platformId: string;
    id: string;
    name: string;
    description: string | null;
    url: string;
    organization: Organization;
    installationId: string;
    isInstalled: boolean;
    isArchived: boolean;
    isPublic: boolean;
    isDeleted: boolean;
    createdAt: number;
    updatedAt: number;
}
