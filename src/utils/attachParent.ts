export function attachParent<T>(data: T, parent: T): T {
  // mark "parent" unenumable
  Object.defineProperty(data, 'parent', {
    value: parent,
    writable: false,
    enumerable: false,
    configurable: true
  });
  return data;
}
