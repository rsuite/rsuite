function getOptionKey(value: unknown) {
  if (typeof value === 'number' || typeof value === 'string') {
    return `${typeof value}:${value}`;
  }

  return String(value);
}

export default getOptionKey;
