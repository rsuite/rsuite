# useMediaQuery 🧪

Use useMediaQuery to easily retrieve media dimensions, combined with the component's size property for responsive UI.

> Unstable API, may have breaking changes in future minor versions.

## Usage

```js
import { useMediaQuery } from 'rsuite';

const App = () => {
  const [isMobile, isDark, isLandscape] = useMediaQuery([
    '(max-width: 700px)',
    '(prefers-color-scheme: dark)',
    '(orientation:landscape)'
  ]);

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
};
```

## Examples

### Use with RadioTile

The `RadioTileGroup` component has an `inline` prop that displays each `RadioTile` on the same line. We can combine `useMediaQuery` to create a responsive `RadioTile` component. On large screens, the `RadioTile` component displays on the same line, while on small screens, the `RadioTile` component displays on different lines.

<!--{include:`radio-tile.md`}-->

### Use with Modal

The `Modal` component has a `size` prop that sets the size of the modal. We can use `useMediaQuery` to make the `Modal` component responsive. On large screens, the size of the `Modal` component is fixed, while on small screens, the `Modal` component is full-screen.

<!--{include:`modal.md`}-->

## API

### `useMediaQuery(query) => [...matches]`

```tsx

 const mediaQuerySizeMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1400px)'
};


useMediaQuery(
  string
  | keyof typeof mediaQuerySizeMap
  | (string | keyof typeof mediaQuerySizeMap)[]
) => boolean[]
```
