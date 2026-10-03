import React, { useEffect } from 'react';
import Carousel from '../Carousel';

export default function CarouselHydrationFixture({ onHydrated }: { onHydrated?: () => void }) {
  useEffect(() => {
    onHydrated?.();
  }, [onHydrated]);

  return (
    <>
      <Carousel data-testid="first-carousel" defaultActiveIndex={1}>
        <div>First slide A</div>
        <div>First slide B</div>
      </Carousel>
      <Carousel data-testid="second-carousel">
        <div>Second slide A</div>
        <div>Second slide B</div>
      </Carousel>
    </>
  );
}
