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

### `<MultiCascader>`

| 属性                  | 类型`(默认值)`                                                                                  | 描述                                           |
| --------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| appearance            | 'default' &#124; 'subtle' `('default')`                                                         | 设置选择器的外观样式。                         |
| block                 | boolean                                                                                         | 块级显示，占满整个行。                         |
| caretAs               | ElementType                                                                                     | 自定义下拉箭头的组件。                         |
| cascade               | boolean `(true)`                                                                                | 确定选择是否应该在父节点与子节点之间双向级联。 |
| childrenKey           | string `('children')`                                                                           | 定义数据中用于访问子节点的键名。               |
| classPrefix           | string `('picker')`                                                                             | 设置组件的 CSS 类前缀。                        |
| cleanable             | boolean `(true)`                                                                                | 是否允许清除已选择的值。                       |
| container             | HTMLElement &#124; (() => HTMLElement)                                                          | 设置渲染容器。                                 |
| countable             | boolean `(true)`                                                                                | 启用已选项的计数显示。                         |
| data \*               | [ItemDataType][item][]                                                                          | 定义组件使用的数据结构。                       |
| defaultOpen           | boolean                                                                                         | 是否默认打开组件。                             |
| defaultValue          | string[]                                                                                        | 指定默认选中的值。                             |
| disabled              | boolean                                                                                         | 禁用组件。                                     |
| disabledItemValues    | string                                                                                          | 定义应禁用的选项值。                           |
| height                | number `(320)`                                                                                  | 指定下拉菜单的高度。                           |
| labelKey              | string `('label')`                                                                              | 定义数据中用于访问标签的键名。                 |
| loading               | boolean `(false)`                                                                               | 是否显示加载状态指示器。                       |
| locale                | [PickerLocaleType](/guide/i18n/#pickers)                                                        | 设置本地化文本。                               |
| onChange              | (value: string[], event) => void                                                                | 当选择的值发生变化时触发的回调函数。           |
| onCheck               | (value: string, item: [ItemDataType][item], checked: boolean, event) => void                    | 当复选框状态变化时触发的回调函数。             |
| onClean               | (event) => void                                                                                 | 当清除值时触发的回调函数。                     |
| onClose               | () => void                                                                                      | 当组件关闭时触发的回调函数。                   |
| onEnter               | () => void                                                                                      | 在浮层过渡开始前触发的回调函数。               |
| onEntered             | () => void                                                                                      | 在浮层完成过渡后触发的回调函数。               |
| onEntering            | () => void                                                                                      | 在浮层开始过渡时触发的回调函数。               |
| onExit                | () => void                                                                                      | 在浮层过渡结束前触发的回调函数。               |
| onExited              | () => void                                                                                      | 在浮层完成过渡后触发的回调函数。               |
| onExiting             | () => void                                                                                      | 在浮层开始过渡结束时触发的回调函数。           |
| onOpen                | () => void                                                                                      | 当组件打开时触发的回调函数。                   |
| onSearch              | (searchKeyword: string, event) => void                                                          | 搜索时触发的回调函数。                         |
| onSelect              | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void              | 当选中某个选项时触发的回调函数。               |
| open                  | boolean                                                                                         | 是否打开组件。                                 |
| placeholder           | ReactNode `('Select')`                                                                          | 设置占位符文本。                               |
| placement             | [Placement](#code-ts-placement-code)`('bottomStart')`                                           | 设置组件的弹出位置。                           |
| popupClassName        | string                                                                                          | 自定义弹出框的类名。                           |
| popupStyle            | CSSProperties                                                                                   | 自定义弹出框的样式。                           |
| preventOverflow       | boolean                                                                                         | 防止浮动元素溢出。                             |
| renderColumn          | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode                       | 自定义每一列的渲染方式。                       |
| renderExtraFooter     | () => ReactNode                                                                                 | 自定义额外页脚的渲染方式。                     |
| renderTreeNode        | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                                      | 自定义树节点的渲染方式。                       |
| renderValue           | (value: string, selectedItems: [ItemDataType][item][], selectedElement: ReactNode) => ReactNode | 自定义已选项的渲染方式。                       |
| searchable            | boolean `(true)`                                                                                | 是否启用搜索功能。                             |
| size                  | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                               | 设置选择器的大小。                             |
| toggleAs              | ElementType `('a')`                                                                             | 使用自定义元素作为组件。                       |
| uncheckableItemValues | string                                                                                          | 设置无法勾选的选项值。                         |
| value                 | string[]                                                                                        | 指定已选项的值（受控）。                       |
| valueKey              | string `('value')`                                                                              | 定义数据中用于访问值的键名。                   |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement-start.md)}-->

[item]: #code-ts-item-data-type-code
