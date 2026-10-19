import React from 'react';
import type { Item } from './protocol';

export const listHeight = 180;
export const rowHeight = 36;

export function contains(label: string, query: string) {
  return label.toLowerCase().includes(query.toLowerCase());
}

export function OptionLabel({ item }: { item: Item }) {
  return (
    <span className="benchmark-option-label" data-bench-value={item.value}>
      {item.label}
    </span>
  );
}

export const Empty = () => <span data-bench-empty>No results</span>;
