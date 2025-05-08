# ProgressCircle 圆形进度条

用于显示操作的环形进度。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

基础的圆形进度条。

<!--{include:`basic.md`}-->

### 状态

使用 `status` 属性来指示不同的状态：'active'、'success' 或 'fail'。

<!--{include:`status.md`}-->

### 颜色

使用 `strokeColor` 属性自定义进度条颜色。

<!--{include:`stroke-color.md`}-->

### 尺寸

使用 `strokeWidth` 属性调整进度条的粗细。

<!--{include:`stroke-width.md`}-->

### 缺口

使用 `gapDegree` 和 `gapPosition` 属性自定义圆形进度条的缺口角度和位置。

<!--{include:`gap.md`}-->

### 线条端点

使用 `strokeLinecap` 属性控制进度条的端点形状。选项包括 'round'、'square' 和 'butt'。

<!--{include:`stroke-linecap.md`}-->

### 隐藏信息

使用 `showInfo` 属性隐藏中心的百分比显示。

<!--{include:`show-info.md`}-->

### 自定义信息内容

使用 `renderInfo` 属性自定义进度信息区域中显示的内容。这允许显示比默认百分比更复杂和更具信息性的内容。

<!--{include:`render-info.md`}-->

### 多段进度

使用 `sections` 属性创建具有多个彩色段的圆形进度条。每个段可以有自己的百分比和颜色。

<!--{include:`sections.md`}-->

## Props

### `<ProgressCircle>`

| 属性名称      | 类型 `(默认值)`                                                          | 描述                                |
| ------------- | ------------------------------------------------------------------------ | ----------------------------------- |
| classPrefix   | string `('progress')`                                                    | 组件 CSS 类的前缀                   |
| gapDegree     | number `(0)`                                                             | 圆形进度条缺口角度，可取值 0 ~ 360  |
| gapPosition   | 'right' \| 'top' \| 'bottom' \| 'left' `('top')`                         | 圆形进度条缺口位置                  |
| percent       | number `(0)`                                                             | 进度百分比                          |
| renderInfo    | (percent: number, status?: 'success' \| 'fail' \| 'active') => ReactNode | 自定义信息内容的渲染函数 ![][6.0.0] |
| showInfo      | boolean `(true)`                                                         | 是否显示文字                        |
| status        | 'success' \| 'fail' \| 'active'                                          | 进度状态                            |
| sections      | { percent: number, color: string }[]                                     | 多个具有不同颜色的进度段 ![][6.0.0] |
| strokeColor   | string                                                                   | 线条颜色                            |
| strokeLinecap | 'round' \| 'square' \| 'butt' `('round')`                                | 不同类型的开放路径的端点形状        |
| strokeWidth   | number `(6)`                                                             | 线条宽度                            |
| trailColor    | string                                                                   | 背景颜色                            |
| trailWidth    | number `(6)`                                                             | 背景宽度                            |
