# List

display a list

* `<List>` list
* `<List.Item>` list item

## Usage

```js
import { List } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<List>`

| Property    | Type `(Default)`                         | Description              |
| ----------- | ---------------------------------------- | ----------------- |
| bordered           | boolean                                  | bordered        |
| hover              | boolean                                  | hover animation   |
| sortable           | boolean                                  | can change list item order  |
| size               | enums: 'lg','md','sm'  `md`              | list items size            |
| autoScroll         | boolean  `true`                          | auto scroll when overflow    |
| pressDelay         | number `0`                               | delay before trigger sort        |
| transitionDuration | number `300`                             | duration of sort animation   |
| onSortStart        | (payload:{ collection: number/string, node:HTMLElement, newIndex: number, oldIndex: number }) => void | callback of beginning of sorting        |
| onSortMove         | (payload:{ collection: number/string, node:HTMLElement, newIndex: number, oldIndex: number }) => void | callback of moving over a list items       |
| onSortEnd          | (payload:{ collection: number/string, node:HTMLElement, newIndex: number, oldIndex: number }) => void | callback of end of sorting        |
| onSort             | (payload:{ collection: number/string, node:HTMLElement, newIndex: number, oldIndex: number }) => void | callback of end of sorting        |

### `<List.Item>`

| Property      | Type `(Default)`                                 | Description                      |
| ------------- | ------------------------------------------------ | ---------------------------------- |
| index        | number(required when sortable)                    | index of item(must be unique in the collection)        |
| collection   | number/string `0`                               | collection of list item                     |
| disabled     | boolean                                         | not allowed to move this item         |
