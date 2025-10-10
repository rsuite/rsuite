'use client';
/**
 * Attaches a parent object to the given data object.
 */
export function attachParent(data, parent) {
  // mark "parent" unenumable
  Object.defineProperty(data, 'parent', {
    value: parent,
    writable: false,
    enumerable: false,
    configurable: true
  });
  return data;
}
export default attachParent;