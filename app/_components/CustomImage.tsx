import React, { FC } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

export const CustomImage: FC<ImageWithFallbackProps> = ({ fallbackSrc, ...rest }) => (
  <Image
    {...rest}
    onError={e => {
      e.currentTarget.src = fallbackSrc;
    }}
  />
);
