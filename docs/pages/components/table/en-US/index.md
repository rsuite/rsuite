# Table

A table displays rows of data.

## Import

<!--{include:<import-guide>}-->

- `<Table>` Table component
- `<Table.Column>` Table definition column component
- `<Table.ColumnGroup>` Used for column header grouping
- `<Table.HeaderCell>` Column Header cell component
- `<Table.Cell>` Cell component

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Loading

<!--{include:`loading.md`}-->

### Table Height

<!--{include:`height.md`}-->

### Fill Height

Force the height of the table to be equal to the height of its parent container. Cannot be used together with autoHeight.

<!--{include:`fill-height.md`}-->

### Custom Cell

<!--{include:`custom-cell.md`}-->

Depending on your business scenario, you can define what you want to display in a cell, such as displaying a picture, like adding a few buttons, or displaying a text box that you can customize, and simply redefining the `Cell` component.

For example, display a picture, define a `Imagecell` component:

```js
const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <img src={rowData[dataKey]} width="50" />
  </Cell>
);
```

Use:

```html
<Column width="{200}">
  <HeaderCell>Avartar</HeaderCell>
  <ImageCell dataKey="avartar" />
</Column>
```

The `children` property support function on `<Cell>` can get `rowData` to return a new `children`.

Use:

```html
<Column width="{200}">
  <HeaderCell>Date</HeaderCell>
  <Cell>{rowData => rowData.date.toLocaleString()}</Cell>
</Column>
```

---

**Custom row height**

If you need to define row heights based on the content of your data in practical applications, you can use the following methods:

```js
return (
  <Table
    rowHeight={rowData => {
      if (rowData?.tags.length > 4) {
        return 80;
      }
      return 40;
    }}
  >
    ...
  </Table>
);
```

### Resizable

<!--{include:`resizable.md`}-->

Move the mouse to the column split line, will display a blue move handle, click Not to loosen and drag left and right to adjust the width of the column.

To support this feature, you need to set a `resizable` attribute in `Column`.

### Fluid

<!--{include:`fluid-column.md`}-->

If you need to set a column to automatic width, you need to configure the `flexGrow` property. `flexGrow` is a `number` type. Will fill the `Table` remaining width according to the sum of all `flexGrow`.

> Note: After setting `flexGrow`, you cannot set the `width` and `resizable` properties. You can set a minimum width by `minwidth`.

```html
<Column flexGrow="{1}">
  <HeaderCell>City <code>flexGrow={1}</code></HeaderCell>
  <Cell dataKey="city" />
</Column>

<Column flexGrow="{2}">
  <HeaderCell>Company Name <code>flexGrow={2}</code></HeaderCell>
  <Cell dataKey="companyName" />
</Column>

...
```

### Sort

<!--{include:`sort.md`}-->

Set a `sortable` attribute in the column `<Column>` that you want to sort.

While the `<Table>` defines a `onSortColumn` callback function, clicking the column header to sort the icon triggers the method and returns `sortColumn` and `sortType`.

```html
<table onSortColumn="{(sortColumn," sortType)="">
  { console.log(sortColumn, sortType); }} >

  <Column width="{50}" sortable>
    <HeaderCell>Id</HeaderCell>
    <Cell dataKey="id" />
  </Column>

  <Column width="{130}" sortable>
    <HeaderCell>First Name</HeaderCell>
    <Cell dataKey="firstName" />
  </Column>

  ...
</table>
```

### Pagination

If you need table data paging, you must first filter the data paging (usually supported by the server data api), and then combine with the [`Pagination`](/components/pagination/) component to achieve table paging.

<!--{include:`pagination.md`}-->

### Expandable

<!--{include:`expanded.md`}-->

To implement a Table that can be expanded, a combination of the following attributes is required.

**Step 1: Set properties for Table**

