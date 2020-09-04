# FlexboxGrid

Grid layout component implemented via CSS Flexbox, providing 24 grids.

## Import

<!--{include:(components/flexbox-grid/fragments/import.md)}-->

## Examples

### Default

 <!--{include:`basic.md`}-->

### Layout

 <!--{include:`justify.md`}-->

### Alignment

 <!--{include:`align.md`}-->

### Order

 <!--{include:`order.md`}-->

### Responsive

Responsiveness can be achieved by combining with the `<Col>` component.

 <!--{include:`responsive.md`}-->

## Props

### `<FlexboxGrid>`

| Property    | Type`(default)`                                                              | Description                                     |
| ----------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| align       | enum: 'top' , 'middle' , 'bottom' `('top')`                                  | align                                           |
| as          | ElementType `('div')`                                                        | You can use a custom element for this component |
| classPrefix | string `('flex-box-grid')`                                                   | The prefix of the component CSS class           |
| justify     | enum : 'start', 'end', 'center', 'space-around', 'space-between' `('start')` | horizontal arrangement                          |

### `<FlexboxGrid.Item>`

| Property    | Type`(default)`                 | Description                                     |
| ----------- | ------------------------------- | ----------------------------------------------- |
| as          | ElementType `('div')`           | You can use a custom element for this component |
| classPrefix | string `('flex-box-grid-item')` | The prefix of the component CSS class           |
| colspan     | number `(0)`                    | spacing between grids                           |
| order       | number `(0)`                    | grid orders for sorting                         |
