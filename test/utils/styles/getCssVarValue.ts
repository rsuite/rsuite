export function getCssVarValue(element: HTMLElement, variableName: string) {
  if (!element || !variableName.startsWith('--')) return '';

  // 1. Try to get directly from `element.style`
  const rawValue = element.style.getPropertyValue(variableName).trim();
  if (rawValue) return rawValue;

  // 2. Parse from `style=""` attribute
  const inlineStyle = element.getAttribute('style') || '';
  const match = inlineStyle.match(new RegExp(`${variableName}:\\s*([^;]+)`));

  return match ? match[1].trim() : '';
}
