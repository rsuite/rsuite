import {
  ChakraProvider,
  Combobox,
  Portal,
  defaultSystem,
  useListCollection
} from '@chakra-ui/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useRef } from 'react';
import { flushSync } from 'react-dom';
import type { AdapterProps, Item } from '../protocol';
import { listHeight, rowHeight, OptionLabel, contains } from '../shared';

function Picker({ items, virtualized, onSelectionChange }: AdapterProps) {
  const content = useRef<HTMLDivElement>(null);
  const { collection, filter } = useListCollection({ initialItems: items, filter: contains });
  const windowing = useVirtualizer({
    count: collection.size,
    getScrollElement: () => content.current,
    estimateSize: () => rowHeight,
    overscan: 2,
    enabled: virtualized
  });
  const renderItem = (item: Item, style?: React.CSSProperties) => (
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
      width="240px"
      onInputValueChange={e => filter(e.inputValue)}
      onValueChange={e => onSelectionChange(e.value[0] ?? null)}
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
                  renderItem(collection.items[row.index], {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: 'translateY(' + row.start + 'px)'
                  })
                )}
              </div>
            ) : (
              collection.items.map(item => renderItem(item))
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
}
export default function ChakraAdapter(props: AdapterProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Picker {...props} />
    </ChakraProvider>
  );
}
