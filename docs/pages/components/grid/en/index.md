# Grid

A Grid layout component that provides 24 grids, referring to the response design of [Bootstrap](https://getbootstrap.com/docs/3.3/css/).

Contains the following components:

* `<Grid>`
* `<Row>`
* `<Col>`

Corresponds to the screen width:


* xs, extra-small: < `480px`
* sm, small: ≥ `480px`
* md, medium: ≥ `992px`
* lg, large: ≥ `1200px`

## Usage

```js
import { Grid, Row, Col } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Grid>`

| Property       | Type `(Default)`            | Description                                          |
| -------------- | --------------------------- | ---------------------------------------------------- |
| componentClass | React.ElementType `('div')` | You can use a custom element type for this component |
| fluid          | boolean                     | Fluid layout, (100% width)                           |

### `<Row>`

| Property       | Type `(Default)`            | Description                                          |
| -------------- | --------------------------- | ---------------------------------------------------- |
| componentClass | React.ElementType `('div')` | You can use a custom element type for this component |
| gutter         | number                      | The spacing of the grids                             |

### `<Col>`

| Property       | Type `(Default)`            | Description                                                                       |
| -------------- | --------------------------- | --------------------------------------------------------------------------------- |
| componentClass | React.ElementType `('div')` | You can use a custom element type for this component                              |
| lg             | number                      | The number of columns you wish to span for Large devices Desktops (≥ `1200px`)    |
| lgHidden       | boolean                     | Hide column on Large devices Desktops                                             |
| lgOffset       | number                      | Move columns to the right for Medium devices Desktops                             |
| lgPull         | number                      | Change the order of grid columns to the left for Large devices Desktops           |
| lgPush         | number                      | Change the order of grid columns to the right for Large devices Desktops          |
| md             | number                      | The number of columns you wish to span for Medium devices Desktops (≥ `992px`)    |
| mdHidden       | boolean                     | Hide column on Medium devices Desktops                                            |
| mdOffset       | number                      | Move columns to the right for Medium devices Desktops                             |
| mdPull         | number                      | Change the order of grid columns to the left for Medium devices Desktops          |
| mdPush         | number                      | Change the order of grid columns to the right for Medium devices Desktops         |
| sm             | number                      | The number of columns you wish to span for Small devices Tablets (≥ `480px`)      |
| smHidden       | boolean                     | Hide column on Small devices Tablets                                              |
| smOffset       | number                      | Move columns to the right for Small devices Tablets                               |
| smPull         | number                      | Change the order of grid columns to the left for Small devices Tablets            |
| smPush         | number                      | Change the order of grid columns to the right for Small devices Tablets           |
| xs             | number                      | The number of columns you wish to span for Extra small devices Phones (< `480px`) |
| xsHidden       | boolean                     | Hide column on Extra small devices Phones                                         |
| xsOffset       | number                      | Move columns to the right for Extra small devices Phones                          |
| xsPull         | number                      | Change the order of grid columns to the left for Extra small devices Phones       |
| xsPush         | number                      | Change the order of grid columns to the right for Extra small devices Phones      |
