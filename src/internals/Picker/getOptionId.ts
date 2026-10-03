function getOptionId(id: string | undefined, value: unknown) {
  if (!id) {
    return undefined;
  }

  const key = String(value).replace(
    /[%\t\n\f\r ]/g,
    character => `%${character.charCodeAt(0).toString(16).padStart(2, '0')}`
  );

  return `${id}-opt-${key}`;
}

export default getOptionId;
