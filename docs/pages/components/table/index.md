# Table 表格

以表格的方式展示数据。

- `<Table>` 表格组件
- `<Table.Column>` 表格定义列组件
- `<Table.HeaderCell>` 列头单元格组件
- `<Table.Cell>` 单元格组件
- `<Table.Pagination>` 表格分页组件

## 获取组件

```js
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;
```

## 演示

<!--{demo}-->

## Props

### `<Table>`

| 属性名称                 | 类型 `(默认值)`                                                                   | 描述                                                         |
| ------------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| affixHeader              | boolean,number                                                                    | 将表头固定到页面上的指定位置                                 |
| affixHorizontalScrollbar | boolean,number                                                                    | 将横向滚动条固定在页面底部的指定位置                         |
| autoHeight               | boolean                                                                           | 自动高度                                                     |
| bodyRef                  | React.Ref                                                                         | 表格主体部分上的 ref                                         |
| bordered                 | boolean                                                                           | 表格边框                                                     |
| cellBordered             | boolean                                                                           | 单元格边框                                                   |
| data \*                  | Array&lt;Object&gt;                                                               | 表格数据                                                     |
| defaultExpandAllRows     | boolean                                                                           | 默认展开所有节点                                             |
| defaultExpandedRowKeys   | string[]                                                                          | 通过 rowKey 指定默认展开的行                                 |
| defaultSortType          | enum: 'desc', 'asc'                                                               | 排序类型                                                     |
| expandedRowKeys          | string[]                                                                          | 通过 rowKey 指定展开的行 (受控)                              |
| headerHeight             | number`(40)`                                                                      | 表头高度                                                     |
| height                   | number`(200)`                                                                     | 高度                                                         |
| hover                    | boolean `(true)`                                                                  | 表格的行设置鼠标悬停效果                                     |
| isTree                   | boolean                                                                           | 是否展示为树表格                                             |
| loading                  | boolean                                                                           | 显示 loading 状态                                            |
| locale                   | object                                                                            | 本地化语言配置                                               |
| minHeight                | number `(0)`                                                                      | 最小高度                                                     |
| onDataUpdated            | (nextData: object[], scrollTo: (coord: { x: number; y: number }) => void) => void | 数据更新后的回调函数                                         |
| onExpandChange           | (expanded:boolean, rowData:object) => void                                        | 树形表格，在展开节点的回调函数                               |
| onRowClick               | (rowData:object) => void                                                          | 行点击后的回调函数， 返回 `rowDate`                          |
| onScroll                 | (scrollX:object, scrollY:object) => void                                          | 滚动条滚动时候的回调函数                                     |
| onSortColumn             | (dataKey:string, sortType:string) => void                                         | 点击排序列的回调函数，返回 `sortColumn`, `sortType` 这两个值 |
| renderEmpty              | (info: React.Node) => React.Node                                                  | 自定义渲染数据为空的状态                                     |
| renderLoading            | (loading: React.Node) => React.Node                                               | 自定义渲染数据加载中的状态                                   |
| renderRowExpanded        | (rowDate?: Object) => React.Node                                                  | 自定义可以展开区域的内容                                     |
| renderTreeToggle         | (icon:node, rowData:object, expanded:boolean) => node                             | 树形表格，在展开节点的回调函数                               |
| rowClassName             | string , (rowData:object) => string                                               | 为行自定义 className                                         |
| rowExpandedHeight        | number `(100)`                                                                    | 设置可展开区域的高度                                         |
| rowHeight                | (rowData:object) => number, number`(46)`                                          | 行高                                                         |
| rowKey                   | string `('key')`                                                                  | 每一个行对应的 `data` 中的唯一 `key`                         |
| shouldUpdateScroll       | boolean`(true)`                                                                   | 数据更新后更新滚动条位置                                     |
| showHeader               | boolean `(true)`                                                                  | 显示表头                                                     |
| sortColumn               | string                                                                            | 排序列名称                                                   |
| sortType                 | enum: 'desc', 'asc'                                                               | 排序类型（受控）                                             |
| virtualized              | boolean                                                                           | 呈现大表格数据                                               |
| width                    | number                                                                            | 宽度                                                         |
| wordWrap                 | boolean                                                                           | 单元格自动换行                                               |

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

