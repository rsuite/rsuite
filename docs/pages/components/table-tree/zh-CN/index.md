# 树形表格

树形表格是一种展示有结构关系的数据的表格，通过树形表格可以清晰的展示数据之间的层级关系。

## 使用

<!--{include:<import-guide>}-->

树形表格，主要为了展示有结构关系的数据，需要在 `Table` 组件上设置一个 `isTree` 属性，同时 `data` 中的数据需要通过 `children` 来定义关系结构。

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
      }
      ...
    ]
  }
];
<Table data={data} isTree rowKey="id">
```

## 演示

### 树形展示

<!--{include:`tree.md`}-->

和树形表格相关的属性：

| 属性                     | 类型                                          | 描述                      |
| ------------------------ | --------------------------------------------- | ------------------------- |
| `expandedRowKeys`        | string[]                                      | 展开的行的 `key` 数组     |
| `defaultExpandedRowKeys` | string[]                                      | 默认展开的行的 `key` 数组 |
| `rowKey`                 | string                                        | 行数据的唯一标识          |
| `renderTreeToggle`       | () => ReactNode                               | 自定义展开/关闭节点的图标 |
| `onExpandChange`         | (expanded: boolean, rowData: RowData) => void | 展开/关闭节点的回调函数   |

> 注意： 树形表格的自定义单元格，需要将 `rowData` 传递给渲染树的 `Cell`，因为在 `Cell` 内部将使用它来记录节点的状态。[#issue/2666](https://github.com/rsuite/rsuite/issues/2666)

```js
const CustomCell = ({ rowData, ...rest }) => {
  return (
    <Cell rowData={rowData} {...rest}>
      {rowData.name}
    </Cell>
  );
};
```

### 简单甘特图

<!--{include:`gantt.md`}-->

### 指定树形列

默认将使用第一列作为树形列，也可以通过 `<Table.Column>` 上的 `treeCol` 属性可以指定该列显示为树形。

<!--{include:`tree-col.md`}-->

### 虚拟化树形表格

树形表格支持虚拟滚动，可以大大提高渲染大量数据的性能。

<!--{include:`virtualized.md`}-->
