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

<!-- prettier-sort-markdown-table -->

| 属性名称              | 类型`(默认值)`                                                                     | 描述                                 |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------ |
| childrenKey           | string `('children')`                                                              | 设置选项子节点在 `data` 中的 `key`   |
| classPrefix           | string `('multi-cascade-tree')`                                                    | 组件 CSS 类的前缀                    |
| columnHeight          | number                                                                             | 设置列的高度                         |
| columnWidth           | number                                                                             | 设置列的宽度                         |
| data \*               | [ItemDataType][item][]                                                             | 组件数据                             |
| defaultValue          | string[]                                                                             | 默认值                               |
| disabledItemValues    | string[]                                                                           | 禁用选项                             |
| getChildren           | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item][]&gt;              | 异步加载树节点的子级                 |
| labelKey              | string `('label')`                                                                 | 设置选项显示内容在 `data` 中的 `key` |
| onChange              | (value: string[], event) => void                                                   | 值变化后的回调函数                   |
| onSearch              | (value: string, event) => void                                                     | 搜索值变化后的回调函数               |
| onSelect              | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void | 选项被点击选择后的回调函数           |
| renderColumn          | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode          | 紫丁香渲染列                         |
| renderTreeNode        | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                         | 自定义选项                           |
| searchable            | boolean                                                                            | 是否启用搜索                         |
| uncheckableItemValues | string[]                                                                           | 设置不可选中的选项                   |
| value                 | string[]                                                                             | 设置值（受控）                       |
| valueKey              | string `('value')`                                                                 |  设置 `value` 在 `data` 的属性名称                                |

<!--{include:(_common/types/item-data-type.md)}-->

[item]: #code-ts-item-data-type-code
