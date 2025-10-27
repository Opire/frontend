import { PlatformType } from '../_core/_types/PlatformType';

export function getPlatformUserProfileLink({
  platform,
  username,
}: {
  platform: PlatformType;
  username: string;
}): string {
  switch (platform) {
    case 'GitHub':
      return `https://github.com/${username}`;
    case 'GitLab':
      return `https://gitlab.com/${username}`; // TODO: fix this
    case 'BitBucket':
      return `https://bitbucket.com/${username}`; // TODO: fix this
    default:
      return '';
  }
}
