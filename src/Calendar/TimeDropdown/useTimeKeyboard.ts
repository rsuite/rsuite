import { useRef, useState } from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';

export interface TimeOption<T> {
  value: T;
  label: string;
  ariaLabel: string;
  selected: boolean;
  disabled?: boolean;
}

function useTimeKeyboard<T extends string | number>(
  options: TimeOption<T>[],
  onSelect: (value: T, event: React.SyntheticEvent) => void
) {
  const ref = useRef<HTMLUListElement>(null);
  const inside = useRef(false);
  const search = useRef({ text: '', time: 0 });
  const [focusedValue, setFocusedValue] = useState<T>();
  const enabled = options.filter(option => !option.disabled);
  const selected = enabled.find(option => option.selected) ?? enabled[0];
  const active = enabled.find(option => option.value === focusedValue) ?? selected;

  const focusOption = useEventCallback((option?: TimeOption<T>) => {
    const list = ref.current;
    if (!list) return;
    const element = Array.from(list.querySelectorAll<HTMLElement>('[role="option"]')).find(
      element => element.dataset.value === String(option?.value)
    );
    (element ?? list).focus({ preventScroll: true });
    if (!element) return;

    const { top, bottom } = element.getBoundingClientRect();
    const viewportTop = list.getBoundingClientRect().top + list.clientTop;
    const viewportBottom = viewportTop + list.clientHeight;
    const delta = top < viewportTop ? top - viewportTop : Math.max(0, bottom - viewportBottom);
    if (delta) list.scrollTo({ top: list.scrollTop + delta, behavior: 'instant' });
  });

  useIsomorphicLayoutEffect(() => {
    if (!inside.current || enabled.some(option => option.value === focusedValue)) return;
    const list = ref.current;
    if (!list) return;
    const focused = list.ownerDocument.activeElement;
    if (focused === list.ownerDocument.body || list.contains(focused)) focusOption(active);
  });

  const onFocus = useEventCallback((event: React.FocusEvent<HTMLElement>) => {
    inside.current = true;
    const target = event.target as HTMLElement;
    const option = enabled.find(option => String(option.value) === target.dataset.value);
    if (option) setFocusedValue(option.value);
    else if (target === event.currentTarget && active) focusOption(active);
  });

  const onBlur = useEventCallback((event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      inside.current = false;
      setFocusedValue(undefined);
      search.current.text = '';
    }
  });

  const onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.nativeEvent.isComposing
    )
      return;
    const target = event.target as HTMLElement;
    if (
      target !== event.currentTarget &&
      target.closest('[role="listbox"]') !== event.currentTarget
    )
      return;
    const index = enabled.findIndex(option => String(option.value) === target.dataset.value);
    let next: TimeOption<T> | undefined;

    switch (event.key) {
      case 'ArrowDown':
        next = enabled[Math.min(index + 1, enabled.length - 1)];
        break;
      case 'ArrowUp':
        next = enabled[Math.max(0, index - 1)];
        break;
      case 'Home':
        next = enabled[0];
        break;
      case 'End':
        next = enabled[enabled.length - 1];
        break;
      case ' ':
        next = active;
        break;
      default: {
        if (event.key.length !== 1) {
          search.current.text = '';
          return;
        }
        const key = event.key.toLowerCase();
        const text =
          (event.timeStamp - search.current.time < 1000 ? search.current.text : '') + key;
        const matches = (option: TimeOption<T>, query: string) =>
          String(option.value).toLowerCase().startsWith(query) ||
          option.label.toLowerCase().startsWith(query);
        const ordered = [...enabled.slice(index + 1), ...enabled.slice(0, index + 1)];
        next = (text.length > 1 ? enabled : ordered).find(option => matches(option, text));
        if (!next) next = ordered.find(option => matches(option, key));
        search.current = { text: next && matches(next, text) ? text : key, time: event.timeStamp };
        if (!next) return;
        event.preventDefault();
        focusOption(next);
        if (!next.selected) onSelect(next.value, event);
        return;
      }
    }

    search.current.text = '';
    event.preventDefault();
    if (!next) return;
    focusOption(next);
    if (!next.selected) onSelect(next.value, event);
  });

  return { ref, activeValue: active?.value, onFocus, onBlur, onKeyDown };
}

export default useTimeKeyboard;
