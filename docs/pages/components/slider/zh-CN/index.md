# Slider 滑动输入控件

用于展示当前值和可选范围的滑动输入控件。

- `<Slider>` 滑动输入控件。
- `<RangeSlider>` 滑动范围输入控件。

## 获取组件

<!--{include:(components/slider/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 显示进度条

<!--{include:`progress.md`}-->

### 显示刻度

<!--{include:`graduated.md`}-->

### 垂直滑动

<!--{include:`vertical.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 显示值(受控的)

<!--{include:`value.md`}-->

### 自定义

<!--{include:`custom.md`}-->

### 自定义大小

<!--{include:`size.md`}-->

## Props

### `<Slider>`

| 属性名称        | 类型`(默认值)`              | 描述                              |
| --------------- | --------------------------- | --------------------------------- |
| barClassName    | string                      | 应用于滑动条 DOM 节点的 css class |
| defaultValue    | number                      | 默认值                            |
| disabled        | boolean                     | 是否禁用                          |
| graduated       | boolean                     | 显示刻度                          |
| handleClassName | string                      | 应用于手柄 DOM 节点的 css class   |
| handleStyle     | CSSProperties               | 附加手柄样式                      |
| handleTitle     | ReactNode                   | 自定义手柄内显示内容              |
| max             | number`(100)`               | 滑动范围的最大值                  |
| min             | number`(0)`                 | 滑动范围的最小值                  |
| onChange        | (value: number) => void     | 数据发生改变的回调函数            |
| progress        | boolean                     | 显示滑动的进度条                  |
| renderMark      | (mark: number) => ReactNode | 自定义渲染标尺上的标签            |
| step            | number`(1)`                 | 滑动一步的值                      |
| tooltip         | boolean`(true)`             | 滑动时候，是否显示 tooltip        |
| value           | number                      | 值（受控）                        |
| vertical        | boolean                     | 垂直滑动                          |

### `<RangeSlider>`

| 属性名称        | 类型`(默认值)`                   | 描述                              |
| --------------- | -------------------------------- | --------------------------------- |
| barClassName    | string                           | 应用于滑动条 DOM 节点的 css class |
| defaultValue    | [number,number]                  | 默认值                            |
| disabled        | boolean                          | 是否禁用                          |
| graduated       | boolean                          | 显示刻度                          |
| handleClassName | string                           | 应用于手柄 DOM 节点的 css class   |
| handleStyle     | CSSProperties                    | 附加手柄样式                      |
| handleTitle     | ReactNode                        | 自定义手柄内显示内容              |
| max             | number`(100)`                    | 滑动范围的最大值                  |
| min             | number`(0)`                      | 滑动范围的最小值                  |
| onChange        | (value: [number,number]) => void | 数据发生改变的回调函数            |
| progress        | boolean                          | 显示滑动的进度条                  |
| renderMark      | (mark: number) => ReactNode      | 自定义渲染标尺上的标签            |
| step            | number`(1)`                      | 滑动一步的值                      |
| tooltip         | boolean`(true)`                  | 滑动时候，是否显示 tooltip        |
| value           | [number,number]                  | 值（受控）                        |
| vertical        | boolean                          | 垂直滑动                          |
