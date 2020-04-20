# InputPicker 输入选择器

带文本框输入的单项选择器

- `<InputPicker>`

## 获取组件

```js
import { InputPicker } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<InputPicker>`

| 属性名称             | 类型`(默认值)`                                                                      | 描述                                 |
| -------------------- | ----------------------------------------------------------------------------------- | ------------------------------------ |
| block                | boolean                                                                             | 堵塞整行                             |
| classPrefix          | string `('picker')`                                                                 | 组件 CSS 类的前缀                    |
| cleanable            | boolean `(true)`                                                                    | 可以清除                             |
| container            | HTMLElement or (() => HTMLElement)                                                  | 设置渲染的容器                       |
| creatable            | boolean `(true)`                                                                    | 设置可以新建选项                     |
| data \*              | Array&lt;[DataItemType](#types)&gt;                                                 | 组件数据                             |
| defaultValue         | string                                                                              | 设置默认值 `非受控`                  |
| disabled             | boolean                                                                             | 禁用组件                             |
| disabledItemValues   | string[]                                                                            | 禁用选项                             |
| groupBy              | string                                                                              | 设置分组条件在 `data` 中的 `key`     |
| labelKey             | string `('label')`                                                                  | 设置选项显示内容在 `data` 中的 `key` |
| listProps            | [listprops]                                                                         | `react-virtualized` 中 List 的相关属性 |
| maxHeight            | number `(320)`                                                                      | 设置 Dropdown 的最大高度             |
| menuClassName        | string                                                                              | 应用于菜单 DOM 节点的 css class      |
| menuStyle            | React.CSSProperties                                                                 | 应用于菜单 DOM 节点的 style          |
| onChange             | (value:string, event)=>void                                                         | `value` 发生改变时的回调函数         |
| onClean              | (event:SyntheticEvent)=>void                                                        | 值清理时触发回调                     |
| onClose              | ()=>void                                                                            | 关闭回调函数                         |
| onGroupTitleClick    | (event)=>void                                                                       | 点击分组标题的回调函数               |
| onOpen               | ()=>void                                                                            | 打开回调函数                         |
| onSearch             | (searchKeyword:string, event)=>void                                                 | 搜索的回调函数                       |
| onSelect             | (value:string, item: DataItemType , event)=>void                                    | 选项被点击选择后的回调函数           |
| placeholder          | React.Node `('Select')`                                                             | 占位符                               |
| placement            | enum: [Placement](#types)`('bottomStart')`                                          | 位置                                 |
| preventOverflow      | boolean                                                                             | 防止浮动元素溢出                     |
| renderExtraFooter    | ()=>React.Node                                                                      | 自定义页脚内容                       |
| renderMenu           | (menu:React.Node)=>React.Node                                                       | 自定义渲染菜单列表                   |
| renderMenuGroup      | (groupTitle:React.Node, item:[DataItemType](#types))=>React.Node                    | 自定义渲染选项组                     |
| renderMenuItem       | (label:React.Node, item:[DataItemType](#types))=>React.Node                         | 自定义渲染选项                       |
| renderValue          | (value:string, item: [DataItemType](#types),selectedElement:React.Node)=>React.Node | 自定义渲染被选中的选项               |
| searchBy             | (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean            | 自定义搜索规则                       |
| searchable           | boolean `(true)`                                                                    | 可以搜索                             |
| size                 | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                               | 设置组件尺寸                         |
| sort                 | (isGroup: boolean) => (a: any, b: any) => number                                    | 对选项排序                           |
| toggleComponentClass | React.ElementType `('a')`                                                           | 为组件自定义元素类型                 |
| value                | string                                                                              | 设置值 `受控`,                       |
| valueKey             | string `('value')`                                                                  | 设置选项值在 `data` 中的 `key`       |
| virtualized          | boolean `(true)`                                                                    | 是否开启虚拟列表                     |

[listprops]: https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
