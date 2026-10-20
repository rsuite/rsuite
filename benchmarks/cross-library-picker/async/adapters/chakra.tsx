import React, { useMemo, useRef } from 'react';
import {
  ChakraProvider,
  Combobox,
  Portal,
  createListCollection,
  defaultSystem
} from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { flushSync } from 'react-dom';
import type { AsyncAdapterProps, AsyncItem } from '../types';
import { listHeight, rowHeight, OptionLabel } from '../../src/shared';
function Picker({ items, value, virtualized, onQuery, onSelectionChange }: AsyncAdapterProps) {
  const content = useRef<HTMLDivElement>(null);
  const collection = useMemo(() => createListCollection({ items }), [items]);
  const windowing = useVirtualizer({
    count: items.length,
    getScrollElement: () => content.current,
    estimateSize: () => rowHeight,
    overscan: 2,
    enabled: virtualized
  });
  const renderItem = (item: AsyncItem, style?: React.CSSProperties) => (
    <Combobox.Item
      item={item}
      key={item.value}
      height={rowHeight + 'px'}
      minHeight={rowHeight + 'px'}
      py={0}
      style={style}
    >
      <Combobox.ItemText>
        <OptionLabel item={item} />
      </Combobox.ItemText>
    </Combobox.Item>
  );
  return (
    <Combobox.Root
      collection={collection}
      value={value === null ? [] : [value]}
      width="240px"
      onInputValueChange={event => onQuery(event.inputValue)}
      onValueChange={event => onSelectionChange(event.value[0] ?? null)}
      scrollToIndexFn={
        virtualized
          ? details => flushSync(() => windowing.scrollToIndex(details.index, { align: 'auto' }))
          : undefined
      }
    >
      <Combobox.Control>
        <Combobox.Input aria-label="Items" />
        <Combobox.IndicatorGroup>
          <Combobox.Trigger aria-label="Open items">
            <span aria-hidden>⌄</span>
          </Combobox.Trigger>
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content
            ref={content}
            className="benchmark-popup"
            maxHeight={listHeight + 'px'}
            overflowY="auto"
            padding={0}
          >
            <Combobox.Empty data-bench-empty>No results</Combobox.Empty>
            {virtualized ? (
              <div
                style={{
                  height: windowing.getTotalSize(),
                  flexShrink: 0,
                  width: '100%',
                  position: 'relative'
                }}
              >
                {windowing.getVirtualItems().map(row =>
                  items[row.index]
                    ? renderItem(items[row.index], {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: 'translateY(' + row.start + 'px)'
                      })
                    : null
                )}
              </div>
            ) : (
              items.map(item => renderItem(item))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}
export default function Adapter(props: AsyncAdapterProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Picker {...props} />
    </ChakraProvider>
  );
}
