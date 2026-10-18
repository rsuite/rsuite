import type { CommandDataItem } from './types';

export interface CommandEntry<T extends CommandDataItem> {
  item: T;
  key: string;
  sourceIndex: number;
}

export interface CommandGroup<T extends CommandDataItem> {
  key: string;
  label: string;
  entries: CommandEntry<T>[];
}

export function createCommandEntries<T extends CommandDataItem>(
  data: readonly T[]
): CommandEntry<T>[] {
  const counts = new Map<string, number>();
  return data.map((item, sourceIndex) => {
    const valueKey = JSON.stringify([typeof item.value, String(item.value)]);
    const occurrence = counts.get(valueKey) ?? 0;
    counts.set(valueKey, occurrence + 1);
    return { item, sourceIndex, key: JSON.stringify([valueKey, occurrence]) };
  });
}

export function groupCommands<T extends CommandDataItem>(entries: readonly CommandEntry<T>[]) {
  const groups = new Map<string, CommandGroup<T>>();
  for (const entry of entries) {
    const label = entry.item.group || '';
    let group = groups.get(label);
    if (!group) {
      group = { key: JSON.stringify(label), label, entries: [] };
      groups.set(label, group);
    }
    group.entries.push(entry);
  }
  return Array.from(groups.values());
}

export function getCommandText<T extends CommandDataItem>({ item }: CommandEntry<T>) {
  return [item.label, item.group, ...(item.keywords ?? [])].filter(Boolean).join(' ');
}
