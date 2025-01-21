/**
 * Converts a field name to a path that can be used in a nested object.
 * @example
 * nameToPath('a.b.c') // 'a.object.b.object.c'
 * @param name the field name to convert
 * @returns the converted path
 */
export function nameToPath(name: string) {
  return name.includes('.') ? name.replaceAll('.', '.object.') : name;
}
