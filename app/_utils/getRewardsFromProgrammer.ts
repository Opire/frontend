import { API_ROUTES } from '../../constants';
import { serverCustomFetch } from './serverCustomFetch';

export async function getRewardsFromProgrammer() {
  const response = await serverCustomFetch(API_ROUTES.REWARDS.TRYING_BY_ME());

  return response.json();
}
