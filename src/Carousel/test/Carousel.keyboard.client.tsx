import React, { StrictMode, useEffect, useState } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Carousel from '../Carousel';
import type { CarouselProps } from '../Carousel';
import '../styles/index.scss';

const options = new URLSearchParams(window.location.hash.slice(1));
const selections: { carousel: string; index: number; trusted: boolean }[] = [];
let ready = false;

function Fixture() {
  const [first, setFirst] = useState(1);
  const [second, setSecond] = useState(0);
  useEffect(() => {
    ready = true;
  }, []);
  const common = {
    placement: (options.get('placement') || 'bottom') as CarouselProps['placement'],
    shape: (options.get('shape') || 'dot') as CarouselProps['shape'],
    style: { width: 300, height: 100, '--rs-focus-ring-color': 'rgb(1, 2, 3)' }
  };
  return (
    <>
      <button>Before</button>
      <Carousel
        {...common}
        data-testid="first"
        defaultActiveIndex={1}
        activeIndex={options.has('controlled') ? first : undefined}
        onSelect={(index, event) => {
          selections.push({ carousel: 'first', index, trusted: event.isTrusted });
          if (options.has('controlled')) setFirst(index);
        }}
      >
        <div>First A</div>
        <div>First B</div>
        <div>First C</div>
      </Carousel>
      <button>Between</button>
      <Carousel
        {...common}
        data-testid="second"
        activeIndex={options.has('controlled') ? second : undefined}
        onSelect={(index, event) => {
          selections.push({ carousel: 'second', index, trusted: event.isTrusted });
          if (options.has('controlled')) setSecond(index);
        }}
      >
        <div>Second A</div>
        <div>Second B</div>
      </Carousel>
      <button>After</button>
    </>
  );
}

window.__RSUITE_CAROUSEL_KEYBOARD__ = {
  runtime: { react: React.version, reactDOM: reactDOMVersion },
  snapshot: () => ({ ready, selections: [...selections] })
};

declare global {
  interface Window {
    __RSUITE_CAROUSEL_KEYBOARD__: {
      runtime: { react: string; reactDOM: string };
      snapshot: () => { ready: boolean; selections: typeof selections };
    };
  }
}

const fixture = <Fixture />;
createRoot(document.getElementById('root')!).render(
  options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture
);
