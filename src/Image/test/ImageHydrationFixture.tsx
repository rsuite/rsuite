import React from 'react';
import CustomProvider from '@/CustomProvider';
import Image from '../Image';

export default function ImageHydrationFixture() {
  return (
    <CustomProvider>
      <Image
        alt="demo"
        src="/demo.png"
        srcSet="/demo.png 1x, /demo@2x.png 2x"
        fit="cover"
        position="top"
        loading="lazy"
      />
    </CustomProvider>
  );
}
