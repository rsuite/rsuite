import { useCallback } from 'react';
import type React from 'react';
import type { CommandEntry } from './commandUtils';
import type { CommandDataItem, CommandPaletteProps } from './types';

type SelectionOptions<T extends CommandDataItem> = Pick<
  CommandPaletteProps<T>,
  'open' | 'onSelect' | 'closeOnSelect' | 'onClose'
> & {
  busy: boolean;
  error: Error | null;
  visible: readonly CommandEntry<T>[];
};

// Keep the callback's scope separate from the palette's complete catalog.
// A closed palette can reuse this callback while its data prop is replaced.
export default function useCommandSelection<T extends CommandDataItem>({
  open,
  busy,
  error,
  visible,
  onSelect,
  closeOnSelect,
  onClose
}: SelectionOptions<T>) {
  return useCallback(
    (entry: CommandEntry<T>, event: React.SyntheticEvent) => {
      if (!open || busy || error || entry.item.disabled || !visible.includes(entry)) return;
      onSelect?.(entry.item.value, entry.item, event);
      if (closeOnSelect && !event.defaultPrevented) onClose?.(event);
    },
    [open, busy, error, visible, onSelect, closeOnSelect, onClose]
  );
}
