# Pagination

Paging navigation, used to assist long lists to load only part of the data, you can quickly switch to the specified data page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Used with Link in next/link

<!--{include:`with-router.md`}-->

### Advanced

The `layout` prop can customize the layout of a paging component. It receives an array parameter and renders according to the order of the values in the array. The default value of `layout` is `['pager']`, and the optional values include: `total` (total entry input area), `pager` (page area), `limit` (entry option area), `skip` (quick jump page area), `-` (area placeholder, fill up the remaining space) , `|` (vertical separator).

<!--{include:`advanced.md`}-->

## Props

### `<Pagination>`

| Property      | Type `(Default)`                                        | Description                                                                               |
| ------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| activePage \* | number `(1)`                                            | Current page number                                                                       |
| boundaryLinks | boolean                                                 | Show border paging buttons 1 and pages                                                    |
| classPrefix   | string `('pagination-group')`                           | The prefix of the component CSS class                                                     |
| disabled      | boolean &#124; (eventKey: number) => boolean            | Disabled component                                                                        |
| ellipsis      | boolean                                                 | Displays the ellipsis                                                                     |
| first         | boolean                                                 | Displays the first page                                                                   |
| last          | boolean                                                 | Displays the last page                                                                    |
| layout        | [LayoutType](#code-ts-layout-type-code)[] `(['pager'])` | Customize the layout of a paging component                                                |
| limit         | number `(30)`                                           | The number of rows per page.Will use `total` and `limit` to calculate the number of pages |
| limitOptions  | number[] `([30,50,100])`                                | Customizes the options of the rows per page select field.                                 |
| linkAs        | ElementType `(button)`                                  | Customizes the element type for the component                                             |
| linkProps     | object                                                  | Additional props passed as-is to the underlying link for non-active items                 |
| locale        | [PaginationLocale](/guide/i18n/#pagination)             | Define localization settings to show component text in the user's regional language       |
| maxButtons    | number                                                  | Page buttons display the maximum number of                                                |
| next          | boolean                                                 | Displays the next page                                                                    |
| onChangeLimit | (limit:number) => void;                                 | Callback fired when the number of rows per page is changed                                |
| onChangePage  | (page:number) => void;                                  | Callback fired when the page is changed                                                   |
| prev          | boolean                                                 | Displays the previous page                                                                |
| total \*      | number                                                  | The total number of rows. Generally obtained through the server                           |

### `ts:LayoutType`

```ts
type LayoutType = 'total' | '-' | 'pager' | '|' | 'limit' | 'skip';
```
