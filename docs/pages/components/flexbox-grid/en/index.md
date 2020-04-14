# FlexboxGrid

Grid layout component implemented via CSS Flexbox, providing 24 grids.

- `<FlexboxGrid>`
- `<FlexboxGrid.Item>`

## Usage

```js
import { FlexboxGrid } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<FlexboxGrid>`

| Property    | Type`(default)`                                                              | Description                           |
| ----------- | ---------------------------------------------------------------------------- | ------------------------------------- |
| align       | enum: 'top' , 'middle' , 'bottom' `('top')`                                  | align                                 |
| classPrefix | string `('flex-box-grid')`                                                   | The prefix of the component CSS class |
| justify     | enum : 'start', 'end', 'center', 'space-around', 'space-between' `('start')` | horizontal arrangement                |

### `<FlexboxGrid.Item>`

| Property       | Type`(default)`                 | Description                                     |
| -------------- | ------------------------------- | ----------------------------------------------- |
| classPrefix    | string `('flex-box-grid-item')` | The prefix of the component CSS class           |
| colspan        | number `(0)`                    | spacing between grids                           |
| order          | number `(0)`                    | grid orders for sorting                         |
| componentClass | React.ElementType `('div')`     | You can use a custom element for this component |
