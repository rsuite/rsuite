# useMediaQuery 🧪 媒体查询

使用 useMediaQuery 轻松检索媒体尺寸，结合组件的大小属性可以实现响应式 UI 。

> ⚠️ 此 API 仍处于实验阶段，可能会发生变化。

## 导入 Hook

<!--{include:<import-guide>}-->

## 示例

### 响应式的 RadioTile

`RadioTileGroup` 组件有一个 `inline` 属性，让每一个 `RadioTile` 都在同一行显示。我们可以结合 `useMediaQuery` 来实现响应式的 `RadioTile` 组件。
在大屏幕上，`RadioTile` 组件在同一行显示，而在小屏幕上，`RadioTile` 组件在不同行显示。

<!--{include:`radio-tile.md`}-->

### 响应式的 Modal

`Modal` 组件有 `size` 属性，可以设置模态框的大小。我们可以结合 `useMediaQuery` 来实现响应式的 `Modal` 组件。在大屏幕上，`Modal` 组件的大小为固定尺寸，而在小屏幕上，`Modal` 组件的大小为全屏。

<!--{include:`modal.md`}-->

## API

### `useMediaQuery`

```ts
type Query =  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | string

useMediaQuery(query: Query | Query[]) => boolean[]
```
