# Grid

The Grid component provides a flexible system for creating responsive layouts using a 24-column grid. It is inspired by Bootstrap's grid system and offers similar responsive capabilities.

## Import

<!--{include:<import-guide>}-->

- `Grid` is the container component that defines the grid system.
- `Row` creates horizontal rows that contain columns.
- `Col` creates vertical columns that contain actual content.

## Examples

### Grid System

<!--{include:`basic.md`}-->

### Gutter

Adjust the grid spacing by setting the `gutter` property on `Row`. The gutter creates horizontal spacing between columns while maintaining the grid's alignment.

<!--{include:`gutter.md`}-->

### Offset

Move columns to the right using the `offset` property. For example, `offset={4}` moves an element by 4 columns to the right. This is useful for creating gaps or centering content within the grid.

<!--{include:`offset.md`}-->

### Multiple Rows

If the total of column `span` and `offset` exceeds the columns prop (default is 12), the columns will wrap to the next row.

<!--{include:`multiple-rows.md`}-->

### Push and Pull

Change the order of columns using `push` and `pull`. This allows you to visually reorder columns without changing their order in the DOM, which is particularly useful for responsive layouts.

<!--{include:`pull-push.md`}-->

### Auto sized columns

When `span="auto"` is set, the column width will automatically adjust based on its content. This is useful when you want columns to size themselves according to their content rather than the grid system.

<!--{include:`auto.md`}-->

### Hidden

The object syntax provides a `hidden` property to control display and hiding at different screen sizes. Use this feature to create responsive layouts where columns appear or disappear based on the viewport size.

<!--{include:`hidden.md`}-->

### Nesting

The grid system supports unlimited nesting. You can place rows inside columns to create more complex and flexible layouts while maintaining the same 24-column system at each level.

<!--{include:`nested.md`}-->

### Justify and align

Control both horizontal (`justify`) and vertical (`align`) alignment of columns within a row. This provides precise control over how content is positioned in your layout.

<!--{include:`justify-align.md`}-->

### Order

Use the `order` property to control the visual order of columns regardless of their DOM position. This is particularly useful for creating responsive layouts where content order needs to change across different screen sizes.

<!--{include:`order.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

## Props

### `<Grid>`

| Property | Type`(Default)`       | Description                                     |
| -------- | --------------------- | ----------------------------------------------- |
| as       | ElementType `('div')` | You can use a custom element for this component |
| fluid    | boolean               | Fluid layout, (100% width)                      |

### `<Row>`

| Property    | Type`(Default)`                                                                                    | Description                                         |
| ----------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| align       | 'top' \| 'middle' \| 'bottom' \| [ResponsiveValue][responsive]                                     | Vertical alignment. Supports responsive values      |
| as          | ElementType`('div')`                                                                               | You can use a custom element for this component     |
| classPrefix | string `('row')`                                                                                   | The prefix of the component CSS class               |
| gutter      | number \| string \| [ResponsiveValue][responsive]                                                  | Grid spacing. Supports responsive values            |
| justify     | 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| [ResponsiveValue][responsive] | Horizontal distribution. Supports responsive values |

### `<Col>`

| Property    | Type`(Default)`                                   | Description                                                                               |
| ----------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| as          | ElementType`('div')`                              | You can use a custom element for this component                                           |
| classPrefix | string `('col')`                                  | The prefix of the component CSS class                                                     |
| hidden      | boolean \| [ResponsiveValue][responsive]          | Whether to hide the grid                                                                  |
| offset      | number \| [ResponsiveValue][responsive]           | Number of grids on the left side                                                          |
| order       | number \| [ResponsiveValue][responsive]           | The order of grid columns                                                                 |
| pull        | number \| [ResponsiveValue][responsive]           | Number of grids to move left                                                              |
| push        | number \| [ResponsiveValue][responsive]           | Number of grids to move right                                                             |
| span        | number \| 'auto' \| [ResponsiveValue][responsive] | Number of grids. When set to 'auto', the width will adjust automatically based on content |

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

[responsive]: #code-ts-responsive-value-code
