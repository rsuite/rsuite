# useBreakpointValue

A React Hook that returns different values based on different screen sizes in responsive design.

## Import

<!--{include:<import-guide>}-->

## Examples

### Responsive avatar size

<!--{include:<responsive-avatar>}-->

### Responsive stack direction

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
