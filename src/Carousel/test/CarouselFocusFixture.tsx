import React, { useEffect, useState } from 'react';
import Carousel from '../Carousel';

const Slide = (props: React.HTMLAttributes<HTMLElement>) => <article {...props} />;
const vectorContent = (
  <a data-testid="vector-link" href="#vector" tabIndex={0}>
    <text x="10" y="30">
      Vector link
    </text>
  </a>
);
const VectorSlide = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 400 100">
    {vectorContent}
  </svg>
);
const content = (name: string) => (
  <>
    <button data-testid={`${name}-button`}>{name} action</button>
    <input data-testid={`${name}-input`} aria-label={`${name} input`} defaultValue="initial" />
    <a data-testid={`${name}-link`} href={`#${name}`}>
      {name} link
    </a>
    <div data-testid={`${name}-editable`} contentEditable suppressContentEditableWarning>
      {name} editable
    </div>
  </>
);
const firstContent = content('first');
const secondContent = content('second');
const carouselStyle = { width: 400, height: 100 };

export default function CarouselFocusFixture({
  controlled = false,
  autoplay = false,
  preserveInert = false,
  vector,
  placement = 'bottom',
  onReady,
  onSelect
}: {
  controlled?: boolean;
  autoplay?: boolean;
  preserveInert?: boolean;
  vector?: 'native' | 'custom';
  placement?: 'bottom' | 'right';
  onReady?: () => void;
  onSelect?: (index: number, trusted: boolean) => void;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  useEffect(() => onReady?.(), [onReady]);
  return (
    <>
      <button data-testid="before">Before</button>
      <Carousel
        data-testid="carousel"
        placement={placement}
        activeIndex={controlled || autoplay ? index : undefined}
        autoplay={playing}
        autoplayInterval={100}
        style={carouselStyle}
        onSelect={(next, event) => {
          if (controlled) setIndex(next);
          onSelect?.(next, event.isTrusted);
        }}
        onSlideStart={next => {
          if (autoplay) {
            setIndex(next);
            if (next === 0) setPlaying(false);
          }
        }}
      >
        <article
          data-testid="first-slide"
          inert={
            preserveInert
              ? React.version.startsWith('18.')
                ? ('' as unknown as boolean)
                : true
              : undefined
          }
        >
          {firstContent}
        </article>
        {vector === 'native' ? (
          <svg data-testid="second-slide" viewBox="0 0 400 100">
            {vectorContent}
          </svg>
        ) : vector === 'custom' ? (
          <VectorSlide data-testid="second-slide" />
        ) : (
          <Slide data-testid="second-slide">{secondContent}</Slide>
        )}
      </Carousel>
      <button data-testid="after">After</button>
    </>
  );
}
