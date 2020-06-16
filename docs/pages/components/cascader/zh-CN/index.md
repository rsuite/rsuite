# Cascader 级联选择器

对有层级关系结构的数据进行单项选择。

- `<Cascader>`

## 获取组件

```js
import { Cascader } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Cascader>`

| 属性名称             | 类型`(默认值)`                                                                              | 描述                                 |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------ |
| appearance           | enum: 'default', 'subtle' `('default')`                                                     | 设置外观                             |
| block                | boolean                                                                                     | 堵塞整行                             |
| childrenKey          | string `('children')`                                                                       | 设置选项子节点在 `data` 中的 `key`   |
| classPrefix          | string `('picker')`                                                                         | 组件 CSS 类的前缀                    |
| cleanable            | boolean `(true)`                                                                            | 可以清除                             |
| container            | HTMLElement or (() => HTMLElement)                                                          | 设置渲染的容器                       |
| data \*              | Array&lt;[DataItemType](#types)&gt;                                                         | 组件数据                             |
| defaultOpen          | boolean                                                                                     | 默认打开                             |
| defaultValue         | string                                                                                      | 设置默认值                           |
| disabled             | boolean                                                                                     | 禁用组件                             |
| disabledItemValues   | string[]                                                                                    | 禁用选项                             |
| height               | number `(320)`                                                                              | 设置 Dropdown 的高度                 |
| inline               | boolean                                                                                     | 在组件初始后直接展示菜单             |
| labelKey             | string `('label')`                                                                          | 设置选项显示内容在 `data` 中的 `key` |
| menuClassName        | string                                                                                      | 选项菜单的 className                 |
| menuHeight           | number                                                                                      | 设置菜单的高度                       |
| menuWidth            | number                                                                                      | 设置菜单的宽度                       |
| onChange             | (value:string, event) => void                                                               | `value` 发生改变时的回调函数         |
| onClean              | (event:SyntheticEvent) => void                                                              | 清除值后的回调函数                   |
| onClose              | () => void                                                                                  | 关闭回调函数                         |
| onEnter              | () => void                                                                                  | 显示前动画过渡的回调函数             |
| onEntered            | () => void                                                                                  | 显示后动画过渡的回调函数             |
| onEntering           | () => void                                                                                  | 显示中动画过渡的回调函数             |
| onExit               | () => void                                                                                  | 退出前动画过渡的回调函数             |
| onExited             | () => void                                                                                  | 退出后动画过渡的回调函数             |
| onExiting            | () => void                                                                                  | 退出中动画过渡的回调函数             |
| onGroupTitleClick    | (event) => void                                                                             | 点击分组标题的回调函数               |
| onOpen               | () => void                                                                                  | 打开回调函数                         |
| onSearch             | (searchKeyword:string, event) => void                                                       | 搜索的回调函数                       |
| onSelect             | (item:[DataItemType](#types), activePaths: Array, concat:(data, children) => Array) => void | 选项被点击选择后的回调函数           |
| open                 | boolean                                                                                     | 打开 (受控)                          |
| placeholder          | React.Node `('Select')`                                                                     | 占位符                               |
| placement            | enum: [PlacementStart](#types)`('bottomStart')`                                             | 打开位置                             |
| preventOverflow      | boolean                                                                                     | 防止浮动元素溢出                     |
| renderExtraFooter    | () => React.Node                                                                            | 自定义页脚内容                       |
| renderMenu           | (children: object[], menu:React.Node, parentNode?: object) => React.Node                    | 自定义渲染菜单列表                   |
| renderMenuItem       | (label:React.Node, item: [DataItemType](#types)) => React.Node                              | 自定义选项                           |
| renderValue          | (value:string, itemPaths:Array, selectedElement:React.Node) => React.Node                   | 自定义被选中的选项                   |
| searchable           | boolean `(true)`                                                                            | 可以搜索                             |
| size                 | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                       | 设置组件尺寸                         |
| toggleComponentClass | React.ElementType `('a')`                                                                   | 为组件自定义元素类型                 |
| value                | string                                                                                      | 设置值（受控）                       |
| valueKey             | string `('value')`                                                                          | 设置选项值在 `data` 中的 `key`       |
| parentSelectable     | boolean                                                                                     | 设置父节点为可选                     |
