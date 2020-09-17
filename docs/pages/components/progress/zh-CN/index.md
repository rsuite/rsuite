# Progress 进度条

用于显示某个操作进度的状态。

- `<Progress.Line>` 线性进度
- `<Progress.Circle>` 圆形进度

## 获取组件

```js
import { Progress } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Progress.Line>`

| 属性名称    | 类型 `(默认值)`                   | 描述              |
| ----------- | --------------------------------- | ----------------- |
| classPrefix | string `('progress')`             | 组件 CSS 类的前缀 |
| percent     | number `(0)`                      | 进度百分比        |
| showInfo    | boolean `(true)`                  | 是否显示文字      |
| status      | enum: 'success', 'fail', 'active' | 进度状态          |
| strokeColor | string                            | 线条颜色          |
| strokeWidth | number                            | 线条宽度          |
| vertical    | boolean                           | 垂直显示进度条    |

### `<Progress.Circle>`

| 属性名称      | 类型 `(默认值)`                                  | 描述                               |
| ------------- | ------------------------------------------------ | ---------------------------------- |
| classPrefix   | string `('progress')`                            | 组件 CSS 类的前缀                  |
| gapDegree     | gapDegree                                        | 圆形进度条缺口角度，可取值 0 ~ 360 |
| gapPosition   | enum: 'right', 'top', 'bottom', 'left' `('top')` | 圆形进度条缺口位置                 |
| percent       | number `(0)`                                     | 进度百分比                         |
| showInfo      | boolean `(true)`                                 | 是否显示文字                       |
| status        | enum: 'success', 'fail', 'active'                | 进度状态                           |
| strokeColor   | string                                           | 线条颜色                           |
| strokeLinecap | enum: 'round', 'square', 'butt' `('round')`      | 不同类型的开放路径的终结           |
| strokeWidth   | number `(6)`                                     | 线条宽度                           |
| trailColor    | string                                           | 背景颜色                           |
| trailWidth    | number `(6)`                                     | 背景宽度                           |
