# useBreakpointValue 🧪

一个 React Hook，根据响应式设计中不同的屏幕尺寸返回不同的值。

> ⚠️ 此 API 仍处于实验阶段，可能会发生变化。

## 导入 Hook

<!--{include:<import-guide>}-->

## 示例

### 响应式的改变头像大小

<!--{include:`basic.md`}-->

### 响应式的改变堆栈方向

<!--{include:`stack.md`}-->

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
