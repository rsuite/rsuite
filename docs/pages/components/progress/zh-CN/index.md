# Progress 进度条

用于显示某个操作进度的状态。

## 获取组件

<!--{include:<import-guide>}-->

- <Progress.Line> 线形进度条。
- <Progress.Circle> 圆形进度条。

## 演示

### 线形进度

<!--{include:`line.md`}-->

### 垂直显示

<!--{include:`line-vertical.md`}-->

### 圆形进度

<!--{include:`circle.md`}-->

### 动态展示

<!--{include:`dynamic.md`}-->

## Props

### `<Progress.Line>`

| 属性名称    | 类型 `(默认值)`                         | 描述              |
| ----------- | --------------------------------------- | ----------------- |
| classPrefix | string `('progress')`                   | 组件 CSS 类的前缀 |
| percent     | number `(0)`                            | 进度百分比        |
| showInfo    | boolean `(true)`                        | 是否显示文字      |
| status      | 'success' &#124; 'fail' &#124; 'active' | 进度状态          |
| strokeColor | string                                  | 线条颜色          |
| strokeWidth | number                                  | 线条宽度          |
| vertical    | boolean                                 | 垂直显示进度条    |

### `<Progress.Circle>`

| 属性名称      | 类型 `(默认值)`                                              | 描述                               |
| ------------- | ------------------------------------------------------------ | ---------------------------------- |
| classPrefix   | string `('progress')`                                        | 组件 CSS 类的前缀                  |
| gapDegree     | number                                                       | 圆形进度条缺口角度，可取值 0 ~ 360 |
| gapPosition   | 'right' &#124; 'top' &#124; 'bottom' &#124; 'left' `('top')` | 圆形进度条缺口位置                 |
| percent       | number `(0)`                                                 | 进度百分比                         |
| showInfo      | boolean `(true)`                                             | 是否显示文字                       |
| status        | 'success' &#124; 'fail' &#124; 'active'                      | 进度状态                           |
| strokeColor   | string                                                       | 线条颜色                           |
| strokeLinecap | 'round' &#124; 'square' &#124; 'butt' `('round')`            | 不同类型的开放路径的终结           |
| strokeWidth   | number `(6)`                                                 | 线条宽度                           |
| trailColor    | string                                                       | 背景颜色                           |
| trailWidth    | number `(6)`                                                 | 背景宽度                           |
