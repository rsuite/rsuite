import React from 'react';
import { useStyles } from '@/internals/hooks';
import type { CommandEntry } from './commandUtils';
import type { CommandDataItem, CommandPaletteProps } from './types';

interface CommandOptionProps<T extends CommandDataItem> {
  entry: CommandEntry<T>;
  id: string;
  selected: boolean;
  classPrefix: string;
  renderItem?: CommandPaletteProps<T>['renderItem'];
  onActive: (entry: CommandEntry<T>) => void;
  onSelect: (entry: CommandEntry<T>, event: React.SyntheticEvent) => void;
}

function CommandOption<T extends CommandDataItem>(props: CommandOptionProps<T>) {
  const { entry, id, selected, classPrefix, renderItem, onActive, onSelect } = props;
  const { item } = entry;
  const { prefix } = useStyles(classPrefix);
  const describedBy =
    [
      item.description != null ? `${id}-description` : '',
      item.shortcut != null ? `${id}-shortcut` : ''
    ]
      .filter(Boolean)
      .join(' ') || undefined;
  return (
    <div
      id={id}
      role="option"
      aria-label={item.label}
      aria-describedby={describedBy}
      aria-disabled={item.disabled || undefined}
      aria-selected={!item.disabled && selected}
      className={prefix('item')}
      onMouseMove={() => onActive(entry)}
      onMouseDown={event => {
        if (event.button === 0) event.preventDefault();
      }}
      onClick={event => onSelect(entry, event)}
    >
      {item.icon != null && (
        <span className={prefix('icon')} aria-hidden="true">
          {item.icon}
        </span>
      )}
      <div className={prefix('content')}>
        <div className={prefix('label')}>{renderItem ? renderItem(item) : item.label}</div>
        {item.description != null && (
          <div id={`${id}-description`} className={prefix('description')}>
            {item.description}
          </div>
        )}
      </div>
      {item.shortcut != null && (
        <kbd id={`${id}-shortcut`} className={prefix('shortcut')}>
          {item.shortcut}
        </kbd>
      )}
    </div>
  );
}

// Navigation changes the selected flag on two rows. Keep every other row's
// content and callbacks stable even when the full catalog is mounted.
export default React.memo(CommandOption) as typeof CommandOption;
