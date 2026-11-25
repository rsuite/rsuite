import { useRef } from 'react';
import isNil from 'lodash/isNil';
import { useEventCallback, useIsomorphicLayoutEffect } from '@/internals/hooks';
import findItemByKey from '../findItemByKey';
import type { RefObject } from 'react';

interface Props {
  menuRef: RefObject<HTMLElement | null>;
  focusItemValue: any;
  onChange?: (id: string | undefined) => void;
}

export default function useActiveDescendant({ menuRef, focusItemValue, onChange }: Props) {
  const reported = useRef<{ id: string | undefined } | undefined>(undefined);
  const report = useEventCallback(() => {
    if (!onChange) return;

    const item = isNil(focusItemValue) ? undefined : findItemByKey(menuRef.current, focusItemValue);
    const id = item?.getAttribute('aria-disabled') !== 'true' ? item?.id || undefined : undefined;
    if (!reported.current || reported.current.id !== id) {
      reported.current = { id };
      onChange(id);
    }
  });

  useIsomorphicLayoutEffect(report);
  const clear = useEventCallback(() => {
    reported.current = undefined;
    onChange?.(undefined);
  });
  useIsomorphicLayoutEffect(() => clear, [clear]);

  return report;
}
