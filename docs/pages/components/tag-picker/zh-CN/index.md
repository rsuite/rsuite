# TagPicker 标签选择器

以标签的方式进行多选，同时支持新增选项

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 撑满

<!--{include:`block.md`}-->

### 分支

<!--{include:`group.md`}-->

### 可新建

<!--{include:`creatable.md`}-->

### 自定义

<!--{include:`custom.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 异步

<!--{include:`async.md`}-->

## 响应式

在小屏幕设备上，选择列表将被转换为弹出式选择器。 为了不影响组件的搜索功能，只有在设置 `searchable={false}` 时，才会生效。

<!--{include:<example-responsive>}-->

## 可访问性

### ARIA 属性

- TagPicker 组件的 `role` 属性为 `combobox`。
- 有 `aria-haspopup="listbox"` 属性来指示 combobox 有一个弹出的列表框。
- 有 `aria-expanded` 属性来指示列表框是否打开。
- 有 `aria-controls` 属性来指示列表框元素的 ID。
- 有 `aria-activedescendant` 属性来指示焦点选项的 ID。
- 当设置了 `label`, `aria-labelledby` 属性被添加到 combobox 元素和 listbox 元素上，并将值设置为 `label` 的 `id` 属性值。
- listbox 有 `aria-multiselectable=true` 属性来指示列表框是多选的。

### 键盘交互

- <kbd>↓</kbd> - 移动焦点到下一个选项。
- <kbd>↑</kbd> - 移动焦点到上一个选项。
- <kbd>Enter</kbd> - 选择焦点选项。
- <kbd>Esc</kbd> - 关闭列表框。

## Props

### `<TagPicker>`

| 属性名称           | 类型`(默认值)`                                                             | 描述                           |
| ------------------ | -------------------------------------------------------------------------- | ------------------------------ |
| cacheData          | [Option][item][]                                                           | 缓存异步搜索时的选项数据       |
| classPrefix        | string `('picker')`                                                        | 组件 CSS 类的前缀              |
| cleanable          | boolean `(true)`                                                           | 是否可以清除选择               |
| container          | HTMLElement \| (() => HTMLElement)                                         | 设置渲染的容器                 |
| creatable          | boolean                                                                    | 是否可以创建新选项             |
| data \*            | [Option][item][]                                                           | 选项数据                       |
| defaultValue       | string[]                                                                   | 默认选中值（非受控）           |
| disabled           | boolean                                                                    | 是否禁用组件                   |
| disabledItemValues | string[]                                                                   | 禁用选项值                     |
| groupBy            | string                                                                     | 选项分组依据的 `data` 中的键名 |
| labelKey           | string `('label')`                                                         | 选项显示内容的键名             |
| listboxMaxHeight   | number `(320)`                                                             | 设置 Listbox 的最大高度        |
| listProps          | [ListProps][listprops]                                                     | 虚拟列表的属性                 |
| loading            | boolean `(false)`                                                          | 是否显示加载中状态             |
| onChange           | (value:string, event) => void                                              | 值变化时的回调函数             |
| onClean            | (event) => void                                                            | 值被清除时的回调函数           |
| onClose            | () => void                                                                 | 关闭时的回调函数               |
| onCreate           | (value: string[], item: [Option][item], event) => void                     | 创建新选项时的回调函数         |
| onEnter            | () => void                                                                 | 显示前动画开始时的回调函数     |
| onEntered          | () => void                                                                 | 显示动画结束后的回调函数       |
| onEntering         | () => void                                                                 | 显示动画进行中的回调函数       |
| onExit             | () => void                                                                 | 退出前动画开始时的回调函数     |
| onExited           | () => void                                                                 | 退出动画结束后的回调函数       |
| onExiting          | () => void                                                                 | 退出动画进行中的回调函数       |
| onGroupTitleClick  | (event) => void                                                            | 点击分组标题的回调函数         |
| onOpen             | () => void                                                                 | 打开时的回调函数               |
| onSearch           | (searchKeyword: string, event) => void                                     | 执行搜索时的回调函数           |
| onSelect           | (value: string, item: [Option][item] , event) => void                      | 选择选项时的回调函数           |
| onTagRemove        | (value: string, event: MouseEvent) => void                                 | 移除标签时的回调函数           |
| open               | boolean                                                                    | 是否打开选择器                 |
| placeholder        | ReactNode `('Select')`                                                     | 占位符                         |
| placement          | [Placement](#code-ts-placement-code)`('bottomStart')`                      | 弹出位置                       |
| popupClassName     | string                                                                     | 弹出菜单的自定义类名           |
| popupStyle         | CSSProperties                                                              | 弹出菜单的样式                 |
| preventOverflow    | boolean                                                                    | 防止弹出层溢出                 |
| renderCheckbox     | (checkboxProps: CheckboxProps) => ReactNode                                | 自定义选项复选框渲染函数       |
| renderExtraFooter  | () => ReactNode                                                            | 自定义页脚渲染函数             |
| renderListbox      | (listbox: ReactNode) => ReactNode                                          | 自定义列表渲染函数             |
| renderOption       | (label: ReactNode, item: [Option][item]) => ReactNode                      | 自定义选项渲染函数             |
| renderOptionGroup  | (groupTitle: ReactNode, item: [Option][item]) => ReactNode                 | 自定义选项组渲染函数           |
| renderValue        | (value: string[], items: [Option][item][], tags: ReactNode[]) => ReactNode | 自定义选中项渲染函数           |
| searchable         | boolean `(true)`                                                           | 是否可以搜索                   |
| searchBy           | (keyword: string, label: ReactNode, item: [Option][item]) => boolean       | 自定义搜索匹配函数             |
| size               | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                                      | 设置组件尺寸                   |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                           | 选项排序函数                   |
| tagProps           | [TagProps][tagprops]                                                       | 标签的属性                     |
| toggleAs           | ElementType `('a')`                                                        | 自定义切换组件                 |
| trigger            | 'Enter' \| 'Space' \| 'Comma' `('Enter')`                                  | 创建标签的触发键               |
| value              | string[]                                                                   | 当前值（受控）                 |
| valueKey           | string `('value')`                                                         | 选项值的键名                   |
| virtualized        | boolean                                                                    | 是否使用虚拟化列表             |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

[listprops]: #code-ts-list-props-code
[tagprops]: https://rsuitejs.com/components/tag#Props
[item]: #code-ts-option-code
