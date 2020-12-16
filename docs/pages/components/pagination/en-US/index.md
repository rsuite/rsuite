# Pagination

Paging navigation, used to assist long lists to load only part of the data, you can quickly switch to the specified data page.

## Import

<!--{include:(components/pagination/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Advanced

<!--{include:`advanced.md`}-->

## Props

### `<Pagination>`

| Property      | Type `(Default)`                              | Description                                                               |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| activePage \* | number `(1)`                                  | Current page number                                                       |
| boundaryLinks | boolean                                       | Show border paging buttons 1 and pages                                    |
| classPrefix   | string `('pagination')`                       | The prefix of the component CSS class                                     |
| disabled      | boolean &#124; (eventKey: number) => boolean  | Disabled component                                                        |
| ellipsis      | boolean                                       | Displays the ellipsis                                                     |
| first         | boolean                                       | Displays the first page                                                   |
| last          | boolean                                       | Displays the last page                                                    |
| linkAs        | ElementType `(a)`                             | Customizes the element type for the component                             |
| linkProps     | object                                        | Additional props passed as-is to the underlying link for non-active items |
| maxButtons    | number `(0)`                                  | Page buttons display the maximum number of                                |
| next          | boolean                                       | Displays the next page                                                    |
| onSelect      | (eventKey:number, event: MouseEvent) => void; | Callback fired when the page is changed                                   |
| pages \*      | number `(1)`                                  | Total pages                                                               |
| prev          | boolean                                       | Displays the previous page                                                |
