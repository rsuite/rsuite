# Table 表格

以表格的方式展示数据。

- `<Table>` 表格组件
- `<Table.Column>` 表格定义列组件
- `<Table.ColumnGroup>` 用于列头分组
- `<Table.HeaderCell>` 列头单元格组件
- `<Table.Cell>` 单元格组件

## 获取组件

<!--{include:(components/table/fragments/import.md)}-->

## 演示

### 基础表格

<!--{include:`basic.md`}-->

### 外观

<!--{include:`appearance.md`}-->

- `autoHeight`: 表格高度会根据数据行数自动展开，不会出现垂直滚动条。
- `fillHeight`: 强制表格的高度等于其父容器的高度，不能与 autoHeight 一起使用。

### 虚拟化的大表格

支持 `virtualized`, 有效地呈现大表格数据。

<!--{include:`virtualized.md`}-->

### 自定义单元格

<!--{include:`custom-cell.md`}-->

根据不同的业务场景，单元格中可以自己定义显示的内容，比如显示一张图片，比如您要添加一个几个按钮，或者显示一个文本框，都是可以自定义的，只需要把 `Cell` 组件重新自定义一下就行。

比如，显示一个图片，定义一个 `ImageCell` 组件：

```js
const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <img src={rowData[dataKey]} width="50" />
  </Cell>
);
```

```html
<Column width="{200}">
  <HeaderCell>Avartar</HeaderCell>
  <ImageCell dataKey="avartar" />
</Column>
```

`<Cell>` 的 `children` 支持函数，可以获取到 `rowData` 返回一个新的 `children`

示例：

```html
<Column width="{200}">
  <HeaderCell>Date</HeaderCell>
  <Cell>{rowData => rowData.date.toLocaleString()}</Cell>
</Column>
```

---

**自定义行高**

如果在实际应用中需要根据数据内容来定义行高，可以使用以下方式

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

### 可调整列宽

<!--{include:`resizable.md`}-->

把鼠标移动到列分割线的时候，会显示出一个蓝色的移动手柄，点击不松开并左右拖动就可以调整列的宽度。

要支持该功能，需要在 `Column` 设置一个 `resizable` 属性。

### 流体列宽

<!--{include:`fluid-column.md`}-->

如果需要把某列设置为自动宽度，需要配置 `flexGrow` 属性。 `flexGrow` 是 `number` 类型。会按照所有 `flexGrow` 总和比例撑满 `<Table>` 剩下的宽度。

> 注意: 设置 `flexGrow` 以后，就不能设置 `width` 和 `resizable` 属性。 可以通过 `minWidth` 设置一个最小宽度

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

### 完整的文本

在单元格内鼠标悬停时候把被切割的文本完整显示出来。

<!--{include:`full-text.md`}-->

### 自动换行

<!--{include:`word-wrap.md`}-->

> ⚠️ 我们不推荐和 `wordWrap` 和 `virtualized` 一起使用，因为 `virtualized` 只有在固定行高的情况下才能到达最好的性能。你可以使用 `fullText` 属性来解决文本无法展示完整的问题。

### 排序

<!--{include:`sort.md`}-->

在需要排序的列 `<Column>` 设置一个 `sortable` 属性。同时在 `<Table>` 定义一个 `onSortColumn` 回调函数，点击列头排序图标的时候，会触发该方法，并返回 `sortColumn` 和 `sortType`。

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

### 分页

表格默认是不具备对数据分页处理的功能，如果需要分页，首先需要对数据分页过滤(一般都是由服务端数据接口支持)，然后通过与 [`Pagination`](/zh/components/pagination/) 组件组合以实现表格分页功能。

<!--{include:`pagination.md`}-->

### 树形展示

<!--{include:`tree.md`}-->

树形表格，主要为了展示有结构关系的数据，需要在 `Table` 组件上设置一个 `isTree` 属性，同时 `data` 中的数据需要通过 `children` 来定义关系结构。

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

**处理树形表格用的的相关属性**

