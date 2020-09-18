import React from 'react';
import VirtualizedList, { ListProps } from 'react-virtualized/dist/commonjs/List';
import VirtualizedAutoSizer, { AutoSizerProps } from 'react-virtualized/dist/commonjs/AutoSizer';

export interface ListInstance {
  child: Element;
  scrollToRow?: (index: number) => void;
}

export type { ListProps, AutoSizerProps };
export const List = (VirtualizedList as any) as React.ComponentType<ListProps>;
export const AutoSizer = (VirtualizedAutoSizer as any) as React.ComponentType<AutoSizerProps>;
