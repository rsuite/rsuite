### `ts:ListProps`

```ts
interface ListProps {
  /**
   * Size of a item in the direction being windowed.
   */
  itemSize?: number | ((index: number) => number);

  /**
   * Scroll offset for initial render.
   */
  initialScrollOffset?: number;

  /**
   * Called when the items rendered by the list change.
   */
  onItemsRendered?: (props: ListOnItemsRenderedProps) => void;

  /**
   * Called when the list scroll positions changes, as a result of user scrolling or scroll-to method calls.
   */
  onScroll?: (props: ListOnScrollProps) => void;
}
```
