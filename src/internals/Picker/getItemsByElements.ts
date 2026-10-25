import getOptionKey from './getOptionKey';

/** Resolve a rendered option list without rescanning all data for each row. */
function getItemsByElements<T>(
  elements: readonly HTMLElement[],
  data: readonly T[] | undefined,
  valueKey: string
) {
  if (!elements.length) return [];

  const typed = new Map<string, T>();
  const legacy = new Map<string, T>();

  for (const item of data ?? []) {
    const value = item[valueKey];
    const typedKey = getOptionKey(value);
    const legacyKey = String(value);
    // Match the first item just as the previous per-row find did.
    if (!typed.has(typedKey)) typed.set(typedKey, item);
    if (!legacy.has(legacyKey)) legacy.set(legacyKey, item);
  }

  return elements.map(element => {
    const { pickerKey, key } = element.dataset;
    return pickerKey === undefined
      ? key === undefined
        ? undefined
        : legacy.get(key)
      : typed.get(pickerKey);
  });
}

export default getItemsByElements;
