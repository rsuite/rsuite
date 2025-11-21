# Pagination

Paging navigation, used to assist long lists to load only part of the data, you can quickly switch to the specified data page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

Adjust pagination size with the `size` prop (options: 'xs', 'sm', 'md', 'lg').

<!--{include:`size.md`}-->

### Disabled

Disable pagination controls using the `disabled` prop. You can also pass a function to selectively disable specific pages.

<!--{include:`disabled.md`}-->

### Previous and Next

Show previous and next navigation buttons with the `prev` and `next` props.

<!--{include:`prev-next.md`}-->

### First and Last

Display first and last page navigation buttons using the `first` and `last` props.

<!--{include:`first-last.md`}-->

### Routing Library

Integrate pagination with routing libraries by customizing the `linkAs` and `linkProps` properties.

<!--{include:`with-router.md`}-->

### Custom Layout

Customize the pagination component's structure with the `layout` prop. This prop accepts an array of elements that will be rendered in the specified order. Available elements include:

- `'pager'`: Standard page navigation buttons (default)
- `'total'`: Total entries display area
- `'limit'`: Entries per page selector
- `'skip'`: Quick page jump input
- `'-'`: Flexible spacer (fills remaining space)
- `'|'`: Vertical separator

<!--{include:`advanced.md`}-->

## Props

### `<Pagination>`

| Property      | Type `(Default)`                                        | Description                                                                               |
| ------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| activePage \* | number `(1)`                                            | Current page number                                                                       |
| boundaryLinks | boolean                                                 | Show border paging buttons 1 and pages                                                    |
| classPrefix   | string `('pagination-group')`                           | The prefix of the component CSS class                                                     |
| disabled      | boolean \| (eventKey: number) => boolean                | Disabled component                                                                        |
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
| size          | 'lg' \| 'md' \| 'sm' \| 'xs' `('sm')`                   | The size of the pagination component                                                      |
| total \*      | number                                                  | The total number of rows. Generally obtained through the server                           |

### Type Definitions

#### `ts:LayoutType`

```ts
type LayoutType = 'total' | '-' | 'pager' | '|' | 'limit' | 'skip';
```
