# Placeholder 占位符

用于在组件加载完成之前占位。

## 获取组件

<!--{include:<import-guide>}-->

- `<Placeholder.Paragraph>` 段落
- `<Placeholder.Graph>` 图形
- `<Placeholder.Grid>` 网格

## 演示

### 段落

<!--{include:`paragraph.md`}-->

### 段落带图片

<!--{include:`paragraph-image.md`}-->

### 段落带圆形

<!--{include:`paragraph-graph.md`}-->

### 段落带方形

<!--{include:`paragraph-square.md`}-->

### 网格或表格

<!--{include:`grid.md`}-->

### 图形

<!--{include:`graph.md`}-->

### 方形图形

<!--{include:`graph-square.md`}-->

## Props

### `<Placeholder.Paragraph>`

| 属性名称   | 类型 `(默认值)`                            | 描述             |
| ---------- | ------------------------------------------ | ---------------- |
| rows       | number `(2)`                               | 显示行数量       |
| rowHeight  | number `(10)`                              | 默认行高         |
| rowSpacing | number `(20)`                              | 默认行间距       |
| graph      | boolean \| 'circle' \| 'square' \| 'image' | 是否显示图形     |
| active     | boolean                                    | 是否处于激活状态 |

### `<Placeholder.Grid>`

| 属性名称   | 类型 `(默认值)` | 描述             |
| ---------- | --------------- | ---------------- |
| rows       | number `(5)`    | 显示行数量       |
| columns    | number `(5)`    | 显示列数量       |
| rowHeight  | number `(10)`   | 默认行高         |
| rowSpacing | number `(20)`   | 默认行间距       |
| active     | boolean         | 是否处于激活状态 |

### `<Placeholder.Graph>`

| 属性名称 | 类型 `(默认值)`           | 描述             |
| -------- | ------------------------- | ---------------- |
| width    | number \| string `(100%)` | 宽度             |
| height   | number `(200)`            | 高度             |
| active   | boolean                   | 是否处于激活状态 |
