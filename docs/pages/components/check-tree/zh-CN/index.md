# CheckTree 树形多选控件

`<CheckTree>` 用于展示一个树结构数据，同时支持 Checkbox 选择。

## 获取组件

```js
import { CheckTree } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<CheckTree>`

| 属性名称                | 类型 `(默认值)`                                                                                         | 描述                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| cascade                 | boolean `(true)`                                                                                        | checktree 是否级联选择                                                          |
| childKey                | string `('children')`                                                                                   | tree 数据结构 children 属性名称                                                 |
| data \*                 | Array&lt;[DataItemType](#types)&gt;                                                                     | tree 数据                                                                       |
| defaultExpandAll        | boolean                                                                                                 | 默认展开所有节点                                                                |
| defaultValue            | string[]                                                                                                | 默认选中的值                                                                    |
| disabledItemValues      | string[]                                                                                                | 禁用节点列表                                                                    |
| defaultExpandItemValues | any []                                                                                                  | 设置默认展开节点的值                                                            |
| expandItemValues        | any []                                                                                                  | 设置展开节点的值（受控）                                                        |
| height                  | number `(360px)`                                                                                        | menu 的高度。当设置了 virtualized 为 true 时， 可以通过 height 控制 menu 的高度 |
| labelKey                | string `('label')`                                                                                      | tree 数据结构 label 属性名称                                                    |
| onChange                | (values:string[]) => void                                                                               | 数据改变的回调函数                                                              |
| onExpand                | (expandItemValues: any [], activeNode:[DataItemType](#types), concat:(data, children) => Array) => void | 树节点展示时的回调                                                              |
| onSelect                | (activeNode:[DataItemType](#types),value:any, event) => void                                            | 选择树节点后的回调函数                                                          |
| renderTreeIcon          | (nodeData:[DataItemType](#types)) => React.Node                                                         | 自定义渲染 图标                                                                 |
| renderTreeNode          | (nodeData:[DataItemType](#types)) => React.Node                                                         | 自定义渲染 tree 节点                                                            |
| searchKeyword           | string                                                                                                  | 搜索关键词(受控)                                                                |
| uncheckableItemValues   | string[]                                                                                                | 设置不显示复选框的选项值                                                        |
| value                   | string[]                                                                                                | 当前选中的值                                                                    |
| valueKey                | string `('value')`                                                                                      | tree 数据结构 value 属性名称                                                    |
| virtualized             | boolean `(false)`                                                                                       | 是否开启虚拟列表                                                                |

## 相关组件

- [`<Tree>`](./tree) 用于展示一个树结构数据。
- [`<TreePicker>`](./tree-picker) 选择器组件，树形单项选择器。
- [`<CheckTreePicker>`](./check-tree-picker) 选择器组件，在 TreePicker 节点上支持 Checkbox，用于多选 。
