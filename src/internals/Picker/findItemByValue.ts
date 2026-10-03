function findItemByValue(container: Element | null | undefined, value: unknown) {
  const key = String(value);

  return Array.from(container?.querySelectorAll<HTMLElement>('[data-key]') ?? []).find(
    item => item.dataset.key === key
  );
}

export default findItemByValue;
