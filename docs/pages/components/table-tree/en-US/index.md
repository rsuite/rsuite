# Tree Table

Tree table is a table that displays hierarchical data in a tree structure. It is mainly used to display structured data.

## Usage

<!--{include:<import-guide>}-->

A tree table, primarily to show structured data, requires a `isTree` attribute to be set on the `Table` component, while the `data` is used to define the relational structure through `children`.

```tsx
const data = [
  {
    id: '1',
    name: 'Car',
    count: 460,
    children: [
      {
        id: '1-1',
        name: 'Mercedes Benz',
        count: 300
      },
      ...
    ]
  }
];
<Table data={data} isTree rowKey="id">
```

## Examples

### Tree

<!--{include:`tree.md`}-->

Properties related to tree tables:

| Property                 | Type                                          | Description                                         |
| ------------------------ | --------------------------------------------- | --------------------------------------------------- |
| `expandedRowKeys`        | string[]                                      | Array of `key` of expanded rows                     |
| `defaultExpandedRowKeys` | string[]                                      | Array of `key` of rows that are expanded by default |
| `rowKey`                 | string                                        | Unique identifier of row data                       |
| `renderTreeToggle`       | () => ReactNode                               | Custom icon for expanding/collapsing nodes          |
| `onExpandChange`         | (expanded: boolean, rowData: RowData) => void | Callback function for expanding/collapsing nodes    |

> Note: For custom cells in tree tables, you need to pass `rowData` to the rendering tree `Cell`, as it will be used internally to record the state of the node. [#issue/2666](https://github.com/rsuite/rsuite/issues/2666)

```js
const CustomCell = ({ rowData, ...rest }) => {
  return (
    <Cell rowData={rowData} {...rest}>
      {rowData.name}
    </Cell>
  );
};
```

### Simple Gantt chart

<!--{include:`gantt.md`}-->

### Specify the tree column

By default, the first column is used as the tree column, and you can specify that the column is displayed as a tree by using the `treeCol` attribute on `<Table.Column>`.

<!--{include:`tree-col.md`}-->

### Virtualized Tree Table

The tree table supports virtual scrolling, which can greatly improve the performance of rendering large amounts of data.

<!--{include:`virtualized.md`}-->
