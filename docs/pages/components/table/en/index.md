# Table

A table displays rows of data.

- `<Table>` Table component
- `<Table.Column>` Table definition column component
- `<Table.HeaderCell>` Column Header cell component
- `<Table.Cell>` Cell component
- `<Table.Pagination>` Table paging component

## Usage

```js
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;
```

## Examples

<!--{demo}-->

## Props

### `<Table>`

| Property                 | Type `(Default)`                                                                  | Description                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| affixHeader              | boolean,number                                                                    | Affix the table header to the specified location on the page                                  |
| affixHorizontalScrollbar | boolean,number                                                                    | Affix the table horizontal scrollbar to the specified position on the page                    |
| autoHeight               | boolean                                                                           | Automatic height                                                                              |
| bodyRef                  | React.Ref                                                                         | A ref attached to the table body element                                                      |
| bordered                 | boolean                                                                           | Show border                                                                                   |
| cellBordered             | boolean                                                                           | Show cell border                                                                              |
| data \*                  | Array&lt;Object&gt;                                                               | Table data                                                                                    |
| defaultExpandAllRows     | boolean                                                                           | Expand all nodes By default                                                                   |
| defaultExpandedRowKeys   | string[]                                                                          | Specify the default expanded row by `rowkey`                                                  |
| defaultSortType          | enum: 'desc', 'asc'                                                               | Sort type                                                                                     |
| expandedRowKeys          | string[]                                                                          | Specify the default expanded row by `rowkey` (Controlled)                                     |
| headerHeight             | number`(40)`                                                                      | Table Header Height                                                                           |
| height                   | number`(200)`                                                                     | Table height                                                                                  |
| hover                    | boolean `(true)`                                                                  | The row of the table has a mouseover effect                                                   |
| isTree                   | boolean                                                                           | Show as Tree table                                                                            |
| loading                  | boolean                                                                           | Show loading                                                                                  |
| minHeight                | number `(0)`                                                                      | Minimum height                                                                                |
| onDataUpdated            | (nextData: object[], scrollTo: (coord: { x: number; y: number }) => void) => void | Callback after table data update.                                                             |
| onExpandChange           | (expanded:boolean, rowData:object) => void                                        | Tree table, the callback function in the expanded node                                        |
| onRowClick               | (rowData:object) => void                                                          | Click the callback function after the row and return to `rowDate`                             |
| onScroll                 | (scrollX:object, scrollY:object) => void                                          | Callback function for scroll bar scrolling                                                    |
| onSortColumn             | (dataKey:string, sortType:string) => void                                         | Click the callback function of the sort sequence to return the value `sortColumn`, `sortType` |
| renderEmpty              | (info: React.Node) => React.Node                                                  | Customized data is empty display content                                                      |
| renderLoading            | (loading: React.Node) => React.Node                                               | Customize the display content in the data load                                                |
| renderRowExpanded        | (rowDate?: Object) => React.Node                                                  | Customize what you can do to expand a zone                                                    |
| renderTreeToggle         | (icon:node, rowData:object, expanded:boolean) => node                             | Tree table, the callback function in the expanded node                                        |
| rowClassName             | string , (rowData:object) => string                                               | Add an optional extra class name to row                                                       |
| rowExpandedHeight        | number `(100)`                                                                    | Set the height of an expandable area                                                          |
| rowHeight                | (rowData:object) => number, number`(46)`                                          | Row height                                                                                    |
| rowKey                   | string `('key')`                                                                  | Each row corresponds to the unique `key` in `data`                                            |
| shouldUpdateScroll       | boolean`(true)`                                                                   | Whether to update the scroll bar after data update                                            |
| showHeader               | boolean `(true)`                                                                  | Display header                                                                                |
| sortColumn               | string                                                                            | Sort column name                                                                              |
| sortType                 | enum: 'desc', 'asc'                                                               | Sort type (Controlled)                                                                        |
| virtualized              | boolean                                                                           | Effectively render large tabular data                                                         |
| width                    | number                                                                            | Table width                                                                                   |
| wordWrap                 | boolean                                                                           | The cell wraps automatically                                                                  |

