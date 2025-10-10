'use client';
/**
 * Formats the reference key for a tree node.
 */
export function formatNodeRefKey(value) {
  return "" + (typeof value === 'number' ? 'Number_' : 'String_') + value;
}