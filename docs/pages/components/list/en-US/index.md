# List

The List component is used to display a group of data, suitable for presenting list-like content, and supports drag-and-drop sorting.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`default.md`}-->

### Size

<!--{include:`size.md`}-->

### Border

<!--{include:`bordered.md`}-->

### Hover

<!--{include:`hover.md`}-->

### Sortable

`index` of List.Item is required.

<!--{include:`sortable.md`}-->

### Collection Sort

Each `collection` is independent, `index` of List.Item is required. (be unique in the collection)

<!--{include:`collection.md`}-->

### Fixed Item Sort

Based on `Collection Sort`, the items in the list are fixed in position during sorting.

<!--{include:`sort-fixed.md`}-->

### List with Custom Item

<!--{include:`custom.md`}-->

### No Divider

<!--{include:`no-divider.md`}-->

## Props

### `<List>`

| Property           | Type `(Default)`                                   | Description                                               |
| ------------------ | -------------------------------------------------- | --------------------------------------------------------- |
| autoScroll         | boolean `(true)`                                   | Enables automatic scrolling when the list overflows       |
| bordered           | boolean                                            | Displays borders around the list items                    |
| divider            | boolean                                            | Displays a divider between the list items<br/>![][5.75.0] |
| hover              | boolean                                            | Enables hover animation on list items                     |
| onSort             | (payload:[Payload](#code-ts-payload-code)) => void | Callback triggered when sorting ends                      |
| onSortEnd          | (payload:[Payload](#code-ts-payload-code)) => void | Callback triggered after the sorting operation ends       |
| onSortMove         | (payload:[Payload](#code-ts-payload-code)) => void | Callback triggered when an item is moved in the list      |
| onSortStart        | (payload:[Payload](#code-ts-payload-code)) => void | Callback triggered at the start of sorting                |
| pressDelay         | number `(0)`                                       | Delay before sorting is triggered after pressing          |
| size               | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `(md)`    | Defines the size of the list items                        |
| sortable           | boolean                                            | Enables sorting functionality for the list items          |
| transitionDuration | number `(300)`                                     | Duration (in milliseconds) of the sort animation          |

### `<List.Item>`

| Property   | Type `(Default)`                                | Description                                                              |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| collection | number &#124; string `(0)`                      | The collection identifier for the list item                              |
| disabled   | boolean                                         | Disables the item, preventing it from being moved                        |
| index \*   | number                                          | The unique index of the item within its collection, required for sorting |
| size       | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `(md)` | Defines the size of the individual list item                             |

### `ts:Payload`

```ts
interface Payload {
  collection: number | string;
  node: HTMLElement;
  newIndex: number;
  oldIndex: number;
}
```

[5.75.0]: https://img.shields.io/badge/>=-v5.75.0-blue
