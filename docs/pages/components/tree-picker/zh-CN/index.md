# TreePicker 树形选择器

`<TreePicker>` 选择器组件，树形单项选择器。

## 获取组件

```js
import { TreePicker } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<TreePicker>`

| 属性名称                | 类型 `(默认值)`                                                                                         | 描述                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| appearance              | enum: 'default', 'subtle' `('default')`                                                                 | 设置外观                                                                        |
| block                   | boolean                                                                                                 | 堵塞整行                                                                        |
| childrenKey             | string `('children')`                                                                                   | tree 数据结构 children 属性名称                                                 |
| classPrefix             | string`('picker')`                                                                                      | 组件 CSS 类的前缀                                                               |
| cleanable               | boolean `(true)`                                                                                        | 是否可以清除                                                                    |
| container               | HTMLElement or (() => HTMLElement)                                                                      | 设置渲染的容器                                                                  |
| data \*                 | Array&lt;[DataItemType](#types)&gt;                                                                     | tree 数据                                                                       |
| defaultExpandAll        | boolean                                                                                                 | 默认展开所有节点                                                                |
| defaultExpandItemValues | any []                                                                                                  | 设置默认展开节点的值                                                            |
| defaultOpen             | boolean                                                                                                 | 默认打开                                                                        |
| defaultValue            | string                                                                                                  | 默认选中的值                                                                    |
| disabled                | boolean                                                                                                 | 是否禁用 Picker                                                                 |
| disabledItemValues      | string[]                                                                                                | 禁用选项                                                                        |
| expandItemValues        | any []                                                                                                  | 设置展开节点的值（受控）                                                        |
| height                  | number `(360px)`                                                                                        | menu 的高度。当设置了 virtualized 为 true 时， 可以通过 height 控制 menu 的高度 |
| inline                  | boolean                                                                                                 | 是否内联显示 tree                                                               |
| labelKey                | string `('label')`                                                                                      | tree 数据结构 label 属性名称                                                    |
| locale                  | object                                                                                                  | 本地语言                                                                        |
| menuClassName           | string                                                                                                  | 应用于菜单 DOM 节点的 css class                                                 |
| menuStyle               | React.CSSProperties                                                                                     | 应用于菜单 DOM 节点的 style                                                     |
| onChange                | (value:string) => void                                                                                  | 数据改变的回调函数                                                              |
| onClean                 | (event:SyntheticEvent) => void                                                                          | 值清理时触发回调                                                                |
| onClose                 | () => void                                                                                              | 关闭 Dropdown 的回调函数                                                        |
| onExpand                | (expandItemValues: any [], activeNode:[DataItemType](#types), concat:(data, children) => Array) => void | 树节点展示时的回调                                                              |
| onEnter                 | () => void                                                                                              | 显示前动画过渡的回调函数                                                        |
| onEntered               | () => void                                                                                              | 显示后动画过渡的回调函数                                                        |
| onEntering              | () => void                                                                                              | 显示中动画过渡的回调函数                                                        |
| onExit                  | () => void                                                                                              | 退出前动画过渡的回调函数                                                        |
| onExited                | () => void                                                                                              | 退出后动画过渡的回调函数                                                        |
| onExiting               | () => void                                                                                              | 退出中动画过渡的回调函数                                                        |
| onOpen                  | () => void                                                                                              | 展开 Dropdown 的回调函数                                                        |
| onSearch                | (searchKeyword:string, event) => void                                                                   | 搜索回调函数                                                                    |
| onSelect                | (activeNode:[DataItemType](#types), value:any, event) => void                                           | 选择树节点后的回调函数                                                          |
| open                    | boolean                                                                                                 | 打开（受控）                                                                    |
| placeholder             | React.Node `('Select')`                                                                                 | 占位符                                                                          |
| placement               | enum: [Placement](#types)`('bottomStart')`                                                              | 打开位置                                                                        |
| renderExtraFooter       | () => React.Node                                                                                        | 自定义页脚内容                                                                  |
| renderTreeIcon          | (nodeData:[DataItemType](#types)) => React.Node                                                         | 自定义渲染 图标                                                                 |
| renderTreeNode          | (nodeData:[DataItemType](#types)) => React.Node                                                         | 自定义渲染 tree 节点                                                            |
| renderValue             | (value:string,item:[DataItemType](#types), selectedElement:React.Node) => React.Node                    | 自定义渲染选中的值                                                              |
| searchBy                | (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean                                | 自定义搜索规则                                                                  |
| searchable              | boolean `(true)`                                                                                        | 是否可以搜索                                                                    |
| size                    | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                                   | 设置组件尺寸                                                                    |
| toggleComponentClass    | React.ElementType `('a')`                                                                               | 为组件自定义元素类型                                                            |
| value                   | string                                                                                                  | 当前选中的值                                                                    |
| valueKey                | string `('value')`                                                                                      | tree 数据结构 value 属性名称                                                    |
| virtualized             | boolean `(false)`                                                                                       | 是否开启虚拟列表                                                                |

## 相关组件

- [`<CheckTreePicker>`](./check-tree-picker) 选择器组件，在 TreePicker 节点上支持 Checkbox，用于多选 。
- [`<Tree>`](./tree) 用于展示一个树结构数据。
- [`<CheckTree>`](./check-tree) 用于展示一个树结构数据，同时支持 Checkbox 选择。
