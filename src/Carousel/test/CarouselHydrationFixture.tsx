import React, { useEffect } from 'react';
import Carousel from '../Carousel';

export default function CarouselHydrationFixture({
  onHydrated,
  onSelect
}: {
  onHydrated?: () => void;
  onSelect?: (carousel: string, index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  useEffect(() => {
    onHydrated?.();
  }, [onHydrated]);

  return (
    <>
      <Carousel
        data-testid="first-carousel"
        defaultActiveIndex={1}
        onSelect={(index, event) => onSelect?.('first', index, event)}
      >
        <div>First slide A</div>
        <div>First slide B</div>
      </Carousel>
      <Carousel
        data-testid="second-carousel"
        onSelect={(index, event) => onSelect?.('second', index, event)}
      >
        <div>Second slide A</div>
        <div>Second slide B</div>
      </Carousel>
    </>
  );
}
