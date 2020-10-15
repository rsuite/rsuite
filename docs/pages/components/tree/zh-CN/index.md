# Tree 树型控件

`<Tree>` 用于展示一个树结构数据。

## 获取组件

<!--{include:(components/tree/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 可拖拽

<!--{include:`draggable.md`}-->

### 异步加载

<!--{include:`async.md`}-->

## Props

<!--{include:(_common/types/data-item-type.md)}-->
<!--{include:(components/tree/fragments/drop-data-type.md)}-->

### `<Tree>`

| 属性名称                | 类型 `(默认值)`                                                                               | 描述                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| childrenKey             | string `('children')`                                                                         | tree 数据结构 children 属性名称                                                 |
| classPrefix             | string`('picker')`                                                                            | 组件 CSS 类的前缀                                                               |
| data \*                 | Array&lt;DataItemType&gt;                                                                     | tree 数据                                                                       |
| defaultExpandAll        | boolean                                                                                       | 默认展开所有节点                                                                |
| defaultValue            | string                                                                                        | 默认选中的值                                                                    |
| defaultExpandItemValues | any []                                                                                        | 设置默认展开节点的值                                                            |
| disabledItemValues      | string[]                                                                                      | 禁用选项                                                                        |
| draggable               | boolean                                                                                       | 是否可以拖拽                                                                    |
| expandItemValues        | any []                                                                                        | 设置展开节点的值（受控）                                                        |
| getChildren             | (node: DataItemType) => Promise&lt;DataItemType&gt;                                           | 异步加载节点数据                                                                |
| height                  | number `(360px)`                                                                              | menu 的高度。当设置了 virtualized 为 true 时， 可以通过 height 控制 menu 的高度 |
| labelKey                | string `('label')`                                                                            | tree 数据结构 label 属性名称                                                    |
| onChange                | (value:string) => void                                                                        | 数据改变的回调函数                                                              |
| onExpand                | (expandItemValues: any [], activeNode:DataItemType, concat:(data, children) => Array) => void | 树节点展示时的回调                                                              |
| onSelect                | (activeNode:DataItemType, value, event) => void                                               | 选择树节点后的回调函数                                                          |
| onDragStart             | (nodeData:DataItemType, event) => void                                                        | drag start 回调                                                                 |
| onDragEnter             | (nodeData:DataItemType, event) => void                                                        | drag enter 回调                                                                 |
| onDragOver              | (nodeData:DataItemType, event) => void                                                        | drag over 回调                                                                  |
| onDragLeave             | (nodeData:DataItemType, event) => void                                                        | drag leave 回调                                                                 |
| onDragEnd               | (nodeData:DataItemType, event) => void                                                        | drag end 回调                                                                   |
| onDrop                  | (dropData:DropDataType, event) => void                                                        | drop 回调                                                                       |
| renderDragNode          | (nodeData:DataItemType) => ReactNode                                                          | 当 draggable 为 true 时，自定义渲染拖拽节点                                     |
| renderTreeIcon          | (nodeData:DataItemType) => ReactNode                                                          | 自定义渲染 图标                                                                 |
| renderTreeNode          | (nodeData:DataItemType) => ReactNode                                                          | 自定义渲染 tree 节点                                                            |
| searchKeyword           | string                                                                                        | (受控)搜索关键词                                                                |
| value                   | string                                                                                        | 当前选中的值                                                                    |
| valueKey                | string `('value')`                                                                            | tree 数据结构 value 属性名称                                                    |
| virtualized             | boolean `(true)`                                                                              | 是否开启虚拟列表                                                                |

## 相关组件

- [`<CheckTree>`](./check-tree) 用于展示一个树结构数据，同时支持 Checkbox 选择。
- [`<TreePicker>`](./tree-picker) 选择器组件，树形单项选择器。
- [`<CheckTreePicker>`](./check-tree-picker) 选择器组件，在 TreePicker 节点上支持 Checkbox，用于多选 。
