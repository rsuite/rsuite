import React, { createContext, useContext } from 'react';
import type { ListChildComponentProps } from '@/internals/Windowing';

const NodeRendererContext = createContext<(props: ListChildComponentProps) => React.ReactNode>(
  () => null
);

export const NodeRendererProvider = NodeRendererContext.Provider;

/** Keep the virtual row component type stable when tree state changes. */
export default function VirtualizedTreeNode(props: ListChildComponentProps) {
  const renderNode = useContext(NodeRendererContext);
  return renderNode(props);
}
