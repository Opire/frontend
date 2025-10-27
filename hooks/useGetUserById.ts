import useSWR from 'swr';
import { API_ROUTES } from '../constants';
import { fetcher } from '../app/_utils/fetcher';
import { UserPrimitive } from '../app/_core/_primitives/UserPrimitive';

export const useGetUserById = ({
  userId,
  revalidateOnFocus,
}: {
  userId: string;
  revalidateOnFocus?: boolean;
}) => {
  const { data, error, isValidating } = useSWR(
    API_ROUTES.USERS.BY_ID(userId),
    (url: string) => fetcher<UserPrimitive>(url),
    { revalidateOnFocus }
  );
  const user = data ?? undefined;

  return {
    user,
    error,
    isLoading: isValidating,
  };
};
