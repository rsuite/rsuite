import React, { createContext, useContext } from 'react';
import type { ListChildComponentProps } from '@/internals/Windowing';

const ItemRendererContext = createContext<(props: ListChildComponentProps) => React.ReactNode>(
  () => null
);

export const ItemRendererProvider = ItemRendererContext.Provider;

// Keep the row component type stable when the list's focus or selection changes.
export default function VirtualizedListItem(props: ListChildComponentProps) {
  const renderItem = useContext(ItemRendererContext);
  return renderItem(props);
}
