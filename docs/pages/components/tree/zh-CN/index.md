# Tree 树型控件

`<Tree>` 用于展示一个树结构数据。

## 获取组件

<!--{include:(components/tree/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 显示缩进线

<!--{include:`show-indent-line.md`}-->

### 可拖拽

<!--{include:`draggable.md`}-->

### 异步加载

<!--{include:`async.md`}-->

## Props

### `<Tree>`

| 属性名称                | 类型 `(默认值)`                                                                                    | 描述                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| childrenKey             | string `('children')`                                                                              | tree 数据结构 children 属性名称                                                 |
| classPrefix             | string`('picker')`                                                                                 | 组件 CSS 类的前缀                                                               |
| data \*                 | [ItemDataType][item]                                                                               | tree 数据                                                                       |
| defaultExpandAll        | boolean                                                                                            | 默认展开所有节点                                                                |
| defaultExpandItemValues | string[]                                                                                           | 设置默认展开节点的值                                                            |
| defaultValue            | string                                                                                             | 默认选中的值                                                                    |
| disabledItemValues      | string[]                                                                                           | 禁用选项                                                                        |
| draggable               | boolean                                                                                            | 是否可以拖拽                                                                    |
| expandItemValues        | string[]                                                                                           | 设置展开节点的值（受控）                                                        |
| getChildren             | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item]&gt;                                | 异步加载节点数据                                                                |
| height                  | number `(360px)`                                                                                   | menu 的高度。当设置了 virtualized 为 true 时， 可以通过 height 控制 menu 的高度 |
| labelKey                | string `('label')`                                                                                 | tree 数据结构 label 属性名称                                                    |
| listProps               | [ListProps][listprops]                                                                             | 虚拟化长列表的相关属性                                                          |
| onChange                | (value:string) => void                                                                             | 数据改变的回调函数                                                              |
| onDragEnd               | (item: [ItemDataType][item], event) => void                                                        | drag end 回调                                                                   |
| onDragEnter             | (item: [ItemDataType][item], event) => void                                                        | drag enter 回调                                                                 |
| onDragLeave             | (item: [ItemDataType][item], event) => void                                                        | drag leave 回调                                                                 |
| onDragOver              | (item: [ItemDataType][item], event) => void                                                        | drag over 回调                                                                  |
| onDragStart             | (item: [ItemDataType][item], event) => void                                                        | drag start 回调                                                                 |
| onDrop                  | (dropData: [DropDataType][drop], event) => void                                                    | drop 回调                                                                       |
| onExpand                | (expandItemValues: string[], item: [ItemDataType][item], concat:(data, children) => Array) => void | 树节点展示时的回调                                                              |
| onSelect                | (item: [ItemDataType][item], value, event) => void                                                 | 选择树节点后的回调函数                                                          |
| renderTreeIcon          | (item: [ItemDataType][item]) => ReactNode                                                          | 自定义渲染 图标                                                                 |
| renderTreeNode          | (item: [ItemDataType][item]) => ReactNode                                                          | 自定义渲染 tree 节点                                                            |
| searchKeyword           | string                                                                                             | (受控)搜索关键词                                                                |
| showIndentLine          | boolean                                                                                            | 是否显示缩进线                                                                  |
| value                   | string                                                                                             | 当前选中的值                                                                    |
| valueKey                | string `('value')`                                                                                 | tree 数据结构 value 属性名称                                                    |
| virtualized             | boolean                                                                                            | 是否开启虚拟列表                                                                |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/list-props.md)}-->
<!--{include:(components/tree/fragments/drop-data-type.md)}-->

## 相关组件

- [`<CheckTree>`](/zh/components/check-tree) 用于展示一个树结构数据，同时支持 Checkbox 选择。
- [`<TreePicker>`](/zh/components/tree-picker) 选择器组件，树形单项选择器。
- [`<CheckTreePicker>`](/zh/components/check-tree-picker) 选择器组件，在 TreePicker 节点上支持 Checkbox，用于多选 。

[listprops]: #code-ts-list-props-code
[item]: #code-ts-item-data-type-code
[drop]: #code-ts-drop-data-type-code