- `renderRowExpanded(rowData) => ReactNode`: Used to return content that needs to be rendered in the expansion panel
- `rowExpandedHeight`: Sets the height of the expandable area. The default is 100
- `expandedRowKeys` (controlled) and `defaultExpandedRowKeys` are used to configure the rows that need to be expanded. Note that the parameters that these two properties receive are an array of Rowkey in the array.。
- `rowKey`: Give each row of data to a unique key, corresponding to a unique value in the key.

**Step 2：Custom Cell**

Customize a `Cell` and put a button inside to manipulate the value in `expandedRowKeys`.

### Colspan

<!--{include:`colspan.md`}-->

In some cases, you need to merge the relationships between columns to organize your data, and you can set a `ColSpan` attribute on the `<Column>` component，and set the header grouping through`<ColumnGroup>`. for example:

```js
<ColumnGroup header="Name">
  <Column width={130} colSpan={2}>
    <HeaderCell>First Name</HeaderCell>
    <Cell dataKey="firstName" />
  </Column>

  <Column width={130}>
    <HeaderCell>Last Name</HeaderCell>
    <Cell dataKey="lastName" />
  </Column>
</ColumnGroup>
```

When `lastName` corresponds to a column value of `null` or `undefined`, it is merged by the `firstName` column.

### Rowspan

<!--{include:`rowspan.md`}-->

### Summary

<!--{include:`summary.md`}-->

### Show full text of cells

Display the hidden text in its entirety when hovering over the cell.

<!--{include:`full-text.md`}-->

### Word Wrap

<!--{include:`word-wrap.md`}-->

> ⚠️ We do not recommend using `wordWrap` with `virtualized`, because `virtualized` only achieves the best performance with a fixed line height. You can use the `fullText` property to solve the problem of not displaying the full text.

## More Examples

- [Table Virtualized](/components/table-virtualized/)
- [Tree Table](/components/table-tree)
- [Table Affix](/components/table-affix/)
- [Table Editable](/components/table-editable/)

## Accessibility

- `<Table>` has role `grid`.
- `<Table>` has role `treegrid`, when `<Table>` is set with `isTree`.
- `<HeanderCell>` has role `columnheader`.
- `<Cell>` has role `gridcell`.
- Rows dynamically generated from data in the `<Table>` has role `row`.
- Use the `aria-rowcount` prop to identify the total number of rows available, and the `aria-rowindex` prop to identify the index of the row.
- Use the `aria-colcount` prop to identify the total number of available columns, and the `aria-colindex` prop to identify the index of the column.
- When sorting a column, you can apply the `aria-sort` prop to the column header to indicate the sorting method.

| aria-sort  | Description                                                         |
| ---------- | ------------------------------------------------------------------- |
| ascending  | Data are sorted in ascending order.                                 |
| descending | Data are sorted in descending order.                                |
| none       | Default (no sort applied).                                          |
| other      | Data are sorted by an algorithm other than ascending or descending. |

## Props

### `<Table>`

