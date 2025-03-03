# Grid

Grid provides a flexible system for creating responsive layouts using a 24-column grid. It's inspired by Bootstrap's grid system and offers similar responsive capabilities.

## Import

<!--{include:<import-guide>}-->

- `Grid` is the container component for defining a grid system.
- `Row` is the component responsible for creating a horizontal row that contains `Col` components.
- `Col` is the component responsible for creating a vertical column that is the actual content container.

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

### Justify and align

<!--{include:`justify-align.md`}-->

### Order

<!--{include:`order.md`}-->

### Responsive

<!--{include:<example-responsive>}-->

## Props

### `<Grid>`

| Property    | Type `(Default)`  | Description                           |
| ----------- | ----------------- | ------------------------------------- |
| as          | ElementType       | Custom element type                   |
| classPrefix | string `('grid')` | The prefix of the component CSS class |
| fluid       | boolean           | Fluid layout                          |

### `<Row>`

| Property    | Type `(Default)`                                                                                   | Description                                                   |
| ----------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| align       | 'top' \| 'middle' \| 'bottom' \| [ResponsiveValue][responsive]                                     | Vertical alignment of columns. Support responsive values      |
| as          | ElementType                                                                                        | Custom element type                                           |
| classPrefix | string `('row')`                                                                                   | The prefix of the component CSS class                         |
| gutter      | number \| string \| [ResponsiveValue][responsive]                                                  | Grid spacing between columns. Support responsive values       |
| justify     | 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| [ResponsiveValue][responsive] | Horizontal distribution of columns. Support responsive values |

### `<Col>`

| Property    | Type `(Default)`                         | Description                                    |
| ----------- | ---------------------------------------- | ---------------------------------------------- |
| as          | ElementType                              | Custom element type                            |
| classPrefix | string `('col')`                         | The prefix of the component CSS class          |
| hidden      | boolean \| [ResponsiveValue][responsive] | Whether to hide the grid                       |
| offset      | number \| [ResponsiveValue][responsive]  | Number of grid columns to offset from the left |
| order       | number \| [ResponsiveValue][responsive]  | Order of grid columns                          |
| pull        | number \| [ResponsiveValue][responsive]  | Number of grid columns to pull to the left     |
| push        | number \| [ResponsiveValue][responsive]  | Number of grid columns to push to the right    |
| span        | number \| [ResponsiveValue][responsive]  | Number of grid columns to span                 |

### `ts:ResponsiveValue`

```ts
type ResponsiveValue<T> = {
  xs?: T; // Extra small screens (<576px)
  sm?: T; // Small screens (≥576px)
  md?: T; // Medium screens (≥768px)
  lg?: T; // Large screens (≥992px)
  xl?: T; // Extra large screens (≥1200px)
  xxl?: T; // Extra extra large screens (≥1400px)
};
```

[responsive]: #code-ts-responsive-value-code
