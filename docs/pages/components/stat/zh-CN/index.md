# Stat 统计数值

用于显示统计数据，包含标题及其对应的值，强调某个属性的当前值。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

展示一个简单的统计数值，包括标签和数值。

<!--{include:`basic.md`}-->

### 值格式化

通过 `formatOptions` 属性自定义数值的本地化格式显示。

<!--{include:`format-options.md`}-->

### 趋势

在数值旁显示趋势指示（上升/下降），体现变化情况。

<!--{include:`trend.md`}-->

### 边框

为统计数值添加边框以突出显示。

<!--{include:`bordered.md`}-->

### 带进度条

结合进度条，展示统计数值的进度情况。

<!--{include:`progress-bar.md`}-->

### 带环形进度条

以环形进度条的形式展示数值进度。

<!--{include:`ring-progress.md`}-->

### 图标

为统计数值添加图标，增强视觉表现。

<!--{include:`icon.md`}-->

### 信息提示

在标签上显示额外的信息提示。

<!--{include:`info-tip.md`}-->

### 值单位

在数值旁显示单位（如 %, 元），增强数据表达。

<!--{include:`value-unit.md`}-->

### 统计数值组

将多个统计数值以网格形式组合展示。

<!--{include:`group.md`}-->

### 响应式的统计数值组

统计数值组可根据屏幕尺寸自适应布局。

<!--{include:<example-responsive>}-->

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
