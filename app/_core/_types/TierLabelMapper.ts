import { TIER_NAMES } from './TierNames';

export const TierLabelMapper: Record<TIER_NAMES, string> = {
  [TIER_NAMES.INDIVIDUAL_BASIC]: 'Individual Basic',
  [TIER_NAMES.INDIVIDUAL_STARTER]: 'Individual Starter',
  [TIER_NAMES.INDIVIDUAL_PRO]: 'Individual Pro',
  [TIER_NAMES.ORGANIZATION_BASIC]: 'Organization Basic',
  [TIER_NAMES.ORGANIZATION_STARTER]: 'Organization Starter',
  [TIER_NAMES.ORGANIZATION_PRO]: 'Organization Pro',
  [TIER_NAMES.ORGANIZATION_ENTERPRISE]: 'Organization Enterprise',
};