| Property                 | Type `(Default)`                                                                                  | Description                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| affixHeader              | boolean &#124; number                                                                             | Affix the table header to the specified location on the page                                                                                                                              |
| affixHorizontalScrollbar | boolean &#124; number                                                                             | Affix the table horizontal scrollbar to the specified position on the page                                                                                                                |
| autoHeight               | boolean                                                                                           | The height of the table will be automatically expanded according to the number of data rows, and no vertical scroll bar will appear                                                       |
| bordered                 | boolean                                                                                           | Show border                                                                                                                                                                               |
| cellBordered             | boolean                                                                                           | Show cell border                                                                                                                                                                          |
| children                 | (components: { Cell, HeaderCell, Column, ColumnGroup }) => React.ReactNode &#124; React.ReactNode | Render props that receives parameterized Cell, HeaderCell, Column, ColumnGroup components - [making typescript usage more convenient](https://github.com/rsuite/rsuite-table#type-safety) |
| data \*                  | object[]                                                                                          | Table data                                                                                                                                                                                |
| defaultExpandAllRows     | boolean                                                                                           | Expand all nodes By default                                                                                                                                                               |
| defaultExpandedRowKeys   | string[]                                                                                          | Specify the default expanded row by `rowkey`                                                                                                                                              |
| defaultSortType          | 'desc' &#124; 'asc'                                                                               | Sort type                                                                                                                                                                                 |
| expandedRowKeys          | string[]                                                                                          | Specify the default expanded row by `rowkey` (Controlled)                                                                                                                                 |
| fillHeight               | boolean                                                                                           | Force the height of the table to be equal to the height of its parent container. Cannot be used together with autoHeight.                                                                 |
| headerHeight             | number`(40)`                                                                                      | Table Header Height                                                                                                                                                                       |
| height                   | number`(200)`                                                                                     | Table height                                                                                                                                                                              |
| hover                    | boolean `(true)`                                                                                  | The row of the table has a mouseover effect                                                                                                                                               |
| isTree                   | boolean                                                                                           | Show as Tree table                                                                                                                                                                        |
| loading                  | boolean                                                                                           | Show loading                                                                                                                                                                              |
| locale                   | [TableLocaleType](/guide/i18n/#table)                                                             | Define localization settings to show component text in the user's regional language                                                                                                       |
| maxHeight                | number                                                                                            | Maximum height                                                                                                                                                                            |
| minHeight                | number `(0)`                                                                                      | Minimum height                                                                                                                                                                            |
| onDataUpdated            | (nextData: object[], scrollTo: (coord: { x: number; y: number }) => void) => void                 | Callback after table data update.                                                                                                                                                         |
| onExpandChange           | (expanded:boolean, rowData:object) => void                                                        | Tree table, the callback function in the expanded node                                                                                                                                    |
| onRowClick               | (rowData:object) => void                                                                          | Click the callback function after the row and return to `rowDate`                                                                                                                         |
| onScroll                 | (scrollX:object, scrollY:object) => void                                                          | Callback function for scroll bar scrolling                                                                                                                                                |
| onSortColumn             | (dataKey:string, sortType:string) => void                                                         | Click the callback function of the sort sequence to return the value `sortColumn`, `sortType`                                                                                             |
| renderEmpty              | (info: ReactNode) => ReactNode                                                                    | Customized data is empty display content                                                                                                                                                  |
| renderLoading            | (loading: ReactNode) => ReactNode                                                                 | Customize the display content in the data load                                                                                                                                            |
| renderRow                | (children?: ReactNode, rowData?: RowDataType) => ReactNode                                        | Custom row element                                                                                                                                                                        |
| renderRowExpanded        | (rowDate?: Object) => ReactNode                                                                   | Customize what you can do to expand a zone                                                                                                                                                |
| renderTreeToggle         | (icon:node, rowData:object, expanded:boolean) => ReactNode                                        | Tree table, the callback function in the expanded node                                                                                                                                    |
| rowClassName             | string &#124; (rowData:object, rowIndex:number) => string                                         | Add an optional extra class name to row                                                                                                                                                   |
| rowExpandedHeight        | number `(100)`                                                                                    | Set the height of an expandable area                                                                                                                                                      |
| rowHeight                | (rowData:object) => number, number`(46)`                                                          | Row height                                                                                                                                                                                |
| rowKey                   | string `('key')`                                                                                  | Each row corresponds to the unique `key` in `data`                                                                                                                                        |
| shouldUpdateScroll       | boolean &#124; (event)=>({x,y}) `(true)`                                                          | Use the return value of `shouldUpdateScroll` to determine whether to update the scroll after the table size is updated                                                                    |
| showHeader               | boolean `(true)`                                                                                  | Display header                                                                                                                                                                            |
| sortColumn               | string                                                                                            | Sort column name                                                                                                                                                                          |
| sortType                 | 'desc' &#124; 'asc'                                                                               | Sort type (Controlled)                                                                                                                                                                    |
| virtualized              | boolean                                                                                           | Effectively render large tabular data                                                                                                                                                     |
| width                    | number                                                                                            | Table width                                                                                                                                                                               |
| wordWrap                 | boolean &#124; 'break-all' &#124; 'break-word' &#124; 'keep-all'                                  | Whether to appear line breaks where text overflows its content box                                                                                                                        |

### Table ref

| Property       | Type                     | Description                                                    |
| -------------- | ------------------------ | -------------------------------------------------------------- |
| body           | HTMLDivElement           | The body element of the table                                  |
| root           | HTMLDivElement           | The root element of the table                                  |
| scrollLeft     | (left:number)=>void      | Set the number of pixels for horizontal scrolling of the table |
| scrollPosition | {top:number,left:number} | The scroll position of the table                               |
| scrollTop      | (top:number)=>void       | Set the number of pixels for vertical scrolling of the table   |

### `<Table.Column>`

| Property      | Type `(Default)`                                 | Description                                                                                                 |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| align         | 'left' &#124; 'center' &#124; 'right'            | Alignment                                                                                                   |
| colSpan       | number                                           | Merges column cells to merge when the `dataKey` value for the merged column is `null` or `undefined`.       |
| fixed         | boolean &#124; 'left' &#124; 'right'             | Fixed column                                                                                                |
| flexGrow      | number                                           | Set the column width automatically adjusts, when set `flexGrow` cannot set `resizable` and `width` property |
| fullText      | boolean                                          | Whether to display the full text of the cell content when the mouse is hovered                              |
| minWidth      | number`(200)`                                    | When you use `flexGrow`, you can set a minimum width by `minwidth`                                          |
| onResize      | (columnWidth?: number, dataKey?: string) => void | Callback after column width change                                                                          |
| resizable     | boolean                                          | Customizable Resize Column width                                                                            |
| rowSpan       | (rowData: any) => number                         | Merges rows on the specified column.                                                                        |
| sortable      | boolean                                          | Sortable                                                                                                    |
| treeCol       | boolean                                          | A column of a tree.                                                                                         |
| verticalAlign | 'top' &#124; 'middle' &#124; 'bottom'            | Vertical alignment                                                                                          |
| width         | number                                           | Column width                                                                                                |

> `sortable` is used to define whether the column is sortable, but depending on what `key` sort needs to set a `dataKey` in `Cell`.
> The sort here is the service-side sort, so you need to handle the logic in the ' Onsortcolumn ' callback function of `<Table>`, and the callback function returns `sortColumn`, `sortType` values.

### `<Table.ColumnGroup>`

| Property          | Type `(Default)`                      | Description                                                                                             |
| ----------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| align             | 'left' &#124; 'center' &#124; 'right' | Alignment                                                                                               |
| fixed             | boolean, 'left', 'right'              | Fixed column group                                                                                      |
| groupHeaderHeight | number                                | The height of the header of the merged cell group. The default value is 50% of the table `headerHeight` |
| header            | ReactNode                             | Group header                                                                                            |
| verticalAlign     | 'top' &#124; 'middle' &#124; 'bottom' | Vertical alignment                                                                                      |

### `<Table.HeaderCell>`

| Property       | Type `(Default)`                               | Description                                  |
| -------------- | ---------------------------------------------- | -------------------------------------------- |
| children       | ReactNode                                      | The table column header displays the content |
| renderSortIcon | (sortType?: 'desc' &#124; 'asc' ) => ReactNode | Custom render sort icons on column headers   |

### `<Table.Cell>`

| Property | Type `(Default)` | Description                                  |
| -------- | ---------------- | -------------------------------------------- |
| dataKey  | string           | Data binding `key`, but also a sort of `key` |
| rowData  | object           | Row data                                     |
| rowIndex | number           | Row number                                   |
