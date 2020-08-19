# Breadcrumb

Used to display the current page path and quickly return to the history page.

## Import

```js
import { Breadcrumb } from 'rsuite';

//or
import Breadcrumb from 'rsuite/lib/Breadcrumb';
```

## Examples

<!--{demo}-->

## Props

### `<Breadcrumb>`

| Property    | Type `(Default)`            | Description                                                                       |
| ----------- | --------------------------- | --------------------------------------------------------------------------------- |
| as          | elementType `('nav')`       | You can use a custom element type for this component.                             |
| classPrefix | string `('breadcrumb')`     | The prefix of the component CSS class                                             |
| maxItems    | numner`(5)`                 | Set the maximum number of breadcrumbs to display                                  |
| onExpand    | (event: MouseEvent) => void | A function to be called when you are in the collapsed view and click the ellipsis |
| separator   | ReactNode `('/')`           | Custom separator                                                                  |

### `<Breadcrumb.Item>`

| Property   | Type `(Default)`              | Description                                           |
| ---------- | ----------------------------- | ----------------------------------------------------- |
| active     | boolean                       | Active state                                          |
| as         | elementType `('a')`           | You can use a custom element type for this component. |
| renderItem | (item:ReactNode) => ReactNode | Custom rendering item                                 |
