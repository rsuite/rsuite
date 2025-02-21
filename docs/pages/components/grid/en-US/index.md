# Grid

A Grid layout component that provides 24 grids, referring to the responsive design of [Bootstrap](https://getbootstrap.com/docs/5.2/layout/grid/#grid-options).

## Import

<!--{include:<import-guide>}-->

- `<Grid>` Define a grid layout.
- `<Row>` Define a row in the grid layout.
- `<Col>` Define a column in the grid layout.

## Examples

### Default

<!--{include:`basic.md`}-->

### Gutter

<!--{include:`gutter.md`}-->

### Offset

<!--{include:`offset.md`}-->

### Push and Pull

<!--{include:`pull-push.md`}-->

### Hidden

<!--{include:`hidden.md`}-->

### Nesting

<!--{include:`nested.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

## Props

### `<Grid>`

| Property | Type `(Default)`      | Description                                          |
| -------- | --------------------- | ---------------------------------------------------- |
| as       | ElementType `('div')` | You can use a custom element type for this component |
| fluid    | boolean               | Fluid layout, (100% width)                           |

### `<Row>`

| Property | Type `(Default)`      | Description                                          |
| -------- | --------------------- | ---------------------------------------------------- |
| as       | ElementType `('div')` | You can use a custom element type for this component |
| gutter   | number                | The spacing of the grids                             |

### `<Col>`

| Property  | Type `(Default)`      | Description                                                                          |
| --------- | --------------------- | ------------------------------------------------------------------------------------ |
| as        | ElementType `('div')` | You can use a custom element type for this component                                 |
| xxl       | number                | The number of columns you wish to span for Extra large devices Desktops (≥ `1400px`) |
| xxlHidden | boolean               | Hide column on Large devices Desktops                                                |
| xxlOffset | number                | Move columns to the right for Medium devices Desktops                                |
| xxlPull   | number                | Change the order of grid columns to the left for Large devices Desktops              |
| xxlPush   | number                | Change the order of grid columns to the right for Large devices Desktops             |
| xl        | number                | The number of columns you wish to span for Extra large devices Desktops (≥ `1200px`) |
| xlHidden  | boolean               | Hide column on Large devices Desktops                                                |
| xlOffset  | number                | Move columns to the right for Medium devices Desktops                                |
| xlPull    | number                | Change the order of grid columns to the left for Large devices Desktops              |
| xlPush    | number                | Change the order of grid columns to the right for Large devices Desktops             |
| lg        | number                | The number of columns you wish to span for Large devices Desktops (≥ `992px`)        |
| lgHidden  | boolean               | Hide column on Large devices Desktops                                                |
| lgOffset  | number                | Move columns to the right for Medium devices Desktops                                |
| lgPull    | number                | Change the order of grid columns to the left for Large devices Desktops              |
| lgPush    | number                | Change the order of grid columns to the right for Large devices Desktops             |
| md        | number                | The number of columns you wish to span for Medium devices Desktops (≥ `768px`)       |
| mdHidden  | boolean               | Hide column on Medium devices Desktops                                               |
| mdOffset  | number                | Move columns to the right for Medium devices Desktops                                |
| mdPull    | number                | Change the order of grid columns to the left for Medium devices Desktops             |
| mdPush    | number                | Change the order of grid columns to the right for Medium devices Desktops            |
| sm        | number                | The number of columns you wish to span for Small devices Tablets (≥ `576px`)         |
| smHidden  | boolean               | Hide column on Small devices Tablets                                                 |
| smOffset  | number                | Move columns to the right for Small devices Tablets                                  |
| smPull    | number                | Change the order of grid columns to the left for Small devices Tablets               |
| smPush    | number                | Change the order of grid columns to the right for Small devices Tablets              |
| xs        | number                | The number of columns you wish to span for Extra small devices Phones (< `576px`)    |
| xsHidden  | boolean               | Hide column on Extra small devices Phones                                            |
| xsOffset  | number                | Move columns to the right for Extra small devices Phones                             |
| xsPull    | number                | Change the order of grid columns to the left for Extra small devices Phones          |
| xsPush    | number                | Change the order of grid columns to the right for Extra small devices Phones         |

#### Corresponds to the screen width

- xxl, extra-large: ≥ `1400px`
- xl, extra-large: ≥ `1200px`
- lg, large: ≥ `992px`
- md, medium: ≥ `768px`
- sm, small: ≥ `576px`
- xs, extra-small: < `576px`
