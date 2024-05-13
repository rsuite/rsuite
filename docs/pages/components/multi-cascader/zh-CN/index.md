# MultiCascader 级联多项选择器

对有层级关系结构的数据进行多项选择。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 级联

<!--{include:`cascade.md`}-->

### 默认值

<!--{include:`default-value.md`}-->

### 受控

<!--{include:`controlled.md`}-->

### 撑满

<!--{include:`block.md`}-->

### 位置

<!--{include:`placement.md`}-->

### 自定义选项

<!--{include:`custom.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 不可选状态

<!--{include:`uncheckable.md`}-->

### 异步

<!--{include:`async.md`}-->

### 容器与防止溢出

<!--{include:`container.md`}-->

## 可访问性

### ARIA 属性

- MultiCascader 组件的 `role` 属性为 `combobox`。
- 有 `aria-haspopup="tree"` 属性来指示 combobox 有一个弹出的树形列表框。
- 有 `aria-expanded` 属性来指示树形列表框是否打开。
- 有 `aria-controls` 属性来指示树形列表框元素的 ID。
- 有 `aria-activedescendant` 属性来指示焦点树节点的 ID。
- 当设置了 `label`, `aria-labelledby` 属性被添加到 combobox 元素和 tree 元素上，并将值设置为 `label` 的 `id` 属性值。
- tree 有 `aria-multiselectable=true` 属性来指示树形列表框是多选的。

### 键盘交互

- <kbd>↓</kbd> - 移动焦点到下一个树节点。
- <kbd>↑</kbd> - 移动焦点到上一个树节点。
- <kbd>→</kbd> - 展开当前树节点。
- <kbd>←</kbd> - 收起当前树节点。
- <kbd>Enter</kbd> - 选择聚焦的树节点。
- <kbd>Esc</kbd> - 关闭树形列表框。

## Props

<!--{include:(_common/types/item-data-type.md)}-->

### `<MultiCascader>`

<!-- prettier-sort-markdown-table -->

| 属性名称              | 类型`(默认值)`                                                                                  | 描述                                       |
| --------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------ |
| appearance            | 'default' &#124; 'subtle' `('default')`                                                         | 设置外观                                   |
| block                 | boolean                                                                                         | 堵塞整行                                   |
| caretAs               | ElementType                                                                                     | 自定义右侧箭头图标的组件                   |
| cascade               | boolean `(true)`                                                                                | 是否级联选择                               |
| childrenKey           | string `('children')`                                                                           | 设置选项子节点在 `data` 中的 `key`         |
| classPrefix           | string `('picker')`                                                                             | 组件 CSS 类的前缀                          |
| cleanable             | boolean `(true)`                                                                                | 可以清除                                   |
| columnHeight          | number                                                                                          | 设置菜单的高度                             |
| columnWidth           | number                                                                                          | 设置菜单的宽度                             |
| container             | HTMLElement &#124; (() => HTMLElement)                                                          | 设置渲染的容器                             |
| countable             | boolean `(true)`                                                                                | 可以计数已选项                             |
| data \*               | [ItemDataType][item][]                                                                          | 组件数据                                   |
| defaultOpen           | boolean                                                                                         | 默认打开                                   |
| defaultValue          | string[]                                                                                          | 设置默认值                                 |
| disabled              | boolean                                                                                         | 禁用组件                                   |
| disabledItemValues    | string                                                                                          | 禁用选项                                   |
| height                | number `(320)`                                                                                  | 设置 Dropdown 的高度                       |
| inline                | boolean                                                                                         | 在组件初始后直接展示菜单                   |
| ~inline~              | boolean                                                                                         | ⚠️`[已弃用]` 使用 `<CascadeTree>` 组件代替 |
| labelKey              | string `('label')`                                                                              | 设置选项显示内容在 `data` 中的 `key`       |
| loading               | boolean `(false)`                                                                               | 是否显示一个加载中状态指示器               |
| locale                | [PickerLocaleType](/zh/guide/i18n/#pickers)                                                     | 本地化的文本                               |
| menuClassName         | string                                                                                          | 选项菜单的 className                       |
| ~menuClassName~       | string                                                                                          | ⚠️`[已弃用]` 使用 `popupClassName` 代替    |
| menuHeight            | number `(200)`                                                                                  | 设置菜单的高度                             |
| ~menuHeight~          | number                                                                                          | ⚠️`[已弃用]` 使用 `columnHeight` 代替      |
| ~menuStyle~           | CSSProperties                                                                                   | ⚠️`[已弃用]` 使用 `popupStyle` 代替        |
| menuWidth             | number `(156)`                                                                                  | 设置菜单的宽度                             |
| ~menuWidth~           | number                                                                                          | ⚠️`[已弃用]` 使用 `columnWidth` 代替       |
| onChange              | (value: string, event) => void                                                                  | `value` 发生改变时的回调函数               |
| onCheck               | (value: ValueType, item:[ItemDataType][item], checked:boolean, event) => void;                  | 复选框选中状态发生变化的回调函数           |
| onClean               | (event) => void                                                                                 | 清空值时触发回调                           |
| onClose               | () => void                                                                                      | 关闭回调函数                               |
| onEnter               | () => void                                                                                      | 显示前动画过渡的回调函数                   |
| onEntered             | () => void                                                                                      | 显示后动画过渡的回调函数                   |
| onEntering            | () => void                                                                                      | 显示中动画过渡的回调函数                   |
| onExit                | () => void                                                                                      | 退出前动画过渡的回调函数                   |
| onExited              | () => void                                                                                      | 退出后动画过渡的回调函数                   |
| onExiting             | () => void                                                                                      | 退出中动画过渡的回调函数                   |
| onOpen                | () => void                                                                                      | 打开回调函数                               |
| onSearch              | (searchKeyword:string, event) => void                                                           | 搜索的回调函数                             |
| onSelect              | (item:[ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void               | 选项被点击选择后的回调函数                 |
| open                  | boolean                                                                                         | 打开 (受控)                                |
| placeholder           | ReactNode `('Select')`                                                                          | 占位符                                     |
| placement             | [Placement](#code-ts-placement-code)`('bottomStart')`                                           | 打开位置                                   |
| popupClassName        | string                                                                                          | 设置弹出层的 CSS 类名                      |
| popupStyle            | CSSProperties                                                                                   | 设置弹出层的样式                           |
| preventOverflow       | boolean                                                                                         | 防止浮动元素溢出                           |
| renderColumn          | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode                       | 自定义渲染菜单列表                         |
| renderExtraFooter     | () => ReactNode                                                                                 | 自定义页脚内容                             |
| ~renderMenu~          | (children: object[], menu:ReactNode, parentNode?: object, layer?: number) => ReactNode          | ⚠️`[已弃用]` 使用 `renderColumn` 代替      |
| ~renderMenuItem~      | (label:ReactNode, item: [ItemDataType][item] ) => ReactNode                                     | ⚠️`[已弃用]` 使用 `renderTreeNode` 代替    |
| renderTreeNode        | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                                      | 自定义选项                                 |
| renderValue           | (value:string, selectedItems: [ItemDataType][item][], selectedElement: ReactNode ) => ReactNode | 自定义被选中的选项                         |
| searchable            | boolean `(true)`                                                                                | 可以搜索                                   |
| size                  | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                               | 设置组件尺寸                               |
| toggleAs              | ElementType `('a')`                                                                             | 为组件自定义元素类型                       |
| uncheckableItemValues | string                                                                                          | 设置不显示复选框的选项值                   |
| value                 | string[]                                                                                          | 设置值（受控）                             |
| valueKey              | string `('value')`                                                                              | 设置选项值在 `data` 中的 `key`             |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement-start.md)}-->

[item]: #code-ts-item-data-type-code
