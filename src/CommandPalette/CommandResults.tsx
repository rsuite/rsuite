import React, { useRef } from 'react';
import { useStyles, useIsomorphicLayoutEffect } from '@/internals/hooks';
import type { CommandDataItem, CommandPaletteProps } from './types';
import type { CommandEntry, CommandGroup } from './commandUtils';
import CommandOption from './CommandOption';

interface CommandResultsProps<T extends CommandDataItem> {
  groups: CommandGroup<T>[];
  listId: string;
  titleId: string;
  activeId?: string;
  busy: boolean;
  classPrefix: string;
  renderItem?: CommandPaletteProps<T>['renderItem'];
  onActive: (entry: CommandEntry<T>) => void;
  onSelect: (entry: CommandEntry<T>, event: React.SyntheticEvent) => void;
}

export default function CommandResults<T extends CommandDataItem>(props: CommandResultsProps<T>) {
  const { groups, listId, titleId, activeId, busy, classPrefix, renderItem, onActive, onSelect } =
    props;
  const { prefix } = useStyles(classPrefix);
  const listRef = useRef<HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (activeId) {
      listRef.current?.ownerDocument.getElementById(activeId)?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeId]);

  const renderOption = (entry: CommandEntry<T>) => {
    const id = `${listId}-option-${entry.sourceIndex}`;
    return (
      <CommandOption
        id={id}
        key={entry.key}
        entry={entry}
        selected={id === activeId}
        classPrefix={classPrefix}
        renderItem={renderItem}
        onActive={onActive}
        onSelect={onSelect}
      />
    );
  };

  return (
    <div
      ref={listRef}
      id={listId}
      role="listbox"
      aria-labelledby={titleId}
      aria-busy={busy}
      className={prefix('list')}
    >
      {groups.map((group, index) =>
        group.label ? (
          <div key={group.key} role="group" aria-labelledby={`${listId}-group-${index}`}>
            <div id={`${listId}-group-${index}`} className={prefix('group-label')}>
              {group.label}
            </div>
            {group.entries.map(renderOption)}
          </div>
        ) : (
          <React.Fragment key={group.key}>{group.entries.map(renderOption)}</React.Fragment>
        )
      )}
    </div>
  );
}
