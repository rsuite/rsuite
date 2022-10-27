# CheckPicker 多项选择器

用于多项数据选择，支持分组。

## 获取组件

<!--{include:(components/check-picker/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 具有标签

<!--{include:`with-label.md`}-->

### 外观

<!--{include:`appearance.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 置顶已选项

设置 `sticky`属性， 把选项中已选择的选项置顶在最前面。

<!--{include:`sticky.md`}-->

### 撑满

<!--{include:`block.md`}-->

### 加载中状态

当选择器处于加载中状态时，会显示一个旋转效果作为提示。
在加载中状态时，点击选择器不会展开选项菜单。

<!--{include:`loading.md`}-->

### 分组

<!--{include:`group.md`}-->

### 位置

<!--{include:`placement.md`}-->

> 提示：设置为 `auto*`时， 尝试滚动页面，或者改变浏览器大小，会自动显示在合适的位置。

### 自定义选项

<!--{include:`custom.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 禁用搜索框

<!--{include:`searchable.md`}-->

### 自定义页脚

自定义一个全选功能

<!--{include:`extra-footer.md`}-->

### 异步

<!--{include:`async.md`}-->

### 容器与防止溢出

<!--{include:`container.md`}-->

### 受控

<!--{include:`controlled.md`}-->

### 虚拟化长列表

<!--{include:`virtualized.md`}-->

## 无障碍设计

了解更多有关[无障碍设计](/zh/guide/accessibility)的信息。

## Props

### `<CheckPicker>`

| 属性名称           | 类型`(默认值)`                                                                    | 描述                                 |
| ------------------ | --------------------------------------------------------------------------------- | ------------------------------------ |
| appearance         | 'default' &#124; 'subtle' `('default')`                                           | 设置外观                             |
| block              | boolean                                                                           | 堵塞整行                             |
| classPrefix        | string `('picker')`                                                               | 组件 CSS 类的前缀                    |
| cleanable          | boolean `(true)`                                                                  | 可以清除                             |
| container          | HTMLElement &#124; (() => HTMLElement)                                            | 设置渲染的容器                       |
| countable          | boolean `(true)`                                                                  | 是否显示选中条目的数量               |
| data \*            | [ItemDataType][item][]                                                            | 组件数据                             |
| defaultValue       | [ValueType][value]                                                                | 设置默认值 `非受控`                  |
| disabled           | boolean                                                                           | 禁用组件                             |
| disabledItemValues | [ValueType][value]                                                                | 禁用选项                             |
| groupBy            | string                                                                            | 设置分组条件在 `data` 中的 `key`     |
| label              | ReactNode                                                                         | 在按钮开头显示的标签                 |
| labelKey           | string `('label')`                                                                | 设置选项显示内容在 `data` 中的 `key` |
| listProps          | [ListProps][listprops]                                                            | 虚拟化长列表的相关属性               |
| loading            | boolean `(false)`                                                                 | 是否显示一个加载中状态指示器           |
| locale             | [PickerLocaleType](/zh/guide/i18n/#pickers)                                       | 本地化的文本                         |
| menuMaxHeight      | number `(320)`                                                                    | 设置 Dropdown 的最大高度             |
| menuClassName      | string                                                                            | 应用于菜单 DOM 节点的 css class      |
| menuStyle          | CSSProperties                                                                     | 应用于菜单 DOM 节点的 style          |
| onChange           | (value: [ValueType][value] , event) => void                                       | `value` 发生改变时的回调函数         |
| onClean            | (event:SyntheticEvent) => void                                                    | 值清理时触发回调                     |
| onClose            | () => void                                                                        | 关闭回调函数                         |
| onEnter            | () => void                                                                        | 显示前动画过渡的回调函数             |
| onEntered          | () => void                                                                        | 显示后动画过渡的回调函数             |
| onEntering         | () => void                                                                        | 显示中动画过渡的回调函数             |
| onExit             | () => void                                                                        | 退出前动画过渡的回调函数             |
| onExited           | () => void                                                                        | 退出后动画过渡的回调函数             |
| onExiting          | () => void                                                                        | 退出中动画过渡的回调函数             |
| onGroupTitleClick  | (event) => void                                                                   | 点击分组标题的回调函数               |
| onOpen             | () => void                                                                        | 打开回调函数                         |
| onSearch           | (searchKeyword:string, event) => void                                             | 搜索的回调函数                       |
| onSelect           | (value:ValueType, item: [ItemDataType][item] , event) => void                     | 选项被点击选择后的回调函数           |
| open               | boolean                                                                           | 是否打开                             |
| placeholder        | ReactNode `('Select')`                                                            | 占位符                               |
| placement          | Placement`('bottomStart')`                                                        | 位置                                 |
| preventOverflow    | boolean                                                                           | 防止浮动元素溢出                     |
| renderExtraFooter  | () => ReactNode                                                                   | 自定义页脚内容                       |
| renderMenu         | (menu:ReactNode) => ReactNode                                                     | 自定义渲染菜单列表                   |
| renderMenuGroup    | (groupTitle:ReactNode, item: [ItemDataType][item]) => ReactNode                   | 自定义选项组                         |
| renderMenuItem     | (label:ReactNode, item: [ItemDataType][item]) => ReactNode                        | 自定义选项                           |
| renderValue        | (value: [ValueType][value] , items: any[],selectedElement:ReactNode) => ReactNode | 自定义被选中的选项                   |
| searchBy           | (keyword: string, label: ReactNode, item: [ItemDataType][item]) => boolean        | 自定义搜索规则                       |
| searchable         | boolean `(true)`                                                                  | 可以搜索                             |
| size               | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                 | 设置组件尺寸                         |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                                  | 对选项排序                           |
| sticky             | boolean                                                                           | 把选项中已选择的选项置顶在最前面     |
| toggleAs           | ElementType `('a')`                                                               | 为组件自定义元素类型                 |
| value              | [ValueType][value]                                                                | 设置值 `受控`                        |
| valueKey           | string `('value')`                                                                | 设置选项值在 `data` 中的 `key`       |
| virtualized        | boolean                                                                           | 是否开启虚拟列表                     |
| caretAs            | ElementType                                                                       | 自定义右侧箭头图标的组件             |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

### `ts:ValueType`

```ts
type ValueType = (string | number)[];
```

[item]: #code-ts-item-data-type-code
[value]: #code-ts-value-type-code
[listprops]: #code-ts-list-props-code
