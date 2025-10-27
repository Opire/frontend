'use client';

import { Suspense } from 'react';
import { NEXT_SERVER_ROUTES } from '../../../constants';
import { AuthCodeOverlay } from '../../_components/User/AuthCodeOverlay';

export function AuthGitlabView() {
  return (
    <Suspense fallback={null}>
      <AuthCodeOverlay urlForApiToken={NEXT_SERVER_ROUTES.AUTH.GITLAB} />
    </Suspense>
  );
}
