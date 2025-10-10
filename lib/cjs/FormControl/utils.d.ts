/**
 * Converts a field name to a path that can be used in a nested object.
 * @example
 * nameToPath('a.b.c') // 'a.object.b.object.c'
 * nameToPath('items[0].name') // 'items.array[0].object.name'
 * @param name the field name to convert
 * @returns the converted path
 */
export declare function nameToPath(name: string): string;
