import getOptionKey from './getOptionKey';

function findItemByKey(container: Element | null | undefined, value: unknown) {
  const items = Array.from(container?.querySelectorAll<HTMLElement>('[data-key]') ?? []);
  const key = getOptionKey(value);

  return (
    items.find(item => item.dataset.pickerKey === key) ||
    items.find(item => item.dataset.pickerKey === undefined && item.dataset.key === String(value))
  );
}

export default findItemByKey;
