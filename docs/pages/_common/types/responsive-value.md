### `ts:ResponsiveValue`

```ts
type ResponsiveValue<T> = {
  xs?: T; // Extra small devices (portrait phones, <576px)
  sm?: T; // Small devices (landscape phones, ≥576px)
  md?: T; // Medium devices (tablets, ≥768px)
  lg?: T; // Large devices (desktops, ≥992px)
  xl?: T; // Extra large devices (large desktops, ≥1200px)
  xxl?: T; // Extra extra large devices (larger desktops, ≥1400px)
};
```
