# useBreakpointValue

一个 React Hook，根据响应式设计中不同的屏幕尺寸返回不同的值。

## 导入 Hook

<!--{include:<import-guide>}-->

## 示例

### 响应式的改变头像大小

<!--{include:<responsive-avatar>}-->

### 响应式的改变堆栈方向

<!--{include:<responsive-stack>}-->

## API

### `useBreakpointValue`

```ts
function useBreakpointValue<T>(
  mediaQueries: Record<string | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', T>,
  options?: {
    defaultValue?: T;
  }
): T;
```
