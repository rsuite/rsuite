# Tree 树型控件

`<Tree>` 用于展示一个树结构数据。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 显示缩进线

<!--{include:`show-indent-line.md`}-->

### 自定义树节点

<!--{include:`custom.md`}-->

### 可拖拽

<!--{include:`draggable.md`}-->

### 虚拟化

<!--{include:`virtualized.md`}-->

### 异步载入子节点

<!--{include:`async.md`}-->

### 可搜索

<!--{include:`searchable.md`}-->

## Props

### `<Tree>`

| 属性名称                | 类型 `(默认值)`                                                                                | 描述                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| childrenKey             | string `('children')`                                                                          | tree 数据结构 children 属性名称                                                 |
| classPrefix             | string`('picker')`                                                                             | 组件 CSS 类的前缀                                                               |
| data \*                 | [TreeNode][item]                                                                               | tree 数据                                                                       |
| defaultExpandAll        | boolean                                                                                        | 默认展开所有节点                                                                |
| defaultExpandItemValues | string[]                                                                                       | 设置默认展开节点的值                                                            |
| defaultValue            | string                                                                                         | 默认选中的值                                                                    |
| disabledItemValues      | string[]                                                                                       | 禁用选项                                                                        |
| draggable               | boolean                                                                                        | 是否可以拖拽                                                                    |
| expandItemValues        | string[]                                                                                       | 设置展开节点的值（受控）                                                        |
| getChildren             | (node: [TreeNode][item]) => Promise&lt;[TreeNode][item]&gt;                                    | 异步加载节点数据                                                                |
| height                  | number `(360px)`                                                                               | menu 的高度。当设置了 virtualized 为 true 时， 可以通过 height 控制 menu 的高度 |
| labelKey                | string `('label')`                                                                             | tree 数据结构 label 属性名称                                                    |
| listProps               | [ListProps][listprops]                                                                         | 虚拟化长列表的相关属性                                                          |
| onChange                | (value:string) => void                                                                         | 数据改变的回调函数                                                              |
| onDragEnd               | (node: [TreeNode][item], event) => void                                                        | 拖拽结束的回调函数                                                              |
| onDragEnter             | (node: [TreeNode][item], event) => void                                                        | 拖拽进入的回调函数                                                              |
| onDragLeave             | (node: [TreeNode][item], event) => void                                                        | 拖拽离开的回调函数                                                              |
| onDragOver              | (node: [TreeNode][item], event) => void                                                        | 拖拽进入的回调函数                                                              |
| onDragStart             | (node: [TreeNode][item], event) => void                                                        | 拖拽开始的回调函数                                                              |
| onDrop                  | (dropData: [DropDataType][drop], event) => void                                                | 拖拽结束的回调函数                                                              |
| onExpand                | (expandItemValues: string[], node: [TreeNode][item], concat:(data, children) => Array) => void | 树节点展示时的回调                                                              |
| onSearch                | (keyword: string) => void                                                                      | 搜索回调函数                                                                    |
| onSelect                | (node: [TreeNode][item], value, event) => void                                                 | 选择树节点后的回调函数                                                          |
| renderTreeIcon          | (node: [TreeNode][item], expanded: boolean) => ReactNode                                                          | 自定义渲染 图标                                                                 |
| renderTreeNode          | (node: [TreeNode][item]) => ReactNode                                                          | 自定义渲染 tree 节点                                                            |
| searchable              | boolean                                                                                        | 是否显示搜索框                                                                  |
| searchKeyword           | string                                                                                         | (受控)搜索关键词                                                                |
| showIndentLine          | boolean                                                                                        | 是否显示缩进线                                                                  |
| value                   | string                                                                                         | 当前选中的值                                                                    |
| valueKey                | string `('value')`                                                                             | tree 数据结构 value 属性名称                                                    |
| virtualized             | boolean                                                                                        | 是否开启虚拟列表                                                                |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/list-props.md)}-->
<!--{include:(components/tree/fragments/drop-data-type.md)}-->

## 相关组件

- [`<CheckTree>`](/zh/components/check-tree) 用于展示一个树结构数据，同时支持 Checkbox 选择。
- [`<TreePicker>`](/zh/components/tree-picker) 选择器组件，树形单项选择器。
- [`<CheckTreePicker>`](/zh/components/check-tree-picker) 选择器组件，在 TreePicker 节点上支持 Checkbox，用于多选 。

[listprops]: #code-ts-list-props-code
[item]: #code-ts-tree-node-code
[drop]: #code-ts-drop-data-type-code
