# Stat 统计数值

用于显示统计数据，包含标题及其对应的值，强调某个属性的当前值。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 值格式化

<!--{include:`format-options.md`}-->

### 趋势

<!--{include:`trend.md`}-->

### 边框

<!--{include:`bordered.md`}-->

### 带进度条

<!--{include:`progress-bar.md`}-->

### 带环形进度条

### 图标

<!--{include:`icon.md`}-->

### 信息提示

<!--{include:`info-tip.md`}-->

### 值单位

<!--{include:`value-unit.md`}-->

### 统计数值组

<!--{include:`group.md`}-->

### 响应式的统计数值组

<!--{include:`responsive-group.md`}-->

## Props

### `<Stat>`

| 属性        | 类型 `(默认值)`       | 描述                |
| ----------- | --------------------- | ------------------- |
| as          | elementType `('div')` | 组件的 HTML 标签    |
| bordered    | boolean               | 是否显示边框        |
| children    | ReactNode             | 组件的子元素        |
| classPrefix | string `('stat')`     | 组件 CSS 类名的前缀 |
| icon        | ReactNode             | 组件的图标          |

### `<Stat.Label>`

| 属性        | 类型 `(默认值)`         | 描述                   |
| ----------- | ----------------------- | ---------------------- |
| as          | elementType `('dt')`    | 组件的 HTML 标签       |
| children    | ReactNode               | 组件的子元素           |
| classPrefix | string `('stat-label')` | 组件 CSS 类名的前缀    |
| info        | string                  | 标签的信息提示         |
| uppercase   | boolean                 | 是否以大写字母显示标签 |

### `<Stat.Value>`

| 属性          | 类型 `(默认值)`                  | 描述                |
| ------------- | -------------------------------- | ------------------- |
| as            | elementType `('dd')`             | 组件的 HTML 标签    |
| children      | ReactNode                        | 组件的子元素        |
| classPrefix   | string `('stat-value')`          | 组件 CSS 类名的前缀 |
| formatOptions | [Intl.NumberFormatOptions][Intl] | 组件的值的格式选项  |
| value         | number                           | 组件的值            |

### `<Stat.Trend>`

| 属性        | 类型 `(默认值)`         | 描述                |
| ----------- | ----------------------- | ------------------- |
| as          | elementType `('span')`  | 组件的 HTML 标签    |
| children    | ReactNode               | 组件的子元素        |
| classPrefix | string `('stat-trend')` | 组件 CSS 类名的前缀 |
| indicator   | 'up' \| 'down'          | 组件的趋势指示器    |

### `<Stat.HelpText>`

| 属性        | 类型 `(默认值)`             | 描述                |
| ----------- | --------------------------- | ------------------- |
| as          | elementType `('span')`      | 组件的 HTML 标签    |
| children    | ReactNode                   | 组件的子元素        |
| classPrefix | string `('stat-help-text')` | 组件 CSS 类名的前缀 |

### `<StatGroup>`

| 属性        | 类型 `(默认值)`         | 描述                |
| ----------- | ----------------------- | ------------------- |
| as          | elementType `('div')`   | 组件的 HTML 标签    |
| children    | ReactNode               | 组件的子元素        |
| classPrefix | string `('stat-group')` | 组件 CSS 类名的前缀 |
| columns     | number `(4)`            | 组件的列数          |
| spacing     | number `(6)`            | 组件的间距          |

[Intl]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
