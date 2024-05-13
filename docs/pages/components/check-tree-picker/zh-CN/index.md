# CheckTreePicker 树形多项选择器

多项选择器中支持树形结构，用于复杂的数据结构进行多选。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 级联选择

`cascade` 属性可以设置 CheckTreePicker 在选择的时候是否可考虑子父级的级联关系，默认为 `true`。

<!--{include:`cascade.md`}-->

### 位置

<!--{include:`placement.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 自定义选项

<!--{include:`custom.md`}-->

### 异步

<!--{include:`async.md`}-->

### 自定义页脚

<!--{include:`extra-footer.md`}-->

## 可访问性

### ARIA 属性

**combobox**

- CheckTreePicker 组件的 `role` 属性为 `combobox`。
- 有 `aria-activedescendant` 属性来指示焦点选项的 ID。
- 有 `aria-haspopup="tree"` 属性来指示 combobox 有一个弹出的树形列表框。
- 有 `aria-controls` 属性来指示树形列表框元素的 ID。
- 当设置了 `label`, `aria-labelledby` 属性被添加到 combobox 元素和 tree 元素上，并将值设置为 `label` 的 `id` 属性值。

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
- <kbd>→</kbd> - 展开当前树节点。
- <kbd>←</kbd> - 收起当前树节点。
- <kbd>Enter</kbd> - 选择聚焦的树节点。
- <kbd>Esc</kbd> - 关闭树形列表框。

## Props

### `<CheckTreePicker>`

| 属性名称                | 类型 `(默认值)`                                                                                | 描述                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------- |
| appearance              | 'default' \| 'subtle' `('default')`                                                            | 设置外观                                |
| block                   | boolean                                                                                        | 堵塞整行                                |
| caretAs                 | ElementType                                                                                    | 自定义右侧箭头图标的组件                |
| cascade                 | boolean                                                                                        | checktree 是否级联选择                  |
| childrenKey             | string `('children')`                                                                          | tree 数据结构 children 属性名称         |
| cleanable               | boolean `(true)`                                                                               | 是否可以清除                            |
| container               | HTMLElement \| (() => HTMLElement)                                                             | 设置渲染的容器                          |
| countable               | boolean `(true)`                                                                               | 是否显示已选项的计数                    |
| data \*                 | [TreeNode][node][]                                                                             | tree 数据                               |
| defaultExpandAll        | boolean                                                                                        | 默认展开所有节点                        |
| defaultExpandItemValues | string []                                                                                      | 设置默认展开节点的值                    |
| defaultValue            | string[]                                                                                       | 默认选中的值                            |
| disabled                | boolean                                                                                        | 是否禁用 Picker                         |
| disabledItemValues      | string[]                                                                                       | 禁用选项                                |
| expandItemValues        | string []                                                                                      | 设置展开节点的值（受控）                |
| getChildren             | (item: [TreeNode][node]) => Promise&lt;[TreeNode][node]&gt;                                    | 异步加载节点数据                        |
| ~height~                | number                                                                                         | ⚠️`[已弃用]` 使用 `treeHeight` 代替     |
| labelKey                | string `('label')`                                                                             | tree 数据结构 label 属性名称            |
| listProps               | [ListProps][listprops]                                                                         | 虚拟化长列表的相关属性                  |
| loading                 | boolean `(false)`                                                                              | 是否显示一个加载中状态指示器            |
| locale                  | [PickerLocaleType](/zh/guide/i18n/#pickers)                                                    | 本地化的文本                            |
| ~menuClassName~         | string                                                                                         | ⚠️`[已弃用]` 使用 `popupClassName` 代替 |
| ~menuStyle~             | CSSProperties                                                                                  | ⚠️`[已弃用]` 使用 `popupStyle` 代替     |
| onChange                | (values:string[]) => void                                                                      | 数据改变的回调函数                      |
| onClean                 | (event) => void                                                                                | 值清理时触发回调                        |
| onClose                 | () => void                                                                                     | 关闭的回调函数                          |
| onEnter                 | () => void                                                                                     | 显示前动画过渡的回调函数                |
| onEntered               | () => void                                                                                     | 显示后动画过渡的回调函数                |
| onEntering              | () => void                                                                                     | 显示中动画过渡的回调函数                |
| onExit                  | () => void                                                                                     | 退出前动画过渡的回调函数                |
| onExited                | () => void                                                                                     | 退出后动画过渡的回调函数                |
| onExiting               | () => void                                                                                     | 退出中动画过渡的回调函数                |
| onExpand                | (expandItemValues: string[], item: [TreeNode][node], concat:(data, children) => Array) => void | 树节点展示时的回调                      |
| onOpen                  | () => void                                                                                     | 展开的回调函数                          |
| onSearch                | (searchKeyword:string, event)=void                                                             | 搜索回调函数                            |
| onSelect                | (item:[TreeNode][node],value:string, event) => void                                            | 选择树节点后的回调函数                  |
| open                    | boolean                                                                                        | 是否打开                                |
| placeholder             | ReactNode `('Select')`                                                                         | 占位符                                  |
| placement               | [Placement](#code-ts-placement-code) `('bottomStart')`                                         | 打开位置                                |
| popupClassName          | string                                                                                         | 设置弹出层的 CSS 类名                   |
| popupStyle              | CSSProperties                                                                                  | 设置弹出层的样式                        |
| preventOverflow         | boolean                                                                                        | 防止浮动元素溢出                        |
| renderExtraFooter       | () => ReactNode                                                                                | 自定义页脚内容                          |
| renderMenu              | (menu: ReactNode) => ReactNode                                                                 | 自定义渲染菜单                          |
| renderTreeIcon          | (item:[TreeNode][node], expanded: boolean) => ReactNode                                        | 自定义渲染 图标                         |
| renderTreeNode          | (item:[TreeNode][node]) => ReactNode                                                           | 自定义渲染 tree 节点                    |
| renderValue             | (values:string[], checkedItems:[TreeNode][node][],selectedElement: ReactNode) => ReactNode     | 自定义渲染 placeholder                  |
| searchable              | boolean `(true)`                                                                               | 是否显示搜索框                          |
| searchBy                | (keyword: string, label: ReactNode, item: [TreeNode][node]) => boolean                         | 自定义搜索规则                          |
| size                    | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                                          | 设置组件尺寸                            |
| toggleAs                | ElementType `('a')`                                                                            | 为组件自定义元素类型                    |
| treeHeight              | number `(320)`                                                                                 | 设置树的高度                            |
| uncheckableItemValues   | string[]                                                                                       | 设置不显示复选框的选项值                |
| value                   | string[]                                                                                       | 当前选中的值                            |
| valueKey                | string `('value')`                                                                             | 数据中 value 属性名称                   |
| virtualized             | boolean                                                                                        | 是否开启虚拟列表                        |

<!--{include:(_common/types/tree-node.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## 相关组件

- [`<CheckTree>`](/zh/components/check-tree) 用于展示一个树结构数据，同时支持 Checkbox 选择。
- [`<Tree>`](/zh/components/tree) 用于展示一个树结构数据。
- [`<TreePicker>`](/zh/components/tree-picker) 选择器组件，树形单项选择器。

[listprops]: #code-ts-list-props-code
[node]: #code-ts-tree-node-code