### Form methods

- scrollTop

垂直滚动条滚动到指定位置

```ts
scrollTop: (top: number) => void;
```

- scrollLeft

横向滚动条滚动到指定位置

```ts
scrollLeft: (left: number) => void;
```

### `<Table.Column>`

| Property      | Type `(Default)`                                 | Description                                                                                                 |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| align         | enum: 'left','center','right'                    | Alignment                                                                                                   |
| colSpan       | number                                           | Merges column cells to merge when the `dataKey` value for the merged column is `null` or `undefined`.       |
| fixed         | boolean, 'left', 'right'                         | Fixed column                                                                                                |
| flexGrow      | number                                           | Set the column width automatically adjusts, when set `flexGrow` cannot set `resizable` and `width` property |
| minWidth      | number`(200)`                                    | When you use `flexGrow`, you can set a minimum width by `minwidth`                                          |
| onResize      | (columnWidth?: number, dataKey?: string) => void | Callback after column width change                                                                          |
| resizable     | boolean                                          | Customizable Resize Column width                                                                            |
| sortable      | boolean                                          | Sortable                                                                                                    |
| treeCol       | boolean                                          | A column of a tree.                                                                                         |
| verticalAlign | enum: 'top', 'middle', 'bottom'                  | Vertical alignment                                                                                          |
| width         | number                                           | Column width                                                                                                |

> `sortable` is used to define whether the column is sortable, but depending on what `key` sort needs to set a `dataKey` in `Cell`.
> The sort here is the service-side sort, so you need to handle the logic in the ' Onsortcolumn ' callback function of `<Table>`, and the callback function returns `sortColumn`, `sortType` values.

### `<Table.ColumnGroup>`

| Property      | Type `(Default)`                | Description        |
| ------------- | ------------------------------- | ------------------ |
| align         | enum: 'left','center','right'   | Alignment          |
| fixed         | boolean, 'left', 'right'        | Fixed column group |
| verticalAlign | enum: 'top', 'middle', 'bottom' | Vertical alignment |
| header        | React.ReactNode                 | Group header       |

### `<Table.Cell>`

| Property | Type `(Default)` | Description                                  |
| -------- | ---------------- | -------------------------------------------- |
| dataKey  | string           | Data binding `key`, but also a sort of `key` |
| rowData  | object           | Row data                                     |
| rowIndex | number           | Row number                                   |

### `<Table.Pagination>`

| Property         | Type `(Default)`                                  | Description                                                                            |
| ---------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| activePage       | number `(1)`                                      | Configure the current page number                                                      |
| disabled         | boolean , (eventKey: any) => boolean              | Disabled component                                                                     |
| displayLength    | number `(30)`                                     | Configure how many lines of entries per page to display, corresponding to `lengthMenu` |
| first            | boolean `(true)`                                  | Show first page button                                                                 |
| last             | boolean `(true)`                                  | Show last Page button                                                                  |
| lengthMenu       | Array&lt;number&gt;                               | Paging display row number configuration, defaults to 30, 50, 100                       |
| maxButtons       | number `(5)`                                      | Configure the maximum number of display buttons                                        |
| next             | boolean `(true)`                                  | Show Next Page button                                                                  |
| onChangeLength   | (eventKey: number) => void                        | The callback function that triggers when the `lengthmenu` value changes                |
| onChangePage     | (eventKey: number) => void                        | callback function triggered when page changes                                          |
| prev             | boolean `(true)`                                  | Show Previous Page button                                                              |
| renderLengthMenu | (picker: React.Node) => React.Node                | Custom menu                                                                            |
| renderTotal      | (total: number, activePage: number) => React.Node | Custom total                                                                           |
| reverse          | boolean                                           | Reverse start and end position                                                         |
| showInfo         | boolean `(true)`                                  | Show paging information                                                                |
| showLengthMenu   | boolean `(true)`                                  | Display Dropdown menu                                                                  |
| total            | number                                            | Total number of data entries                                                           |
