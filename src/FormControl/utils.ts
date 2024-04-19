export function nameToPath(name: string) {
  return name.includes('.') ? name.replace('.', '.object.') : name;
}
