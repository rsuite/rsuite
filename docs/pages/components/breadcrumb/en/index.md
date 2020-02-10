# Breadcrumb

Used to display the current page path and quickly return to the history page.

- `<Breadcrumb>`
- `<Breadcrumb.Item>`

## Usage

```js
import { Breadcrumb } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Breadcrumb>`

| Property    | Type `(Default)`                                       | Description                           |
| ----------- | ------------------------------------------------------ | ------------------------------------- |
| classPrefix | string `('breadcrumb')`                                | The prefix of the component CSS class |
| separator   | React.Node `(<i className="icon icon-angle-right" />)` | Custom separator                      |

### `<Breadcrumb.Item>`

| Property       | Type `(Default)`              | Description                                     |
| -------------- | ----------------------------- | ----------------------------------------------- |
| active         | boolean                       | Active state                                    |
| componentClass | React.ElementType `('ol')`    | You can use a custom element for this component |
| renderItem     | (item:React.Node)=>React.Node | Custom rendering item                           |
