function findItemByKey(container: Element | null | undefined, value: unknown) {
  return Array.from(container?.querySelectorAll<HTMLElement>('[data-key]') ?? []).find(
    item => item.getAttribute('data-key') === String(value)
  );
}

export default findItemByKey;
