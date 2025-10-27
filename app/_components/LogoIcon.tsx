'use client';

import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

export const LogoIcon: FC = () => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 50em)');
  const logoSize = isMobile ? 26 : 48;

  function goToHome() {
    router.push('/');
  }

  return (
    <Image
      src={'/opire_logo.svg'}
      alt="Opire logo"
      width={logoSize}
      height={logoSize}
      onClick={goToHome}
      style={{ cursor: 'pointer' }}
    />
  );
};
