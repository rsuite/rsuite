# TagPicker 标签选择器

以标签的方式进行多选，同时支持新增选项

- `<TagPicker>`

## 获取组件

<!--{include:(components/tag-picker/fragments/import.md)}-->

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

## 无障碍设计

了解更多有关[无障碍设计](/zh/guide/accessibility)的信息。

## Props

### `<TagPicker>`

| 属性名称           | 类型`(默认值)`                                                                   | 描述                                       |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------ |
| cacheData          | [ItemDataType][item][]                                                           | 当异步搜索时，用于缓存 `value` 的选项      |
| classPrefix        | string `('picker')`                                                              | 组件 CSS 类的前缀                          |
| cleanable          | boolean `(true)`                                                                 | 可以清除                                   |
| container          | HTMLElement &#124; (() => HTMLElement)                                           | 设置渲染的容器                             |
| creatable          | boolean                                                                          | 设置可以新建选项                           |
| data \*            | [ItemDataType][item][]                                                           | 组件数据                                   |
| defaultValue       | string[]                                                                         | 设置默认值 `非受控`                        |
| disabled           | boolean                                                                          | 禁用组件                                   |
| disabledItemValues | string[]                                                                         | 禁用选项                                   |
| groupBy            | string                                                                           | 设置分组条件在 `data` 中的 `key`           |
| labelKey           | string `('label')`                                                               | 设置选项显示内容在 `data` 中的 `key`       |
| listProps          | [ListProps][listprops]                                                           | 虚拟化长列表的相关属性                     |
| menuMaxHeight      | number `(320)`                                                                   | 设置 Dropdown 的最大高度                   |
| menuClassName      | string                                                                           | 应用于菜单 DOM 节点的 css class            |
| menuStyle          | CSSProperties                                                                    | 应用于菜单 DOM 节点的 style                |
| onChange           | (value:string, event) => void                                                    | `value` 发生改变时的回调函数               |
| onClean            | (event) => void                                                                  | 值清理时触发回调                           |
| onClose            | () => void                                                                       | 关闭回调函数                               |
| onCreate           | (value: string[], item: [ItemDataType][item], event) => void                     | 在设置 `creatable`，创建新选项后的回调函数 |
| onEnter            | () => void                                                                       | 显示前动画过渡的回调函数                   |
| onEntered          | () => void                                                                       | 显示后动画过渡的回调函数                   |
| onEntering         | () => void                                                                       | 显示中动画过渡的回调函数                   |
| onExit             | () => void                                                                       | 退出前动画过渡的回调函数                   |
| onExited           | () => void                                                                       | 退出后动画过渡的回调函数                   |
| onExiting          | () => void                                                                       | 退出中动画过渡的回调函数                   |
| onGroupTitleClick  | (event) => void                                                                  | 点击分组标题的回调函数                     |
| onOpen             | () => void                                                                       | 打开回调函数                               |
| onSearch           | (searchKeyword: string, event) => void                                           | 搜索的回调函数                             |
| onSelect           | (value: string, item: [ItemDataType][item] , event) => void                      | 选项被点击选择后的回调函数                 |
| open               | boolean                                                                          | 是否打开                                   |
| placeholder        | ReactNode `('Select')`                                                           | 占位符                                     |
| placement          | [Placement](#code-ts-placement-code)`('bottomStart')`                            | 位置                                       |
| preventOverflow    | boolean                                                                          | 防止浮动元素溢出                           |
| renderExtraFooter  | () => ReactNode                                                                  | 自定义页脚内容                             |
| renderMenuGroup    | (groupTitle: ReactNode, item: [ItemDataType][item]) => ReactNode                 | 自定义选项组                               |
| renderMenuItem     | (label: ReactNode, item: [ItemDataType][item]) => ReactNode                      | 自定义选项                                 |
| renderValue        | (value: string[], items: [ItemDataType][item][], tags: ReactNode[]) => ReactNode | 自定义被选中的选项                         |
| searchBy           | (keyword: string, label: ReactNode, item: [ItemDataType][item]) => boolean       | 自定义搜索规则                             |
| searchable         | boolean `(true)`                                                                 | 可以搜索                                   |
| size               | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                | 设置组件尺寸                               |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                                 | 对选项排序                                 |
| tagProps           | [TagProps][tagprops]                                                             | 设置 Tag 的属性                            |
| toggleAs           | ElementType `('a')`                                                              | 为组件自定义元素类型                       |
| trigger            | 'Enter' &#124; 'Space' &#124; 'Comma' `('Enter')`                                | 设置创建标签的触发事件                     |
| value              | string[]                                                                         | 设置值 `受控`                              |
| valueKey           | string `('value')`                                                               | 设置选项值在 `data` 中的 `key`             |
| virtualized        | boolean                                                                          | 是否开启虚拟列表                           |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

[listprops]: #code-ts-list-props-code
[tagprops]: https://rsuitejs.com/components/tag#Props
[item]: #code-ts-item-data-type-code
