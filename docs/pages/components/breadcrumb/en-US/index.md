# Breadcrumb

Used to display the current page path and quickly return to the history page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Custom separator

<!--{include:`separator.md`}-->

### With Expand

Should automatically collapse if there are more than 5 items. Use `maxItems` to set the maximum number of breadcrumbs to display.

<!--{include:`max-items.md`}-->

### Used with `Link` in `next/link`

<!--{include:`with-router.md`}-->

> [ Used with `Link` in React Router](/guide/composition/#react-router-dom)

### Accessibility

WAI-ARIA:https://www.w3.org/TR/wai-aria-practices/#breadcrumb

- `<Breadcrumb` trail is contained within a navigation landmark region.
- The landmark region is labelled via `aria-label` or `aria-labelledby`.

```js
<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
</Breadcrumb>
```

- The link to the current page has `aria-current` set to `page`.

```js
<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Item aria-current="page" href="/components/breadcrumb">
    Breadcrumb
  </Breadcrumb.Item>
</Breadcrumb>
```

## Props

### `<Breadcrumb>`

| Property    | Type `(Default)`                                | Description                                                                         |
| ----------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| as          | ElementType `('nav')`                           | You can use a custom element type for this component.                               |
| classPrefix | string `('breadcrumb')`                         | The prefix of the component CSS class                                               |
| locale      | [BreadcrumbLocaleType](/guide/i18n/#breadcrumb) | Define localization settings to show component text in the user's regional language |
| maxItems    | numner`(5)`                                     | Set the maximum number of breadcrumbs to display                                    |
| onExpand    | (event: MouseEvent) => void                     | A function to be called when you are in the collapsed view and click the ellipsis   |
| separator   | ReactNode `('/')`                               | Custom separator                                                                    |

### `<Breadcrumb.Item>`

| Property    | Type `(Default)`             | Description                                                                                                                                       |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| active      | boolean                      | Active state                                                                                                                                      |
| as          | ElementType `('a')`          | You can use a custom element type for this component.. The default is a `span` element, and when `href` is set, it will default to an `a` element |
| classPrefix | string `('breadcrumb-item')` | The prefix of the component CSS class                                                                                                             |
| href        | string                       | Providing a `href` will render an `a` element                                                                                                     |
