### `ts:Range`

```ts
interface Range {
  label: ReactNode;
  value: Date | ((date: Date) => Date);
  closeOverlay?: boolean;

  // Sets the position where the predefined range is displayed, the default is bottom.
  placement?: 'bottom' | 'left';
}
```
