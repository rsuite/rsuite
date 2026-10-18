import React, { useCallback, useMemo, useRef } from 'react';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import useLocaleSearch from '../useLocaleSearch';
import useCustomConfig from '@/internals/hooks/useCustomConfig';
import { useControlled, useStyles, useUniqueId } from '@/internals/hooks';
import { isComposingEvent, mergeRefs } from '@/internals/utils';
import enGB from '../locales/en_GB';
import CommandResults from './CommandResults';
import useCommandNavigation from './useCommandNavigation';
import { createCommandEntries, getCommandText, groupCommands } from './commandUtils';
import type { CommandEntry } from './commandUtils';
import type { CommandDataItem, CommandPaletteComponent, CommandPaletteProps } from './types';

const emptyEntries: never[] = [];

/** Search and invoke application commands in a keyboard-accessible modal dialog. */
const CommandPalette = React.forwardRef(function CommandPalette<T extends CommandDataItem>(
  props: CommandPaletteProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { propsWithDefaults, getLocale } = useCustomConfig('CommandPalette', props);
  const {
    title,
    data,
    searchValue: controlledSearch,
    defaultSearchValue = '',
    filter = true,
    loading,
    searchLocale,
    collatorOptions,
    closeOnSelect = true,
    closeButton = true,
    locale: localeProp,
    inputProps,
    inputRef,
    footer,
    renderItem,
    renderEmpty,
    renderError,
    onSelect,
    onSearch,
    onClose,
    onOpen,
    open,
    autoFocus = true,
    className,
    classPrefix = 'command-palette',
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...rest
  } = propsWithDefaults;
  const locale = {
    ...enGB.common,
    ...enGB.Combobox,
    ...enGB.CommandPalette,
    ...getLocale(['Combobox', 'CommandPalette']),
    ...localeProp
  };
  const { withPrefix, prefix, merge } = useStyles(classPrefix);
  const instanceId = useUniqueId('command-');
  const titleId = `${instanceId}-title`;
  const listId = `${instanceId}-list`;
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useControlled(controlledSearch, defaultSearchValue);
  const entries = useMemo(() => createCommandEntries(data), [data]);
  const search = useLocaleSearch({
    items: entries,
    query,
    getText: getCommandText,
    locale: searchLocale,
    collatorOptions,
    enabled: Boolean(open && filter)
  });
  const busy = Boolean(loading || (filter && search.loading));
  const error = filter ? search.error : null;
  const matching = open && !busy && !error ? (filter ? search.items : entries) : emptyEntries;
  const groups = useMemo(() => groupCommands<T>(matching), [matching]);
  const visible = useMemo(() => groups.flatMap(group => group.entries), [groups]);
  const navigation = useCommandNavigation(visible, query);
  const activeId = navigation.active
    ? `${listId}-option-${navigation.active.sourceIndex}`
    : undefined;

  const handleSelect = useCallback(
    (entry: CommandEntry<T>, event: React.SyntheticEvent) => {
      if (!open || busy || error || entry.item.disabled || !visible.includes(entry)) return;
      onSelect?.(entry.item.value, entry.item, event);
      if (closeOnSelect && !event.defaultPrevented) onClose?.(event);
    },
    [open, busy, error, visible, onSelect, closeOnSelect, onClose]
  );
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    inputProps?.onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      isComposingEvent(event) ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      navigation.move(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Enter') {
      // Let onSelect cancel closing before preventing native form submission.
      if (!event.repeat && navigation.active) handleSelect(navigation.active, event);
      event.preventDefault();
    }
  };
  const retry = () => {
    searchRef.current?.focus();
    search.reload();
  };

  return (
    <Modal
      {...rest}
      ref={ref}
      open={open}
      role="dialog"
      autoFocus={autoFocus}
      onClose={onClose}
      onOpen={() => {
        // Modal has captured the previous focus owner before calling onOpen.
        if (autoFocus) searchRef.current?.focus();
        onOpen?.();
      }}
      className={merge(withPrefix(), className)}
      aria-labelledby={ariaLabelledby ?? titleId}
      aria-describedby={ariaDescribedby ?? ''}
    >
      <Modal.Header closeButton={closeButton} className={prefix('header')}>
        <Modal.Title id={titleId}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={prefix('body')}>
        <Input
          {...inputProps}
          as="input"
          ref={mergeRefs(searchRef, inputRef)}
          className={merge(prefix('search'), inputProps?.className)}
          value={query}
          defaultValue={undefined}
          type="text"
          role="combobox"
          autoComplete={inputProps?.autoComplete ?? 'off'}
          autoFocus={false}
          disabled={false}
          readOnly={false}
          plaintext={false}
          inputRef={undefined}
          onPressEnter={undefined}
          aria-label={inputProps?.['aria-label'] ?? locale.searchPlaceholder}
          placeholder={inputProps?.placeholder ?? locale.searchPlaceholder}
          aria-autocomplete={filter ? 'list' : 'none'}
          aria-expanded={Boolean(open)}
          aria-controls={listId}
          aria-activedescendant={activeId}
          aria-busy={busy}
          onChange={(value, event) => {
            setQuery(value);
            onSearch?.(value, event);
          }}
          onKeyDown={handleKeyDown}
        />
        <CommandResults
          groups={groups}
          listId={listId}
          titleId={titleId}
          activeId={activeId}
          busy={busy}
          classPrefix={classPrefix}
          renderItem={renderItem}
          onActive={navigation.activate}
          onSelect={handleSelect}
        />
        {busy && (
          <div role="status" className={prefix('status')}>
            {locale.loading}
          </div>
        )}
        {!busy && error && (
          <div role="alert" className={prefix('status')}>
            {renderError ? (
              renderError(error, retry)
            ) : (
              <>
                <p>{locale.errorText}</p>
                <Button onClick={retry}>{locale.retryText}</Button>
              </>
            )}
          </div>
        )}
        {!busy && !error && visible.length === 0 && (
          <div role="status" className={prefix('status')}>
            {renderEmpty ? renderEmpty(query) : locale.noResultsText}
          </div>
        )}
      </Modal.Body>
      {footer != null && <Modal.Footer className={prefix('footer')}>{footer}</Modal.Footer>}
    </Modal>
  );
}) as CommandPaletteComponent;

CommandPalette.displayName = 'CommandPalette';
export default CommandPalette;
