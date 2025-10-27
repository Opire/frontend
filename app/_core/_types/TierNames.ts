export enum INDIVIDUAL_TIER_NAMES {
  INDIVIDUAL_BASIC = 'individual_basic',
  INDIVIDUAL_STARTER = 'individual_starter',
  INDIVIDUAL_PRO = 'individual_pro',
}

export enum ORGANIZATION_TIER_NAMES {
  ORGANIZATION_BASIC = 'organization_basic',
  ORGANIZATION_STARTER = 'organization_starter',
  ORGANIZATION_PRO = 'organization_pro',
  ORGANIZATION_ENTERPRISE = 'organization_enterprise',
}

export const TIER_NAMES = {
  ...INDIVIDUAL_TIER_NAMES,
  ...ORGANIZATION_TIER_NAMES,
} as const;

export type TIER_NAMES = (typeof TIER_NAMES)[keyof typeof TIER_NAMES];
