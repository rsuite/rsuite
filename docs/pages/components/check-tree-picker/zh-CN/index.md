# CheckTreePicker 树形多项选择器

多项选择器中支持树形结构，用于复杂的数据结构进行多选。

## 获取组件

<!--{include:(components/check-tree-picker/fragments/import.md)}-->

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

## 无障碍设计

了解更多有关[无障碍设计](../guide/accessibility)的信息。

## Props

<!--{include:(_common/types/data-item-type.md)}-->
<!--{include:(_common/types/placement.md)}-->

### `<CheckTreePicker>`

| 属性名称                | 类型 `(默认值)`                                                                               | 描述                                                                            |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| appearance              | enum: 'default', 'subtle' `('default')`                                                       | 设置外观                                                                        |
| block                   | boolean                                                                                       | 堵塞整行                                                                        |
| cascade                 | boolean                                                                                       | checktree 是否级联选择                                                          |
| childrenKey             | string `('children')`                                                                         | tree 数据结构 children 属性名称                                                 |
| cleanable               | boolean `(true)`                                                                              | 是否可以清除                                                                    |
| container               | HTMLElement or (() => HTMLElement)                                                            | 设置渲染的容器                                                                  |
| countable               | boolean `(true)`                                                                              | 是否显示已选项的计数                                                            |
| data \*                 | DataItemType[]                                                                                | tree 数据                                                                       |
| defaultExpandAll        | boolean                                                                                       | 默认展开所有节点                                                                |
| defaultExpandItemValues | any []                                                                                        | 设置默认展开节点的值                                                            |
| defaultValue            | string[]                                                                                      | 默认选中的值                                                                    |
| disabled                | boolean                                                                                       | 是否禁用 Picker                                                                 |
| disabledItemValues      | string[]                                                                                      | 禁用选项                                                                        |
| expandItemValues        | any []                                                                                        | 设置展开节点的值（受控）                                                        |
| getChildren             | (node: DataItemType) => Promise&lt;DataItemType&gt;                                           | 异步加载节点数据                                                                |
| height                  | number `(360px)`                                                                              | menu 的高度。当设置了 virtualized 为 true 时， 可以通过 height 控制 menu 的高度 |
| labelKey                | string `('label')`                                                                            | tree 数据结构 label 属性名称                                                    |
| menuClassName           | string                                                                                        | 选项菜单的 className                                                            |
| menuStyle               | CSSProperties                                                                                 | 应用于菜单 DOM 节点的 style                                                     |
| onChange                | (values:string[]) => void                                                                     | 数据改变的回调函数                                                              |
| onClean                 | (event:SyntheticEvent) => void                                                                | 值清理时触发回调                                                                |
| onClose                 | () => void                                                                                    | 关闭的回调函数                                                                  |
| onEnter                 | () => void                                                                                    | 显示前动画过渡的回调函数                                                        |
| onEntered               | () => void                                                                                    | 显示后动画过渡的回调函数                                                        |
| onEntering              | () => void                                                                                    | 显示中动画过渡的回调函数                                                        |
| onExit                  | () => void                                                                                    | 退出前动画过渡的回调函数                                                        |
| onExited                | () => void                                                                                    | 退出后动画过渡的回调函数                                                        |
| onExiting               | () => void                                                                                    | 退出中动画过渡的回调函数                                                        |
| onExpand                | (expandItemValues: any [], activeNode:DataItemType, concat:(data, children) => Array) => void | 树节点展示时的回调                                                              |
| onOpen                  | () => void                                                                                    | 展开的回调函数                                                                  |
| onSearch                | (searchKeyword:string, event)=void                                                            | 搜索回调函数                                                                    |
| onSelect                | (activeNode:DataItemType,value:any, event) => void                                            | 选择树节点后的回调函数                                                          |
| placeholder             | ReactNode `('Select')`                                                                        | 占位符                                                                          |
| placement               | enum: Placement `('bottomStart')`                                                             | 打开位置                                                                        |
| preventOverflow         | boolean                                                                                       | 防止浮动元素溢出                                                                |
| renderExtraFooter       | () => ReactNode                                                                               | 自定义页脚内容                                                                  |
| renderMenu              | (menu: string,ReactNode) => ReactNode                                                         | 自定义渲染菜单                                                                  |
| renderTreeIcon          | (nodeData:DataItemType) => ReactNode                                                          | 自定义渲染 图标                                                                 |
| renderTreeNode          | (nodeData:DataItemType) => ReactNode                                                          | 自定义渲染 tree 节点                                                            |
| renderValue             | (values:string[], checkedItems:DataItemType[],selectedElement:ReactNode) => ReactNode         | 自定义渲染 placeholder                                                          |
| searchBy                | (keyword: string, label: ReactNode, item: ItemDataType) => boolean                            | 自定义搜索规则                                                                  |
| searchable              | boolean `(true)`                                                                              | 是否显示搜索框                                                                  |
| size                    | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                         | 设置组件尺寸                                                                    |
| toggleAs                | ElementType `('a')`                                                                           | 为组件自定义元素类型                                                            |
| uncheckableItemValues   | string[]                                                                                      | 设置不显示复选框的选项值                                                        |
| value                   | string[]                                                                                      | 当前选中的值                                                                    |
| valueKey                | string `('value')`                                                                            | tree 数据结构 value 属性名称                                                    |
| virtualized             | boolean `(true)`                                                                              | 是否开启虚拟列表                                                                |

## 相关组件

- [`<CheckTree>`](./check-tree) 用于展示一个树结构数据，同时支持 Checkbox 选择。
- [`<Tree>`](./tree) 用于展示一个树结构数据。
- [`<TreePicker>`](./tree-picker) 选择器组件，树形单项选择器。
