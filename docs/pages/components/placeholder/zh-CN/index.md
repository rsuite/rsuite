# Placeholder 占位符

用于在组件加载完成之前占位。

- `<Placeholder.Paragraph>` 段落
- `<Placeholder.Graph>` 图形
- `<Placeholder.Grid>` 网格

## 获取组件

<!--{include:(components/placeholder/fragments/import.md)}-->

## 演示

### 段落

<!--{include:`paragraph.md`}-->

### 网格

<!--{include:`grid.md`}-->

### 图形

<!--{include:`graph.md`}-->

## Props

### `<Placeholder.Paragraph>`

| 属性名称  | 类型 `(默认值)`                                        | 描述             |
| --------- | ------------------------------------------------------ | ---------------- |
| rows      | number `(2)`                                           | 显示行数量       |
| rowHeight | number `(10)`                                          | 默认行高         |
| rowMargin | number `(20)`                                          | 默认行间距       |
| graph     | boolean &#124; 'circle' &#124; 'square' &#124; 'image' | 是否显示图形     |
| active    | boolean                                                | 是否处于激活状态 |

### `<Placeholder.Grid>`

| 属性名称  | 类型 `(默认值)` | 描述             |
| --------- | --------------- | ---------------- |
| rows      | number `(5)`    | 显示行数量       |
| columns   | number `(5)`    | 显示列数量       |
| rowHeight | number `(10)`   | 默认行高         |
| rowMargin | number `(20)`   | 默认行间距       |
| active    | boolean         | 是否处于激活状态 |

### `<Placeholder.Graph>`

| 属性名称 | 类型 `(默认值)`               | 描述             |
| -------- | ----------------------------- | ---------------- |
| width    | number &#124; string `(100%)` | 宽度             |
| height   | number `(200)`                | 高度             |
| active   | boolean                       | 是否处于激活状态 |
