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

| Property    | Type `(Default)`                  | Description                                                                       |
| ----------- | --------------------------------- | --------------------------------------------------------------------------------- |
| classPrefix | string `('breadcrumb')`           | The prefix of the component CSS class                                             |
| maxItems    | numner`(5)`                       | Set the maximum number of breadcrumbs to display                                  |
| onExpand    | (event: React.MouseEvent) => void | A function to be called when you are in the collapsed view and click the ellipsis |
| separator   | React.Node `('/')`                | Custom separator                                                                  |

### `<Breadcrumb.Item>`

| Property       | Type `(Default)`                | Description                                     |
| -------------- | ------------------------------- | ----------------------------------------------- |
| active         | boolean                         | Active state                                    |
| componentClass | React.ElementType `('ol')`      | You can use a custom element for this component |
| renderItem     | (item:React.Node) => React.Node | Custom rendering item                           |
