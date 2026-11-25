import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { LedgerRow } from '../../types';
export function useVirtualCheckboxFocus(
  rows: LedgerRow[],
  scrollToIndex: (index: number, align: 'start' | 'auto') => void
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [tabStop, setTabStop] = useState(rows[0]?.id);
  const [pending, setPending] = useState<string | null>(null);
  const jumpToIndex = useCallback(
    (index: number) => {
      setPending(null);
      setTabStop(rows[index]?.id);
      scrollToIndex(index, 'start');
    },
    [rows, scrollToIndex]
  );
  useLayoutEffect(() => {
    const root = viewportRef.current;
    if (!pending || !root) return;
    let frame: number;
    const focus = () => {
      const row = root.querySelector('[data-virtual-row-id="' + pending + '"]'),
        input = row?.querySelector<HTMLInputElement>('input[type="checkbox"]');
      if (input) {
        input.focus({ preventScroll: true });
        setPending(null);
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(focus);
    };
    const observer = new MutationObserver(schedule);
    observer.observe(root, { subtree: true, childList: true });
    schedule();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pending]);
  const getInputProps = (row: LedgerRow) => ({
    tabIndex: row.id === tabStop ? 0 : -1,
    onFocus: () => setTabStop(row.id),
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        !['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)
      )
        return;
      const current = rows.findIndex(item => item.id === row.id),
        next =
          event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? rows.length - 1
              : Math.max(
                  0,
                  Math.min(rows.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1))
                );
      event.preventDefault();
      setTabStop(rows[next].id);
      scrollToIndex(next, 'auto');
      setPending(rows[next].id);
    }
  });
  return { viewportRef, jumpToIndex, getInputProps };
}
