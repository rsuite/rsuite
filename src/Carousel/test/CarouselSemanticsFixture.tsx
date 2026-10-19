import React, { useEffect } from 'react';
import Carousel from '../Carousel';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';

export default function CarouselSemanticsFixture({
  translated = false,
  partial = false,
  landmark = false,
  onReady
}: {
  translated?: boolean;
  partial?: boolean;
  landmark?: boolean;
  onReady?: () => void;
}) {
  useEffect(() => onReady?.(), [onReady]);
  return (
    <CustomProvider locale={translated ? zhCN : undefined}>
      <h2 id="destinations-title">{translated ? '精选目的地' : 'Destinations'}</h2>
      <Carousel
        data-testid="carousel"
        aria-labelledby="destinations-title"
        role={landmark ? 'region' : undefined}
        aria-roledescription={landmark ? 'photo gallery' : undefined}
        locale={
          partial ? { carouselRoleDescription: 'stories', slidePosition: '{0}/{1}' } : undefined
        }
        style={{ width: 400, height: 200 }}
      >
        <img
          alt="Lake"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20'%3E%3Crect width='40' height='20' fill='%230079aa'/%3E%3C/svg%3E"
        />
        <article aria-labelledby="city-title">
          <h3 id="city-title">City skyline</h3>
          <button>View city</button>
        </article>
        <svg role="img" aria-label="Map" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="5" />
        </svg>
      </Carousel>
    </CustomProvider>
  );
}
