# useMediaQuery 🧪

使用 useMediaQuery 轻松检索媒体尺寸，结合组件的大小属性可以实现响应式 UI 。

> 不稳定的 API，可能会在未来的次要版本中进行重大更改。

## 使用

```js
import { useMediaQuery } from 'rsuite';

const App = () => {
  const isMobile = useMediaQuery('(max-width: 700px)');

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
};
```

## 示例

### 响应式的 RadioTile

`RadioTileGroup` 组件有一个 `inline` 属性，让每一个 `RadioTile` 都在同一行显示。我们可以结合 `useMediaQuery` 来实现响应式的 `RadioTile` 组件。
在大屏幕上，`RadioTile` 组件在同一行显示，而在小屏幕上，`RadioTile` 组件在不同行显示。

<!--{include:`radio-tile.md`}-->

### 响应式的 Modal

`Modal` 组件有 `size` 属性，可以设置模态框的大小。我们可以结合 `useMediaQuery` 来实现响应式的 `Modal` 组件。在大屏幕上，`Modal` 组件的大小为固定尺寸，而在小屏幕上，`Modal` 组件的大小为全屏。

<!--{include:`modal.md`}-->

## API

### `useMediaQuery(query) => matches`

```tsx

 const mediaQuerySizeMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1400px)'
};


useMediaQuery(string | keyof typeof mediaQuerySizeMap) => boolean

```
