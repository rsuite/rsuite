# Table

A table displays rows of data.

- `<Table>` Table component
- `<Table.Column>` Table definition column component
- `<Table.ColumnGroup>` Used for column header grouping
- `<Table.HeaderCell>` Column Header cell component
- `<Table.Cell>` Cell component
- `<Table.Pagination>` Table paging component

## Import

<!--{include:(components/table/fragments/import.md)}-->

## Examples

### Fixed Column

<!--{include:`default.md`}-->

### Virtualized

Support `virtualized`, effectively render large tabular data.

<!--{include:`virtualized.md`}-->

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
<Table
  onRerenderRowHeight={rowData => {
    if (rowData.firstName === 'Janis') {
      return 30;
    }
  }}
>
  ...
</Table>
```

### Sort

<!--{include:`sort.md`}-->

Set a `sortable` attribute in the column `<Column>` that you want to sort.

While the `<Table>` defines a `onSortColumn` callback function, clicking the column header to sort the icon triggers the method and returns `sortColumn` and `sortType`.

```html
<Table onSortColumn={(sortColumn, sortType) => { console.log(sortColumn, sortType); }} >

<Column width="{50}" sortable>
  <HeaderCell>Id</HeaderCell>
  <Cell dataKey="id" />
</Column>

<Column width="{130}" sortable>
  <HeaderCell>First Name</HeaderCell>
  <Cell dataKey="firstName" />
</Column>

...
```

### Pagination

<!--{include:`pagination.md`}-->

### Tree

<!--{include:`tree.md`}-->

A tree table, primarily to show structured data, requires a `isTree` attribute to be set on the `Table` component, while the `data` is used to define the relational structure through `children`.

```js
const data = [
  {
    id: '1',
    labelName: 'Car',
    status: 'ENABLED',
    children: [
      {
        id: '1-1',
        labelName: 'Mercedes Benz',
        status: 'ENABLED',
        count: 460
      }
    ]
  }
];
<Table data={data} isTree rowKey="id" />;
```

**Dealing with related properties for a tree table**

- `defaultExpandAllRows:boolean` :Expand all nodes By default
- `expandedRowKeys` (controlled) and `defaultExpandedRowKeys` are used to configure the rows that need to be expanded. Note that the parameters that these two properties receive are an array of Rowkey in the array.。
- `rowKey`: Give each row of data to a unique key, corresponding to a unique value in the key. (You can set the rowKey in `<Table>`, the default value is `key`)
- `renderTreeToggle:() => ReactNode` : Custom Toggle
- `onExpandChange:(expanded:boolean,rowData:object) => void`: To open/close a node's callback function

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

### Editable

<!--{include:`edit.md`}-->

> Editable tables, just customize a `Cell` on the line

```js
export const EditCell = ({ rowData, dataKey, onChange, ...props }) => {
  return (
    <Cell {...props}>
      {rowData.status === 'EDIT' ? (
        <input
          className="input"
          defaultValue={rowData[dataKey]}
          onChange={event => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        rowData[dataKey]
      )}
    </Cell>
  );
};
```

### Loading

<!--{include:`loading.md`}-->

When the data is in an asynchronous fetch, you need to display a `loading` state, just set the `loading` property on the `<Table>`.

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

> When `lastName` corresponds to a column value of `null` or `undefined`, it is merged by the `firstName` column.

### Summary

<!--{include:`summary.md`}-->

### Word Wrap

<!--{include:`word-wrap.md`}-->

If you want the cell to wrap, you just need to set `wordWrap`

### Affix header & scrollbar

- `autoHeight`: Table will expand the height according to the content.
- `affixHeader`: Affix the table header to the specified location on the page.
- `affixHorizontalScrollbar`: Affix the table horizontal scrollbar to the specified position on the page.

<!--{include:`affix-horizontal-scrollbar.md`}-->

### Draggable(with react-dnd)

https://codesandbox.io/s/rsuite-table-with-react-dnd-m06cm

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
| other      | Data are sorted by an algorithm other than ascending or descending. |
| none       | Default (no sort applied).                                          |

## Props

### `<Table>`

| Property                 | Type `(Default)`                                                                  | Description                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| affixHeader              | boolean,number                                                                    | Affix the table header to the specified location on the page                                  |
| affixHorizontalScrollbar | boolean,number                                                                    | Affix the table horizontal scrollbar to the specified position on the page                    |
| autoHeight               | boolean                                                                           | Automatic height                                                                              |
| bodyRef                  | Ref                                                                               | A ref attached to the table body element                                                      |
| bordered                 | boolean                                                                           | Show border                                                                                   |
| cellBordered             | boolean                                                                           | Show cell border                                                                              |
| data \*                  | object[]                                                                          | Table data                                                                                    |
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
| renderEmpty              | (info: ReactNode) => ReactNode                                                    | Customized data is empty display content                                                      |
| renderLoading            | (loading: ReactNode) => ReactNode                                                 | Customize the display content in the data load                                                |
| renderRowExpanded        | (rowDate?: Object) => ReactNode                                                   | Customize what you can do to expand a zone                                                    |
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

The vertical scroll bar scrolls to the specified position

```ts
scrollTop: (top: number) => void;
```

- scrollLeft

The horizontal scroll bar scrolls to the specified position

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
| header        | ReactNode                       | Group header       |
| verticalAlign | enum: 'top', 'middle', 'bottom' | Vertical alignment |

### `<Table.Cell>`

| Property | Type `(Default)` | Description                                  |
| -------- | ---------------- | -------------------------------------------- |
| dataKey  | string           | Data binding `key`, but also a sort of `key` |
| rowData  | object           | Row data                                     |
| rowIndex | number           | Row number                                   |

### `<Table.Pagination>`

| Property         | Type `(Default)`                                 | Description                                                                            |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| activePage       | number `(1)`                                     | Configure the current page number                                                      |
| disabled         | boolean , (eventKey: any) => boolean             | Disabled component                                                                     |
| displayLength    | number `(30)`                                    | Configure how many lines of entries per page to display, corresponding to `lengthMenu` |
| first            | boolean `(true)`                                 | Show first page button                                                                 |
| last             | boolean `(true)`                                 | Show last Page button                                                                  |
| lengthMenu       | number[]                                         | Paging display row number configuration, defaults to 30, 50, 100                       |
| maxButtons       | number `(5)`                                     | Configure the maximum number of display buttons                                        |
| next             | boolean `(true)`                                 | Show Next Page button                                                                  |
| onChangeLength   | (eventKey: number) => void                       | The callback function that triggers when the `lengthmenu` value changes                |
| onChangePage     | (eventKey: number) => void                       | callback function triggered when page changes                                          |
| prev             | boolean `(true)`                                 | Show Previous Page button                                                              |
| renderLengthMenu | (picker: ReactNode) => ReactNode                 | Custom menu                                                                            |
| renderTotal      | (total: number, activePage: number) => ReactNode | Custom total                                                                           |
| reverse          | boolean                                          | Reverse start and end position                                                         |
| showInfo         | boolean `(true)`                                 | Show paging information                                                                |
| showLengthMenu   | boolean `(true)`                                 | Display Dropdown menu                                                                  |
| total            | number                                           | Total number of data entries                                                           |
