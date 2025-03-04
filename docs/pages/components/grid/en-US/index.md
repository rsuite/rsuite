# Grid

The Grid component provides a flexible system for creating responsive layouts using a 24-column grid. It is inspired by Bootstrap's grid system and offers similar responsive capabilities.

## Import

<!--{include:<import-guide>}-->

- `Grid` is the container component that defines the grid system.
- `Row` creates horizontal rows that contain columns.
- `Col` creates vertical columns that contain actual content.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Gutter

<!--{include:`gutter.md`}-->

### Offset

<!--{include:`offset.md`}-->

### Multiple Rows

<!--{include:`multiple-rows.md`}-->

### Push and Pull

<!--{include:`pull-push.md`}-->

### Auto Width

<!--{include:`auto.md`}-->

### Hidden

<!--{include:`hidden.md`}-->

### Nesting

<!--{include:`nested.md`}-->

### Alignment

<!--{include:`justify-align.md`}-->

### Order

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
| order       | number \| [ResponsiveValue][responsive]           | The order of grid columns                                                                |
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
