# MultiCascader 级联多项选择器

对有层级关系结构的数据进行多项选择。

## 获取组件

<!--{include:(components/multi-cascader/fragments/import.md)}-->

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

### Inline

<!--{include:`inline.md`}-->

## 无障碍设计

了解更多有关[无障碍设计](/zh/guide/accessibility)的信息。

## Props

<!--{include:(_common/types/item-data-type.md)}-->

### `<MultiCascader>`

| 属性名称              | 类型`(默认值)`                                                                                              | 描述                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| appearance            | 'default' &#124; 'subtle' `('default')`                                                                     | 设置外观                             |
| block                 | boolean                                                                                                     | 堵塞整行                             |
| cascade               | boolean `(true)`                                                                                            | 是否级联选择                         |
| childrenKey           | string `('children')`                                                                                       | 设置选项子节点在 `data` 中的 `key`   |
| classPrefix           | string `('picker')`                                                                                         | 组件 CSS 类的前缀                    |
| cleanable             | boolean `(true)`                                                                                            | 可以清除                             |
| container             | HTMLElement &#124; (() => HTMLElement)                                                                      | 设置渲染的容器                       |
| countable             | boolean `(true)`                                                                                            | 可以计数已选项                       |
| data \*               | [ItemDataType][item][]                                                                                      | 组件数据                             |
| defaultOpen           | boolean                                                                                                     | 默认打开                             |
| defaultValue          | [ValueType][value]                                                                                          | 设置默认值                           |
| disabled              | boolean                                                                                                     | 禁用组件                             |
| disabledItemValues    | [ValueType][value]                                                                                          | 禁用选项                             |
| height                | number `(320)`                                                                                              | 设置 Dropdown 的高度                 |
| inline                | boolean                                                                                                     | 在组件初始后直接展示菜单             |
| labelKey              | string `('label')`                                                                                          | 设置选项显示内容在 `data` 中的 `key` |
| locale                | [PickerLocaleType](/zh/guide/i18n/#pickers)                                                                 | 本地化的文本                         |
| menuClassName         | string                                                                                                      | 选项菜单的 className                 |
| menuHeight            | number `(200)`                                                                                              | 设置菜单的高度                       |
| menuWidth             | number `(156)`                                                                                              | 设置菜单的宽度                       |
| onChange              | (value: [ValueType][value], event) => void                                                                  | `value` 发生改变时的回调函数         |
| onCheck               | (value: ValueType, item:[ItemDataType][item], checked:boolean, event) => void;                              | 复选框选中状态发生变化的回调函数     |
| onClean               | (event) => void                                                                                             | 值清理时触发回调                     |
| onClose               | () => void                                                                                                  | 关闭回调函数                         |
| onEnter               | () => void                                                                                                  | 显示前动画过渡的回调函数             |
| onEntered             | () => void                                                                                                  | 显示后动画过渡的回调函数             |
| onEntering            | () => void                                                                                                  | 显示中动画过渡的回调函数             |
| onExit                | () => void                                                                                                  | 退出前动画过渡的回调函数             |
| onExited              | () => void                                                                                                  | 退出后动画过渡的回调函数             |
| onExiting             | () => void                                                                                                  | 退出中动画过渡的回调函数             |
| onOpen                | () => void                                                                                                  | 打开回调函数                         |
| onSearch              | (searchKeyword:string, event) => void                                                                       | 搜索的回调函数                       |
| onSelect              | (item:[ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void                           | 选项被点击选择后的回调函数           |
| open                  | boolean                                                                                                     | 打开 (受控)                          |
| placeholder           | ReactNode `('Select')`                                                                                      | 占位符                               |
| placement             | [Placement](#code-ts-placement-code)`('bottomStart')`                                                       | 打开位置                             |
| preventOverflow       | boolean                                                                                                     | 防止浮动元素溢出                     |
| renderExtraFooter     | () => ReactNode                                                                                             | 自定义页脚内容                       |
| renderMenu            | (children: object[], menu:ReactNode, parentNode?: object, layer?: number) => ReactNode                      | 自定义渲染菜单列表                   |
| renderMenuItem        | (label:ReactNode, item: [ItemDataType][item] ) => ReactNode                                                 | 自定义选项                           |
| renderValue           | (value:[ValueType][value], selectedItems: [ItemDataType][item][], selectedElement: ReactNode ) => ReactNode | 自定义被选中的选项                   |
| searchable            | boolean `(true)`                                                                                            | 可以搜索                             |
| size                  | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                                           | 设置组件尺寸                         |
| toggleAs              | ElementType `('a')`                                                                                         | 为组件自定义元素类型                 |
| uncheckableItemValues | [ValueType][value]                                                                                          | 设置不显示复选框的选项值             |
| value                 | [ValueType][value]                                                                                          | 设置值（受控）                       |
| valueKey              | string `('value')`                                                                                          | 设置选项值在 `data` 中的 `key`       |
| caretAs               | ElementType                                                                                                 | 自定义右侧箭头图标的组件             |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement-start.md)}-->

### `ts:ValueType`

```ts
type ValueType = (string | number)[];
```

[item]: #code-ts-item-data-type-code
[value]: #code-ts-value-type-code
