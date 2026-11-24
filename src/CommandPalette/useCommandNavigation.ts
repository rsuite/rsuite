import { useState, useMemo, useCallback } from 'react';
import type { CommandDataItem } from './types';
import type { CommandEntry } from './commandUtils';

export default function useCommandNavigation<T extends CommandDataItem>(
  entries: readonly CommandEntry<T>[],
  query: string
) {
  const snapshot = useMemo(() => ({}), [entries, query]);
  const [state, setState] = useState<{
    snapshot: object;
    key: string;
  } | null>(null);
  const enabled = useMemo(() => entries.filter(entry => !entry.item.disabled), [entries]);
  // A result snapshot owns its active item. New queries/results cannot keep a
  // stale descendant or select an item that disappeared before an effect runs.
  const active =
    (state?.snapshot === snapshot ? enabled.find(entry => entry.key === state.key) : undefined) ??
    enabled[0];

  const activate = useCallback(
    (entry: CommandEntry<T>) => {
      if (entry.item.disabled || !entries.includes(entry)) return;
      setState(previous =>
        previous?.snapshot === snapshot && previous.key === entry.key
          ? previous
          : { snapshot, key: entry.key }
      );
    },
    [entries, snapshot]
  );
  const move = (direction: 1 | -1) => {
    if (!enabled.length) return;
    const index = enabled.indexOf(active);
    activate(enabled[(index + direction + enabled.length) % enabled.length]);
  };
  return { active, activate, move };
}
