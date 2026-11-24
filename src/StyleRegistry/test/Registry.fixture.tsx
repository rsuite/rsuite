import React, { StrictMode, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import Box from '@/Box';
import CustomProvider from '@/CustomProvider';
import StyleRegistry from '..';
import type { StyleRegistryInstance } from '@/createStyleRegistry';

export interface RegistrySpec {
  id: string;
  prefix: string;
  color?: string;
  padding?: number;
  strict?: boolean;
  fontFamily?: string;
}

function Target({ spec }: { spec: RegistrySpec }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <Box
      data-testid={spec.id}
      data-ready={ready}
      data-react={React.version}
      data-react-dom={ReactDOM.version}
      data-color={spec.color || ''}
      data-padding={spec.padding ?? ''}
      c={spec.color}
      ff={spec.fontFamily}
      p={
        spec.padding === undefined
          ? undefined
          : { xs: `${spec.padding}px`, md: `${spec.padding + 10}px` }
      }
    >
      {spec.id}
    </Box>
  );
}

export default function RegistryFixture({
  registry,
  spec
}: {
  registry: StyleRegistryInstance;
  spec: RegistrySpec;
}) {
  const content = (
    <StyleRegistry registry={registry}>
      <CustomProvider csp={{ nonce: 'registry-test' }}>
        <Target spec={spec} />
      </CustomProvider>
    </StyleRegistry>
  );
  return content;
}

export function createRegistryFixture(registry: StyleRegistryInstance, spec: RegistrySpec) {
  const content = <RegistryFixture registry={registry} spec={spec} />;
  return spec.strict ? <StrictMode>{content}</StrictMode> : content;
}
