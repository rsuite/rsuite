# Breadcrumb

Used to display the current page path and quickly return to the history page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

A basic example of breadcrumb navigation.

<!--{include:`basic.md`}-->

### Size

Breadcrumbs are available in different sizes to match your design needs.

<!--{include:`size.md`}-->

### With Icons

Add icons to breadcrumb items for enhanced visual cues.

<!--{include:`icons.md`}-->

### With Background

Add background color to make breadcrumbs stand out on the page.

<!--{include:`background.md`}-->

### Custom separator

Replace the default separator with custom elements or icons.

<!--{include:`separator.md`}-->

### With Expand

Should automatically collapse if there are more than 5 items. Use `maxItems` to set the maximum number of breadcrumbs to display.

<!--{include:`max-items.md`}-->

### Dropdown

Integrate dropdown menus with breadcrumb items for additional navigation options.

<!--{include:`dropdown.md`}-->

### Routing Library

The `Breadcrumb.Item` component can be used with other routing libraries (such as Next.js, React Router) through the `as` prop. See the [Composition Guide](https://rsuitejs.com/guide/composition/#react-router-dom) for details.

<!--{include:`with-router.md`}-->

### Accessibility

WAI-ARIA:https://www.w3.org/TR/wai-aria-practices/#breadcrumb

- `<Breadcrumb` trail is contained within a navigation landmark region.
- The landmark region is labelled via `aria-label` or `aria-labelledby`.
- The link to the current page has `aria-current` set to `page`.

```js
<Breadcrumb aria-label="breadcrumb">
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Item aria-current="page">Breadcrumb</Breadcrumb.Item>
</Breadcrumb>
```

## Props

### `<Breadcrumb>`

| Property    | Type `(Default)`                                  | Description                                                                            |
| ----------- | ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| as          | ElementType `('nav')`                             | Custom element type for the component                                                  |
| classPrefix | string `('breadcrumb')`                           | The prefix of the component CSS class                                                  |
| locale      | [BreadcrumbLocaleType](/guide/i18n/#breadcrumb)   | Define localization settings to display component text in the user's regional language |
| maxItems    | number `(5)`                                      | Set the maximum number of breadcrumbs to display                                       |
| onExpand    | (event: MouseEvent) => void                       | Callback function when the ellipsis is clicked in the collapsed view                   |
| separator   | ReactNode `('/')`                                 | Custom separator between breadcrumb items                                              |
| size        | 'sm' \| 'md' \| 'lg' \| number \| string `('md')` | Set the size of breadcrumb items                                                       |

### `<Breadcrumb.Item>`

| Property    | Type `(Default)`             | Description                                                             |
| ----------- | ---------------------------- | ----------------------------------------------------------------------- |
| active      | boolean                      | Indicates if the breadcrumb item is active                              |
| as          | ElementType `('a')`          | Custom element type for the component. Defaults to 'a' if 'href' is set |
| classPrefix | string `('breadcrumb-item')` | The prefix of the component CSS class                                   |
| href        | string                       | When provided, renders the breadcrumb item as an anchor element         |
| icon        | ReactNode                    | Custom icon to display before the breadcrumb item text                  |