| 属性名称      | 类型 `(默认值)`                                  | 描述                                                                                  |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| align         | enum: 'left','center','right'                    | 对齐方式                                                                              |
| colSpan       | number                                           | 合并列单元格，当被合并列的 `dataKey` 对应的值为 `null` 或者 `undefined`时，才会合并。 |
| fixed         | boolean, 'left', 'right'                         | 固定列                                                                                |
| flexGrow      | number                                           | 设置列宽自动调节，当设置了 `flexGrow` 就不能设置 `resizable` 与 `width` 属性          |
| minWidth      | number`(200)`                                    | 当使用了 `flexGrow` 以后，可以通过 `minWidth` 设置一个最小宽度                        |
| onResize      | (columnWidth?: number, dataKey?: string) => void | 列宽改变后的回调                                                                      |
| resizable     | boolean                                          | 可自定义调整列宽                                                                      |
| sortable      | boolean                                          | 可排序                                                                                |
| treeCol       | boolean                                          | 指定列显示为 Tree                                                                     |
| verticalAlign | enum: 'top', 'middle', 'bottom'                  | 垂直对齐方式                                                                          |
| width         | number                                           | 列宽                                                                                  |

> `sortable` 是用来定义该列是否可排序，但是根据什么 `key` 排序需要 在 `Cell` 设置一个 `dataKey`
> 这里的排序是服务端排序，所以需要在 `<Table>` 的 `onSortColumn` 回调函数中处理逻辑，回调函数会返回 `sortColumn`, `sortType` 这两个值。

### `<Table.ColumnGroup>`

| 属性名称      | 类型 `(默认值)`                 | 描述         |
| ------------- | ------------------------------- | ------------ |
| align         | enum: 'left','center','right'   | 对齐方式     |
| fixed         | boolean, 'left', 'right'        | 固定列组     |
| verticalAlign | enum: 'top', 'middle', 'bottom' | 垂直对齐方式 |
| header        | React.ReactNode                 | 分组表头     |

### `<Table.Cell>`

| 属性名称 | 类型 `(默认值)` | 描述                                    |
| -------- | --------------- | --------------------------------------- |
| dataKey  | string          | 数据绑定的 `key` ，同时也是排序的 `key` |
| rowData  | object          | 行数据                                  |
| rowIndex | number          | 行号                                    |

### `<Table.Pagination>`

| 属性名称         | 类型 `(默认值)`                                   | 描述                                        |
| ---------------- | ------------------------------------------------- | ------------------------------------------- |
| activePage       | number `(1)`                                      | 配置当前页号                                |
| disabled         | boolean , (eventKey: any) => boolean              | 禁用分页                                    |
| displayLength    | number `(30)`                                     | 配置每页显示多少行条目数，对应 `lengthMenu` |
| first            | boolean `(true)`                                  | 显示第一页按钮                              |
| last             | boolean `(true)`                                  | 显示最后一页按钮                            |
| lengthMenu       | Array                                             | 分页显示行数配置，默认为 30, 50, 100        |
| maxButtons       | number `(5)`                                      | 配置最多显示按钮数量                        |
| next             | boolean `(true)`                                  | 显示下一页按钮                              |
| onChangeLength   | (eventKey: number) => void                        | `lengthMenu` 值发生改变的时候触发的回调函数 |
| onChangePage     | (eventKey: number) => void                        | page 改变时候触发的回调函数                 |
| prev             | boolean `(true)`                                  | 显示上一页按钮                              |
| renderLengthMenu | (picker: React.Node) => React.Node                | 自定义菜单                                  |
| renderTotal      | (total: number, activePage: number) => React.Node | 自定义总数                                  |
| reverse          | boolean                                           | 调换左右的位置                              |
| showInfo         | boolean `(true)`                                  | 显示分页信息                                |
| showLengthMenu   | boolean `(true)`                                  | 显示多少行的菜单，默认显示                  |
| total            | number                                            | 总数据条目数                                |
