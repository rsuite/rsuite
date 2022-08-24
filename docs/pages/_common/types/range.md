### `ts:Range`

```ts
interface Range {
  label: React.ReactNode;
  value: Date | ((date: Date) => Date);
  closeOverlay?: boolean;

  // Sets the position where the predefined range is displayed, the default is bottom.
  // Only supported on DateRangePicker。
  placement?: 'bottom' | 'left';
}
```
