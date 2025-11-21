# NumberInput 数字输入框

只能输入数字的文本输入组件。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

使用 `size` 属性设置 NumberInput 组件的不同尺寸。

<!--{include:`size.md`}-->

### 小数

默认支持输入小数，可通过 `step` 属性控制小数精度。

<!--{include:`decimals.md`}-->

### 小数点分隔符

小数点分隔符是一个符号，用于将十进制形式的数字的整数部分与小数部分分开（例如，12.45 中的 "."）。不同的国家地区会指定不同的符号作为分隔符。

<!--{include:`decimal-separator.md`}-->

### 格式化

使用 `formatter` 函数格式化显示值。

<!--{include:`formatter.md`}-->

### 最小值和最大值

使用 `min` 和 `max` 属性设置最小值和最大值。

<!--{include:`max-min.md`}-->

### 设置跨度

使用 `step` 属性自定义值变化的步长。

<!--{include:`step.md`}-->

### 禁用与只读

使用 `disabled` 属性禁用组件，或使用 `readOnly` 属性将其设置为只读。

<!--{include:`disabled.md`}-->

### 显示或隐藏控制按钮

显示或隐藏控制按钮，或提供一个函数来渲染自定义图标。

<!--{include:`controls.md`}-->

### 前缀和后缀

显示在输入框前后的元素。

<!--{include:`prefix-suffix.md`}-->

### InputGroup 组合

<!--{include:`combination.md`}-->

### 受控

通过 `value` 和 `onChange` 属性控制组件状态。

<!--{include:`controlled.md`}-->

## Props

### `<NumberInput>`

| 属性名称         | 类型 `(默认值)`                                              | 描述                                     |
| ---------------- | ------------------------------------------------------------ | ---------------------------------------- |
| classPrefix      | string `('number-input')`                                    | 组件 CSS 类的前缀                        |
| controls         | boolean \| ((trigger: 'up' \| 'down') => ReactNode) `(true)` | 显示或隐藏控制按钮，或通过函数自定义图标 |
| decimalSeparator | string                                                       | 小数点分隔符                             |
| defaultValue     | number                                                       | 默认值（非受控）                         |
| disabled         | boolean                                                      | 禁用                                     |
| formatter        | (value: number) => string                                    | 格式化输入框的值                         |
| max              | number                                                       | 最大值                                   |
| min              | number                                                       | 最小值                                   |
| onChange         | (value: number, event) => void                               | `value` 发生改变时的回调函数             |
| prefix           | ReactNode                                                    | 前缀                                     |
| scrollable       | boolean `(true)`                                             | 是否可以通过鼠标滚动更新值               |
| size             | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                        | 设置输入框尺寸                           |
| step             | number `(1)`                                                 | 每次改变步数，可以为小数                 |
| suffix           | ReactNode                                                    | 后缀                                     |
| value            | number                                                       | 当前值（受控）                           |
