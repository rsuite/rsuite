export default function isNumberOrTrue(value: number | boolean | undefined): boolean {
  if (typeof value === 'undefined') {
    return false;
  }

  return !!value || value === 0;
}
