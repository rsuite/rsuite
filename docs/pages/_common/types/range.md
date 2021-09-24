```ts
interface Range {
  label: React.ReactNode;
  value: Date | ((date: Date) => Date);
  closeOverlay?: boolean;
}
```
