# Breadcrumb

Used to display the current page path and quickly return to the history page.

## Import

<!--{include:(components/breadcrumb/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Custom separator

<!--{include:`separator.md`}-->

### With Expand

Should automatically collapse if there are more than 5 items. Use `maxItems` to set the maximum number of breadcrumbs to display.

<!--{include:`max-items.md`}-->

### Used with `Link` in `next/link`

<!--{include:`with-router.md`}-->

## Props

### `<Breadcrumb>`

| Property    | Type `(Default)`            | Description                                                                       |
| ----------- | --------------------------- | --------------------------------------------------------------------------------- |
| as          | ElementType `('nav')`       | You can use a custom element type for this component.                             |
| classPrefix | string `('breadcrumb')`     | The prefix of the component CSS class                                             |
| maxItems    | numner`(5)`                 | Set the maximum number of breadcrumbs to display                                  |
| onExpand    | (event: MouseEvent) => void | A function to be called when you are in the collapsed view and click the ellipsis |
| separator   | ReactNode `('/')`           | Custom separator                                                                  |

### `<Breadcrumb.Item>`

| Property   | Type `(Default)`              | Description                                           |
| ---------- | ----------------------------- | ----------------------------------------------------- |
| active     | boolean                       | Active state                                          |
| as         | ElementType `('a')`           | You can use a custom element type for this component. |
| renderItem | (item:ReactNode) => ReactNode | Custom rendering item                                 |
