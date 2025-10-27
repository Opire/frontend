import { RewardFilters } from '../home/_components/Filters/Filters';
import { API_ROUTES } from '../../constants';
import { buildEndpointWithSearchAndPagination } from '../home/_utils/buildEndpointWithSearchAndPagination';
import { serverCustomFetch } from './serverCustomFetch';

export async function getRewards({
  page = 1,
  itemsPerPage = 30,
  search,
  filters,
}: {
  page?: number;
  itemsPerPage?: number;
  search?: string;
  filters: RewardFilters;
}) {
  const response = await serverCustomFetch(
    buildEndpointWithSearchAndPagination(API_ROUTES.REWARDS.ALL(), {
      itemsPerPage,
      page,
      filters,
      search,
    })
  );

  return response.json();
}