- `defaultExpandAllRows:boolean` 默认展开所有节点
- `expandedRowKeys`（受控） 和 `defaultExpandedRowKeys` 用来配置需要展开的行。需要注意的是这两个属性接收的参数是一个的数组，数组中是 rowKey。
- `rowKey` 给每一行数据对一个唯一 key , 对应 `data` 中的一个唯一值的 `key`。 (可以在 `<Table>` 设置 `rowKey` 进行修改，默认值: 'key' )
- `renderTreeToggle:() => ReactNode` 自定义 Toggle
- `onExpandChange:(expanded:boolean,rowData:object) => void` 展开/关闭节点的回调函数
- `treeCol` 是 `<Table.Column>` 上的属性，可以指定该列显示为树形。

当自定义单元格的时候，需要注意，如果是树形表格，那么需要将 `rowData` 传递给渲染树的 `Cell`，因为在 `Cell` 内部将使用它来记录节点的状态。[#issue/2666](https://github.com/rsuite/rsuite/issues/2666)

```js
const CustomCell = ({ rowData, ...rest }) => {
  return (
    <Cell rowData={rowData} {...rest}>
      {rowData.name}
    </Cell>
  );
};
```

### 可展开

<!--{include:`expanded.md`}-->

要实现一个可以展开的 Table ,需要以下几个属性的组合完成。

**第一步：给 Table 设置属性**

- `renderRowExpanded(rowData) => ReactNode` 用来返回需要在展开面板中渲染的内容
- `rowExpandedHeight` 设置可展开区域的高度， 默认是 100
- `expandedRowKeys`（受控） 和 `defaultExpandedRowKeys` 用来配置需要展开的行。需要注意的是这两个属性接收的参数是一个的数组，数组中是 rowKey。
- `rowKey` 给每一行数据对一个唯一 key , 对应 data 中的一个唯一值的 `key`。

**第二步：自定义 Cell**

自定义一个 `Cell`， 在内部放一个可以操作按钮，用于操作 `expandedRowKeys` 中的值。

### 可编辑

<!--{include:`edit.md`}-->

> 可编辑的表格，只需要自定义一个 `Cell` 就行了

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

### 合并列

<!--{include:`colspan.md`}-->

在某些情况下，需要合并列来组织数据之间的关系，可以在 `<Column>` 组件上设置一个 `colSpan` 属性，同时通过 `<ColumnGroup>` 设置表头分组。
例如：

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

> 当 `lastName` 对应列的值为 `null` 或者 `undefined` 的时候，则会被 `firstName` 列合并。

### 合并行

<!--{include:`rowspan.md`}-->

### 汇总

<!--{include:`summary.md`}-->

### 随页面滚动

- `autoHeight`: 表格的高度根据数据内容自动展开，不显示纵向滚动条。
- `affixHeader`: 将表格列头估计到页面上的指定位置。
- `affixHorizontalScrollbar`:将表格的横向滚动条固定在页面的底部。

<!--{include:`affix-horizontal-scrollbar.md`}-->

### 无限滚动加载

<!--{include:`infinite-loader.md`}-->

### 可拖拽(与 react-dnd 组合)

- [Use with react-dnd v10](https://codesandbox.io/s/rsuite5-table-with-react-dnd-16o4n)
- [Use with react-dnd v15](https://codesandbox.io/s/rsuite5-table-with-react-dnd15-ttrsck)

## 无障碍设计

- `<Table>` 拥有 `grid` role。当设置了 `isTree`, 则设置为 `treegrid` role。
- `<HeanderCell>` 有一个 `columnheader` role。
- `<Cell>` 有一个 `gridcell` role。
- `<Table>` 内的每一行，都有一个 `row` role。
- 使用 `aria-rowcount` 属性标识可用的总行数，并且用 `aria-rowindex` 属性用于标识行的索引。
- 使用 `aria-colcount` 属性标识可用的列总数，并且用 `aria-colindex` 属性用于标识列的索引。
- 对列进行排序时，可以将 `aria-sort` 属性应用于列标题以指示排序方法。

| aria-sort 值 | 描述                                     |
| ------------ | ---------------------------------------- |
| ascending    | 数据按升序排序。                         |
| descending   | 数据按降序排序。                         |
| none         | 默认值（不应用排序）。                   |
| other        | 数据按照升序和降序以外的排序方法进行排序 |

## Props

### `<Table>`

| 属性名称                 | 类型 `(默认值)`                                                                   | 描述                                                            |
| ------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| affixHeader              | boolean &#124; number                                                             | 将表头固定到页面上的指定位置                                    |
| affixHorizontalScrollbar | boolean &#124; number                                                             | 将横向滚动条固定在页面底部的指定位置                            |
| autoHeight               | boolean                                                                           | 表格高度会根据数据行数自动展开，不会出现垂直滚动条              |
| bordered                 | boolean                                                                           | 表格边框                                                        |
| cellBordered             | boolean                                                                           | 单元格边框                                                      |
| data \*                  | object[]                                                                          | 表格数据                                                        |
| defaultExpandAllRows     | boolean                                                                           | 默认展开所有节点                                                |
| defaultExpandedRowKeys   | string[]                                                                          | 通过 rowKey 指定默认展开的行                                    |
| defaultSortType          | 'desc' &#124; 'asc'                                                               | 排序类型                                                        |
| expandedRowKeys          | string[]                                                                          | 通过 rowKey 指定展开的行 (受控)                                 |
| fillHeight               | boolean                                                                           | 强制表格的高度等于其父容器的高度。 不能与 autoHeight 一起使用。 |
| headerHeight             | number`(40)`                                                                      | 表头高度                                                        |
| height                   | number`(200)`                                                                     | 高度                                                            |
| hover                    | boolean `(true)`                                                                  | 表格的行设置鼠标悬停效果                                        |
| isTree                   | boolean                                                                           | 是否展示为树表格                                                |
| loading                  | boolean                                                                           | 显示 loading 状态                                               |
| locale                   | [TableLocaleType](/zh/guide/i18n/#table)                                          | 本地化的文本                                                    |
| minHeight                | number `(0)`                                                                      | 最小高度                                                        |
| onDataUpdated            | (nextData: object[], scrollTo: (coord: { x: number; y: number }) => void) => void | 数据更新后的回调函数                                            |
| onExpandChange           | (expanded:boolean, rowData:object) => void                                        | 树形表格，在展开节点的回调函数                                  |
| onRowClick               | (rowData:object) => void                                                          | 行点击后的回调函数， 返回 `rowDate`                             |
| onScroll                 | (scrollX:object, scrollY:object) => void                                          | 滚动条滚动时候的回调函数                                        |
| onSortColumn             | (dataKey:string, sortType:string) => void                                         | 点击排序列的回调函数，返回 `sortColumn`, `sortType` 这两个值    |
| renderEmpty              | (info: ReactNode) => ReactNode                                                    | 自定义渲染数据为空的状态                                        |
| renderLoading            | (loading: ReactNode) => ReactNode                                                 | 自定义渲染数据加载中的状态                                      |
| renderRow                | (children?: ReactNode, rowData?: RowDataType) => ReactNode                        | 自定义渲染行                                                    |
| renderRowExpanded        | (rowDate?: Object) => ReactNode                                                   | 自定义可以展开区域的内容                                        |
| renderTreeToggle         | (icon:node, rowData:object, expanded:boolean) => ReactNode                        | 树形表格，在展开节点的回调函数                                  |
| rowClassName             | string &#124; (rowData:object, rowIndex:number) => string                         | 为行自定义 className                                            |
| rowExpandedHeight        | number `(100)`                                                                    | 设置可展开区域的高度                                            |
| rowHeight                | (rowData:object) => number, number`(46)`                                          | 行高                                                            |
| rowKey                   | string `('key')`                                                                  | 每一个行对应的 `data` 中的唯一 `key`                            |
| shouldUpdateScroll       | boolean &#124; (event)=>({x,y}) `(true)`                                          | 使用返回值来判断在 Table 尺寸更新后是否更新滚动                 |
| showHeader               | boolean `(true)`                                                                  | 显示表头                                                        |
| sortColumn               | string                                                                            | 排序列名称                                                      |
| sortType                 | 'desc' &#124; 'asc'                                                               | 排序类型（受控）                                                |
| virtualized              | boolean                                                                           | 呈现大表格数据                                                  |
| width                    | number                                                                            | 宽度                                                            |
| wordWrap                 | boolean &#124; 'break-all' &#124; 'break-word' &#124; 'keep-all'                  | 是否在文本溢出其内容框时自动换行                                |

### Table methods

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

| 属性名称      | 类型 `(默认值)`                                  | 描述                                                                                  |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| align         | 'left' &#124; 'center' &#124; 'right'            | 对齐方式                                                                              |
| colSpan       | number                                           | 合并列单元格，当被合并列的 `dataKey` 对应的值为 `null` 或者 `undefined`时，才会合并。 |
| fixed         | boolean &#124; 'left' &#124; 'right'             | 固定列                                                                                |
| flexGrow      | number                                           | 设置列宽自动调节，当设置了 `flexGrow` 就不能设置 `resizable` 与 `width` 属性          |
| fullText      | boolean                                          | 鼠标悬停时是否显示单元格内容的全文                                                    |
| minWidth      | number`(200)`                                    | 当使用了 `flexGrow` 以后，可以通过 `minWidth` 设置一个最小宽度                        |
| onResize      | (columnWidth?: number, dataKey?: string) => void | 列宽改变后的回调                                                                      |
| resizable     | boolean                                          | 可自定义调整列宽                                                                      |
| rowSpan       | (rowData: any) => number                         | 合并指定列上的行                                                                      |
| sortable      | boolean                                          | 可排序                                                                                |
| treeCol       | boolean                                          | 指定列显示为 Tree                                                                     |
| verticalAlign | 'top' &#124; 'middle' &#124; 'bottom'            | 垂直对齐方式                                                                          |
| width         | number                                           | 列宽                                                                                  |

> `sortable` 是用来定义该列是否可排序，但是根据什么 `key` 排序需要 在 `Cell` 设置一个 `dataKey`
> 这里的排序是服务端排序，所以需要在 `<Table>` 的 `onSortColumn` 回调函数中处理逻辑，回调函数会返回 `sortColumn`, `sortType` 这两个值。

### `<Table.ColumnGroup>`

| 属性名称          | 类型 `(默认值)`                       | 描述                                                                   |
| ----------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| align             | 'left' &#124; 'center' &#124; 'right' | 对齐方式                                                               |
| fixed             | boolean &#124; 'left' &#124; 'right'  | 固定列组                                                               |
| groupHeaderHeight | number                                | 合并单元格组的标题高度。 默认值是 Table 属性 `headerHeight` 50% 的值。 |
| header            | ReactNode                             | 分组表头                                                               |
| verticalAlign     | 'top' &#124; 'middle' &#124; 'bottom' | 垂直对齐方式                                                           |

### `<Table.HeaderCell>`

| 属性名称       | 类型 `(默认值)`                                | 描述                         |
| -------------- | ---------------------------------------------- | ---------------------------- |
| children       | ReactNode                                      | 表格列标题显示内容           |
| renderSortIcon | (sortType?: 'desc' &#124; 'asc' ) => ReactNode | 在列头上的自定义渲染排序图标 |

### `<Table.Cell>`

| 属性名称 | 类型 `(默认值)` | 描述                                    |
| -------- | --------------- | --------------------------------------- |
| dataKey  | string          | 数据绑定的 `key` ，同时也是排序的 `key` |
| rowData  | object          | 行数据                                  |
| rowIndex | number          | 行号                                    |
