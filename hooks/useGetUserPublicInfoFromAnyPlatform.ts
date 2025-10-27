import { useGetUserById } from './useGetUserById';
import { getPlatformUserProfileLink } from '../app/_utils/getPlatformUserProfileLink';

export const useGetUserPublicInfoFromAnyPlatform = ({
  userId,
  revalidateOnFocus,
}: {
  userId: string;
  revalidateOnFocus?: boolean;
}) => {
  const { user, isLoading, error } = useGetUserById({ userId, revalidateOnFocus });
  const userPlatformInfoWithAvatar = user?.userPlatformInfo.find(info => info.avatarURL);
  const userPlatformToUse = userPlatformInfoWithAvatar ?? user?.userPlatformInfo[0];
  const username = userPlatformToUse?.username ?? '';
  const avatarURL = userPlatformToUse?.avatarURL ?? 'https://www.gravatar.com/avatar/?d=mp';
  const usernameLink = getPlatformUserProfileLink({
    platform: userPlatformToUse?.platform ?? 'GitHub',
    username,
  });

  return {
    user,
    isLoading,
    error,
    username,
    avatarURL,
    usernameLink,
  };
};
