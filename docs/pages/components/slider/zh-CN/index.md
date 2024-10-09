# Slider 滑动输入控件

用于展示当前值和可选范围的滑动输入控件。

## 获取组件

<!--{include:<import-guide>}-->

- `<Slider>` 滑动输入控件。
- `<RangeSlider>` 滑动范围输入控件。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 显示进度条

<!--{include:`progress.md`}-->

### 显示刻度

<!--{include:`graduated.md`}-->

### 垂直滑动

<!--{include:`vertical.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 显示值(受控的)

<!--{include:`value.md`}-->

### 约束

限制起始值不得大于 25, 结束值不得小于 35。

<!--{include:`constraint.md`}-->

### 自定义

<!--{include:`custom.md`}-->

### 自定义大小

<!--{include:`size.md`}-->

### 无障碍设计

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider

### 键盘交互

- <kbd>ArrowRight</kbd>，<kbd>ArrowUp</kbd>: 将 Slider 的值增加一级。
- <kbd>ArrowLeft</kbd>，<kbd>ArrowDown</kbd>: 将 Slider 的值减小一级。
- <kbd>Home</kbd>: 将 Slider 设置为其范围内的第一个允许值。
- <kbd>End</kbd>: 将 Slider 设置为其范围内的最后一个允许值。

### WAI-ARIA Roles, States, and Properties

- 用作可聚焦 Slider 元素具有 `slider` role。
- Slider 元素的 `aria-valuenow` 属性设置为代当前值的十进制值。
- 如果 `aria-valuenow` 的值对用户不友好，则将 `aria-valuetext` 属性设置为字符串，以使滑块值易于理解。 您可以使用 `getAriaValueText` 或 `aria-valuetext`属性更改名称。

```jsx
<Slider getAriaValueText={value => `${value}MB`} />
```

- Slider 元素的 `aria-valuemin` 属性设置为十进制值，代表最小允许值。
- Slider 元素的 `aria-valuemax` 属性设置为十进制值，代表最大允许值。
- 如果 Slider 是垂直方向的，则将其 `aria-orientation` 设置为 `vertical`。 滑块的 `aria-orientation` 的默认值为 `horizontal`。
- 如果 Slider 具有可见标签，则在元素上添加 `aria-labelledby` 引用。 否则，Slider 元素具有 `aria-label` 提供的标签。

```jsx
<>
  <label id="slider-label">内存大小</label>
  <Slider aria-labelledby="slider-label" />
</>
```

## Props

### `<Slider>`

| 属性名称          | 类型`(默认值)`                  | 描述                                          |
| ----------------- | ------------------------------- | --------------------------------------------- |
| barClassName      | string                          | 应用于滑动条 DOM 节点的 css class             |
| defaultValue      | number                          | 默认值（非受控）                              |
| disabled          | boolean                         | 是否禁用                                      |
| getAriaValueText  | (value: number) => string;      | 提供 Slider 的当前值的用户友好名称            |
| graduated         | boolean                         | 显示刻度                                      |
| handleClassName   | string                          | 应用于手柄 DOM 节点的 css class               |
| handleStyle       | CSSProperties                   | 附加手柄样式                                  |
| handleTitle       | ReactNode                       | 自定义手柄内显示内容                          |
| max               | number`(100)`                   | 滑动范围的最大值                              |
| min               | number`(0)`                     | 滑动范围的最小值                              |
| onChange          | (value: number, event) => void  | 数据发生改变的回调函数                        |
| onChangeCommitted | (value: number, event) => void; | 在 mouseup 事件触发后，同时数据发生改变的回调 |
| progress          | boolean                         | 显示滑动的进度条                              |
| renderMark        | (mark: number) => ReactNode     | 自定义渲染标尺上的标签                        |
| renderTooltip     | (value: number ) => ReactNode   | 自定义渲染 Tooltip 的内容                     |
| step              | number`(1)`                     | 滑动一步的值                                  |
| tooltip           | boolean`(true)`                 | 滑动时候，是否显示 tooltip                    |
| value             | number                          | 当前值（受控）                                |
| vertical          | boolean                         | 垂直滑动                                      |

### `<RangeSlider>`

| 属性名称          | 类型`(默认值)`                                         | 描述                                                                       |
| ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| barClassName      | string                                                 | 应用于滑动条 DOM 节点的 css class                                          |
| constraint        | `(value: [number, number]) => boolean`                 | 在 `onChange` 触发之前对下一个值进行检查, 返回 `false` 则不触发 `onChange` |
| defaultValue      | [number,number]                                        | 默认值（非受控）                                                           |
| disabled          | boolean                                                | 是否禁用                                                                   |
| getAriaValueText  | (value: number,eventKey:'start'&#124;'end') => string; | 提供 Slider 的当前值的用户友好名称                                         |
| graduated         | boolean                                                | 显示刻度                                                                   |
| handleClassName   | string                                                 | 应用于手柄 DOM 节点的 css class                                            |
| handleStyle       | CSSProperties                                          | 附加手柄样式                                                               |
| handleTitle       | ReactNode                                              | 自定义手柄内显示内容                                                       |
| max               | number`(100)`                                          | 滑动范围的最大值                                                           |
| min               | number`(0)`                                            | 滑动范围的最小值                                                           |
| onChange          | (value: [number,number], event) => void                | 数据发生改变的回调函数                                                     |
| onChangeCommitted | (value: [number,number], event) => void;               | 在 mouseup 事件触发后，同时数据发生改变的回调                              |
| progress          | boolean                                                | 显示滑动的进度条                                                           |
| renderMark        | (mark: number) => ReactNode                            | 自定义渲染标尺上的标签                                                     |
| renderTooltip     | (value: number ) => ReactNode                          | 自定义渲染 Tooltip 的内容                                                  |
| step              | number`(1)`                                            | 滑动一步的值                                                               |
| tooltip           | boolean`(true)`                                        | 滑动时候，是否显示 tooltip                                                 |
| value             | [number,number]                                        | 当前值（受控）                                                             |
| vertical          | boolean                                                | 垂直滑动                                                                   |
