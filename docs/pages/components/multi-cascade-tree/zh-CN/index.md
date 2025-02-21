# MultiCascadeTree 多选级联树

MultiCascadeTree 是一个按列显示树形结构数据的组件，支持多选。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义选项

<!--{include:`custom.md`}-->

### 异步数据

可以通过 `getChildren` 属性和树节点上的 `children` 字段 `length` 为 `0` 以异步加载子级。

<!--{include:`async.md`}-->

### 禁用选项

<!--{include:`disabled-options.md`}-->

### 不可选中选项

<!--{include:`uncheckable-options.md`}-->

### 可搜索

<!--{include:`searchable.md`}-->

## 可访问性

### ARIA 属性

- MultiCascadeTree 具有 `tree` 角色。
- 每个列具有 `group` 角色。
- 每个选项具有 `treeitem` 角色。
- 每个选项的 `aria-setsize` 等于列中的选项数。
- 每个选项的 `aria-level` 等于列索引。
- 选中的选项具有 `aria-selected="true"`。
- 禁用的选项具有 `aria-disabled="true"`。
- 搜索输入具有 `searchbox` 角色。

## Props

### `<MultiCascadeTree>`

| 属性                  | 类型`(默认值)`                                                                     | 描述                                       |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------ |
| cascade               | boolean `(true)`                                                                   | 确定选择是否在父节点与子节点之间双向级联。 |
| childrenKey           | string `('children')`                                                              | 定义用于访问子节点的键。                   |
| classPrefix           | string `('multi-cascade-tree')`                                                    | 设置组件的 CSS 类前缀。                    |
| columnHeight          | number                                                                             | 指定每列的高度。                           |
| columnWidth           | number                                                                             | 指定每列的宽度。                           |
| data \*               | [ItemDataType][item][]                                                             | 定义组件使用的数据结构。                   |
| defaultValue          | string[]                                                                           | 指定默认选中的值。                         |
| disabledItemValues    | string[]                                                                           | 定义应禁用的项目。                         |
| getChildren           | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item][]&gt;              | 异步加载树节点的子节点。                   |
| labelKey              | string `('label')`                                                                 | 定义用于访问标签的键。                     |
| onChange              | (value: string[], event) => void                                                   | 当选中的值更改时触发的回调函数。           |
| onSearch              | (value: string, event) => void                                                     | 当搜索值更改时触发的回调函数。             |
| onSelect              | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void | 当项目被选中时触发的回调函数。             |
| renderColumn          | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode          | 自定义每列的渲染。                         |
| renderTreeNode        | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                         | 自定义每个树节点的渲染。                   |
| searchable            | boolean                                                                            | 确定是否启用搜索功能。                     |
| uncheckableItemValues | string[]                                                                           | 指定无法选中的项目。                       |
| value                 | string[]                                                                           | 定义当前选中的值（受控组件）。             |
| valueKey              | string `('value')`                                                                 | 定义用于访问值的键。                       |

<!--{include:(_common/types/item-data-type.md)}-->

[item]: #code-ts-item-data-type-code
