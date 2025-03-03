# Grid

Grid provides a flexible system for creating responsive layouts using a 24-column grid. It's inspired by Bootstrap's grid system and offers similar responsive capabilities.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic Layout

Create a set of `Col` components horizontally through `Row`, with a maximum width of 24.

<!--{include:`basic.md`}-->

### Grid Gutter

Adjust the grid spacing by setting the `gutter` property on `Row`.

<!--{include:`gutter.md`}-->

### Offset

Move columns to the right using the `offset` property. For example, `offset={4}` moves an element by 4 columns to the right.

<!--{include:`offset.md`}-->

### Grid Order

Change the order of columns using `push` and `pull`.

<!--{include:`pull-push.md`}-->

### Responsive Hidden

The object syntax provides a `hidden` property to control display and hiding at different screen sizes.

<!--{include:`hidden.md`}-->

### Nested

The grid system supports unlimited nesting.

<!--{include:`nested.md`}-->

### Responsive

<!--{include:<example-responsive>}-->

## Props

### `<Grid>`

| Property    | Type `(Default)`  | Description                           |
| ----------- | ----------------- | ------------------------------------- |
| as          | ElementType       | Custom element type                   |
| fluid       | boolean           | Fluid layout                          |
| classPrefix | string `('grid')` | The prefix of the component CSS class |

### `<Row>`

| Property    | Type `(Default)` | Description                           |
| ----------- | ---------------- | ------------------------------------- |
| as          | ElementType      | Custom element type                   |
| classPrefix | string `('row')` | The prefix of the component CSS class |
| gutter      | number           | Grid spacing                          |

### `<Col>`

| Property    | Type                          | Description                                                                       |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------- |
| as          | ElementType                   | Custom element type                                                               |
| classPrefix | string                        | The prefix of the component CSS class                                             |
| xs          | number \| [ColConfig][config] | Number of columns or configuration object for extra small screens (<576px)        |
| sm          | number \| [ColConfig][config] | Number of columns or configuration object for small screens (≥576px)              |
| md          | number \| [ColConfig][config] | Number of columns or configuration object for medium screens (≥768px)             |
| lg          | number \| [ColConfig][config] | Number of columns or configuration object for large screens (≥992px)              |
| xl          | number \| [ColConfig][config] | Number of columns or configuration object for extra large screens (≥1200px)       |
| xxl         | number \| [ColConfig][config] | Number of columns or configuration object for extra extra large screens (≥1400px) |

[config]: #code-ts-col-config-code

### `ts:ColConfig`

```ts
interface ColConfig {
  span?: number; // Number of grid columns to span
  offset?: number; // Number of grid columns to offset from the left
  push?: number; // Number of grid columns to push to the right
  pull?: number; // Number of grid columns to pull to the left
  hidden?: boolean; // Whether to hide the grid
}
```
