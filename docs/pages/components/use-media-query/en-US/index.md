# useMediaQuery

Use useMediaQuery to easily retrieve media dimensions, combined with the component's size property for responsive UI.

## Import

<!--{include:<import-guide>}-->

## Examples

### Use with RadioTile

The `RadioTileGroup` component has an `inline` prop that displays each `RadioTile` on the same line. We can combine `useMediaQuery` to create a responsive `RadioTile` component. On large screens, the `RadioTile` component displays on the same line, while on small screens, the `RadioTile` component displays on different lines.

<!--{include:<responsive-radio-tile>}-->

### Use with Modal

The `Modal` component has a `size` prop that sets the size of the modal. We can use `useMediaQuery` to make the `Modal` component responsive. On large screens, the size of the `Modal` component is fixed, while on small screens, the `Modal` component is full-screen.

<!--{include:<responsive-modal>}-->

## API

### `useMediaQuery`

```ts
type Query =  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | string

useMediaQuery(query: Query | Query[]) => boolean[]
```
