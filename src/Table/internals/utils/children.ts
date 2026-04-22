import React from 'react';
import { isFragment } from './react-is';

export const flattenChildren = (
  children: React.ReactNode | React.ReactNode[],
  flattened: React.ReactNode[] = []
) => {
  for (const child of React.Children.toArray(children)) {
    if (isFragment(child)) {
      const childEl = child as React.ReactElement<any>;
      if (childEl.props?.children) {
        flattenChildren(childEl.props.children, flattened);
      }
    } else {
      flattened.push(child);
    }
  }
  return flattened;
};
