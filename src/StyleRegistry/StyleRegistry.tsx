import React, { useId, useMemo } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';
import { StyleContext } from '@/internals/styled-system/registry/StyleContext';
import { getRegistryScope } from '@/internals/styled-system/registry/createRegistry';
import { encodeStyleId } from '@/internals/styled-system/style-id';
import type { StyleRegistryInstance } from '@/internals/styled-system/registry/types';

export interface StyleRegistryProps {
  registry: StyleRegistryInstance;
  children?: React.ReactNode;
}

/** Collect system-prop styles on the server and adopt their rules during hydration. */
export default function StyleRegistry({ registry, children }: StyleRegistryProps) {
  const owner = `rs-style-${encodeStyleId(useId())}`;
  const scope = useMemo(() => getRegistryScope(registry, owner), [registry, owner]);
  useIsomorphicLayoutEffect(() => scope.retain(), [scope]);
  return <StyleContext.Provider value={scope}>{children}</StyleContext.Provider>;
}
