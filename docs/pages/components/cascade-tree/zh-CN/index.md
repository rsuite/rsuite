# CascadeTree 级联树

CascadeTree 是一个按列显示树形结构数据的组件。

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

### 可搜索

<!--{include:`searchable.md`}-->

## 可访问性

### ARIA 属性

- CascadeTree 具有 `tree` 角色。
- 每个列具有 `group` 角色。
- 每个选项具有 `treeitem` 角色。
- 每个选项的 `aria-setsize` 等于列中的选项数。
- 每个选项的 `aria-level` 等于列索引。
- 选中的选项具有 `aria-selected="true"`。
- 禁用的选项具有 `aria-disabled="true"`。
- 搜索输入具有 `searchbox` 角色。

## Props

### `<CascadeTree>`

| 属性名称           | 类型`(默认值)`                                                                     | 描述                                 |
| ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------ |
| childrenKey        | string `('children')`                                                              | 设置选项子节点在 `data` 中的 `key`   |
| classPrefix        | string `('cascade-tree')`                                                          | 组件 CSS 类的前缀                    |
| columnHeight       | number                                                                             | 设置菜单的高度                       |
| columnWidth        | number                                                                             | 设置菜单的宽度                       |
| data \*            | [ItemDataType][item][]                                                             | 组件数据                             |
| defaultValue       | string                                                                             | 默认值（非受控）                     |
| disabledItemValues | string[]                                                                           | 禁用选项                             |
| getChildren        | (item: [ItemDataType][item]) => Promise&lt;[ItemDataType][item][]&gt;              | 异步加载树节点的子级                 |
| labelKey           | string `('label')`                                                                 | 设置选项显示内容在 `data` 中的 `key` |
| onChange           | (value: string, event: SyntheticEvent) => void                                     | 值变化后的回调函数                   |
| onSearch           | (value: string, event) => void                                                     | 搜索值变化后的回调函数               |
| onSelect           | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void | 选项被点击选择后的回调函数           |
| renderColumn       | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode          | 自定义渲染菜单列表                   |
| renderTreeNode     | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                         | 自定义选项                           |
| searchable         | boolean                                                                            | 是否启用搜索                         |
| value              | string                                                                             | 当前值（受控）                       |

<!--{include:(_common/types/item-data-type.md)}-->

[item]: #code-ts-item-data-type-code
