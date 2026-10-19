import React, { useEffect, useId, useState } from 'react';
import ReactDOM from 'react-dom';
import Box from '@/internals/Box';
import { CustomContext } from '@/internals/Provider/CustomContext';

export interface RootStyleSpec {
  id: string;
  prefix: string;
  color: string;
  padding: number;
}

export default function RootStyleFixture({ spec }: { spec: RootStyleSpec }) {
  const rawId = useId();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <CustomContext.Provider value={{ csp: { nonce: 'style-identifiers-test' } }}>
      <Box
        data-testid={spec.id}
        data-ready={ready}
        data-raw-id={rawId}
        data-react={React.version}
        data-react-dom={ReactDOM.version}
        c={spec.color}
        p={{ xs: `${spec.padding}px`, md: `${spec.padding + 10}px` }}
      >
        {spec.id}
      </Box>
    </CustomContext.Provider>
  );
}
