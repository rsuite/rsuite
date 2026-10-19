import React, { useEffect } from 'react';
import Carousel from '../Carousel';
import CustomProvider from '../../CustomProvider';

export default function CarouselAutoplayFixture({
  reduceMotion,
  onReady,
  onSlideStart
}: {
  reduceMotion?: boolean;
  onReady?: () => void;
  onSlideStart?: (index: number) => void;
}) {
  useEffect(() => onReady?.(), [onReady]);
  return (
    <CustomProvider reduceMotion={reduceMotion}>
      <button data-testid="before">Before</button>
      <Carousel
        data-testid="carousel"
        autoplay
        autoplayInterval={1000}
        style={{ width: 400, height: 200 }}
        onSlideStart={onSlideStart}
      >
        <article>
          <button data-testid="first-action">First action</button>
        </article>
        <article>
          <button data-testid="second-action">Second action</button>
        </article>
      </Carousel>
      <button data-testid="after">After</button>
    </CustomProvider>
  );
}
