# Progress 进度条

用于显示某个操作进度的状态。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

默认的 Progress 组件显示一个水平进度条。

<!--{include:`line.md`}-->

### 状态

使用 `status` 属性来指示不同的状态：'active'、'success' 或 'fail'。

<!--{include:`line-status.md`}-->

### 颜色

使用 `strokeColor` 属性自定义进度条颜色。

<!--{include:`line-stroke-color.md`}-->

### 尺寸

使用 `strokeWidth` 属性调整进度条的高度。您还可以使用 `radius` 属性自定义边框圆角。

<!--{include:`line-stroke-width.md`}-->

### 百分比位置

使用 `percentPlacement` 属性控制百分比指示器的位置。选项包括 'start'、'end'、'insideStart'、'insideEnd' 和 'insideCenter'。

<!--{include:`line-percent-position.md`}-->

### 条纹效果

使用 `striped` 属性为进度条应用条纹效果。当与 'active' 状态结合使用时，条纹将会动画显示。

<!--{include:`line-striped.md`}-->

### 自定义信息内容

使用 `renderInfo` 属性自定义进度信息区域中显示的内容。这允许显示比默认百分比更复杂和更具信息性的内容。

<!--{include:`line-render-info.md`}-->

### 多段进度

使用 `sections` 属性显示具有不同颜色的多个进度段。这对于可视化过程的不同部分或比较多个值非常有用。

<!--{include:`line-sections.md`}-->

### 垂直

使用 `vertical` 属性显示垂直进度条。状态、颜色和百分比位置等所有其他属性也适用于垂直进度条。

<!--{include:`line-vertical.md`}-->

## Props

### `<Progress>`

| 属性名称         | 类型 `(默认值)`                                                              | 描述                                |
| ---------------- | ---------------------------------------------------------------------------- | ----------------------------------- |
| classPrefix      | string `('progress-line')`                                                   | 组件 CSS 类的前缀                   |
| percent          | number `(0)`                                                                 | 进度百分比                          |
| percentPlacement | 'start' \| 'end' \| 'insideStart' \| 'insideEnd' \| 'insideCenter' `('end')` | 百分比信息的显示位置 ![][6.0.0]     |
| radius           | number \| string                                                             | 进度条的圆角半径 ![][6.0.0]         |
| renderInfo       | (percent: number, status?: 'success' \| 'fail' \| 'active') => ReactNode     | 自定义信息内容的渲染函数 ![][6.0.0] |
| showInfo         | boolean `(true)`                                                             | 是否显示文字                        |
| status           | 'success' \| 'fail' \| 'active'                                              | 进度状态                            |
| striped          | boolean                                                                      | 是否显示条纹效果 ![][6.0.0]         |
| strokeColor      | string                                                                       | 线条颜色                            |
| strokeWidth      | number                                                                       | 线条宽度                            |
| trailColor       | string                                                                       | 背景颜色                            |
| trailWidth       | number                                                                       | 背景宽度                            |
| sections         | [ProgressSection](#code-ts-progress-section-code)[]                          | 具有不同颜色的多个进度段 ![][6.0.0] |
| vertical         | boolean                                                                      | 垂直显示进度条                      |

### `ts:ProgressSection`

```ts
interface ProgressSection {
  /** Percent of this section */
  percent: number;

  /** Color of this section */
  color: string;

  /** Label of this section */
  label?: React.ReactNode;

  /** Tooltip of this section */
  tooltip?: React.ReactNode;
}
```
