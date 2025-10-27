import { useGetUserById } from './useGetUserById';
import { PlatformType } from '../app/_core/_types/PlatformType';
import { getPlatformUserProfileLink } from '../app/_utils/getPlatformUserProfileLink';

export const useGetUserPublicInfoFromPlatform = ({
  userId,
  platform,
  revalidateOnFocus,
}: {
  userId: string;
  platform: PlatformType;
  revalidateOnFocus?: boolean;
}) => {
  const { user, isLoading, error } = useGetUserById({ userId, revalidateOnFocus });
  const userPlatformInfo = user?.userPlatformInfo.find(info => info.platform === platform);
  const username = userPlatformInfo?.username ?? '';
  const avatarURL = userPlatformInfo?.avatarURL ?? 'https://www.gravatar.com/avatar/?d=mp';
  const usernameLink = getPlatformUserProfileLink({ platform, username });

  return {
    user,
    isLoading,
    error,
    username,
    avatarURL,
    usernameLink,
  };
};
