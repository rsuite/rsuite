# CheckTree 树形多选控件

`<CheckTree>` 用于展示一个树结构数据，同时支持 Checkbox 选择。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 级联选择

`cascade` 属性可以设置 CheckTree 在选择的时候是否可考虑子父级的级联关系，默认为 `true`。

<!--{include:`cascade.md`}-->

### 显示缩进线

<!--{include:`show-indent-line.md`}-->

### 自定义树节点

<!--{include:`custom.md`}-->

### 虚拟化

<!--{include:`virtualized.md`}-->

### 异步载入子节点

<!--{include:`async.md`}-->

### 可搜索

<!--{include:`searchable.md`}-->

### 不可选择的树节点

<!--{include:`uncheckable.md`}-->

### 禁用的树节点

<!--{include:`disabled.md`}-->

### 滚动阴影

<!--{include:`scroll-shadow.md`}-->

## 可访问性

### ARIA 属性

**tree**

- CheckTree 组件的 `role` 属性为 `tree`。
- CheckTree 有 `aria-multiselectable=true` 属性来指示树形列表框是多选的。

**treeitem**

- CheckTree 节点的 `role` 属性为 `treeitem`。
- 有 `aria-expanded` 属性来指示树形列表框是否打开。
- 有 `aria-checked` 属性来指示树节点是否被选中。
- 有 `aria-level` 属性来指示树节点的层级。
- 有 `aria-disabled` 属性来指示树节点是否被禁用。

### 键盘交互

- <kbd>↓</kbd> - 移动焦点到下一个树节点。
- <kbd>↑</kbd> - 移动焦点到上一个树节点。
- <kbd>→</kbd> - 展开焦点树节点，如果它是折叠的。
- <kbd>←</kbd> - 折叠焦点树节点，如果它是展开的。
- <kbd>Enter</kbd> - 选择焦点树节点。

## Props

### `<CheckTree>`

| 属性名称                | 类型 `(默认值)`                                                                                | 描述                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| cascade                 | boolean `(true)`                                                                               | 是否启用级联选择                           |
| childrenKey             | string `('children')`                                                                          | 设置树节点的子节点在 `data` 中的 `key`     |
| data \*                 | [TreeNode][node][]                                                                             | 渲染树的数据                               |
| defaultExpandAll        | boolean                                                                                        | 默认展开所有节点                           |
| defaultExpandItemValues | string[]                                                                                       | 设置默认展开节点的值                       |
| defaultValue            | string[]                                                                                       | 默认选中的值                               |
| disabledItemValues      | string[]                                                                                       | 禁用节点列表                               |
| expandItemValues        | string[]                                                                                       | 设置展开节点的值（受控）                   |
| getChildren             | (item: [TreeNode][node]) => Promise&lt;[TreeNode][node]&gt;                                    | 异步加载节点数据                           |
| height                  | number `(360px)`                                                                               | 设置树的高度                               |
| labelKey                | string `('label')`                                                                             | 设置树节点显示内容在 `data` 中的 `key`     |
| listProps               | [ListProps][listprops]                                                                         | 虚拟化长列表的相关属性                     |
| onChange                | (values: string[]) => void                                                                     | 值改变的回调                               |
| onExpand                | (expandItemValues: string[], item: [TreeNode][node], concat:(data, children) => Array) => void | 树节点展开子节点时的回调                   |
| onSearch                | (keyword: string) => void                                                                      | 搜索回调函数                               |
| onSelect                | (item: [TreeNode][node],value: string, event) => void                                          | 选择树节点后的回调函数                     |
| renderTreeIcon          | (item:[TreeNode][node], expanded: boolean) => ReactNode                                        | 自定义渲染树节点图标                       |
| renderTreeNode          | (item: [TreeNode][node]) => ReactNode                                                          | 自定义渲染树节点                           |
| scrollShadow            | boolean                                                                                        | 滚动时候显示内容区域的阴影<br/>![][5.62.0] |
| searchable              | boolean                                                                                        | 是否显示搜索框<br/>![][5.61.0]             |
| searchKeyword           | string                                                                                         | 为搜索框设置搜索关键词                     |
| uncheckableItemValues   | string[]                                                                                       | 设置不显示复选框的树节点值                 |
| value                   | string[]                                                                                       | 当前选中的值                               |
| valueKey                | string `('value')`                                                                             | 设置树节点值在 `data` 中的 `key`           |
| virtualized             | boolean                                                                                        | 是否开启虚拟列表                           |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## 相关组件

- [`<Tree>`](/zh/components/tree) 用于展示一个树结构数据。
- [`<TreePicker>`](/zh/components/tree-picker) 选择器组件，树形单项选择器。
- [`<CheckTreePicker>`](/zh/components/check-tree-picker) 选择器组件，在 TreePicker 节点上支持 Checkbox，用于多选 。

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
[5.61.0]: https://img.shields.io/badge/>=-v5.61.0-blue
[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
