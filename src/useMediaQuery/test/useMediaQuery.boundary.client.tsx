import React, { StrictMode } from 'react';
import { version as reactDOMVersion } from 'react-dom';
import { createRoot } from 'react-dom/client';
import useMediaQuery from '../useMediaQuery';
import useBreakpointValue from '../../useBreakpointValue';

const options = new URLSearchParams(window.location.hash.slice(1));
const lower = options.get('lower')!;
const upper = options.get('upper')!;
const range = lower === 'xs' ? 'xs' : `xsTo${lower[0].toUpperCase()}${lower.slice(1)}`;
const queries = [`${lower}Down`, `${lower}Only`, upper, range];

function BoundaryFixture() {
  const matches = useMediaQuery(queries);
  const selected = useBreakpointValue({ [`${lower}Only`]: 'lower', [upper]: 'upper' });
  return (
    <output>
      {JSON.stringify({
        matches,
        selected,
        queries,
        react: React.version,
        reactDOM: reactDOMVersion
      })}
    </output>
  );
}

const fixture = <BoundaryFixture />;
createRoot(document.getElementById('root')!).render(
  options.has('strict') ? <StrictMode>{fixture}</StrictMode> : fixture
);
