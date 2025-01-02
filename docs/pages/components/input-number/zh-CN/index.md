# InputNumber 数字输入框

只能输入数字的文本输入组件。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 小数

<!--{include:`decimals.md`}-->

### 小数点分隔符

小数点分隔符是一个符号，用于将十进制形式的数字的整数部分与小数部分分开（例如，12.45 中的 "."）。不同的国家地区会指定不同的符号作为分隔符。

<!--{include:`decimal-separator.md`}-->

### 格式化

<!--{include:`formatter.md`}-->

### 限制范围

范围: 10 - 100

<!--{include:`max-min.md`}-->

### 设置跨度

<!--{include:`step.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 组合

<!--{include:`combination.md`}-->

### 受控

<!--{include:`controlled.md`}-->

## Props

### `<InputNumber>`

| 属性名称         | 类型 `(默认值)`                       | 描述                             |
| ---------------- | ------------------------------------- | -------------------------------- |
| classPrefix      | string `('input-number')`             | 组件 CSS 类的前缀                |
| decimalSeparator | string                                | 小数点分隔符<br/>![][5.69.0]     |
| defaultValue     | number                                | 默认值（非受控）                 |
| disabled         | boolean                               | 禁用                             |
| formatter        | (value: number) => string             | 格式化输入框的值<br/>![][5.55.0] |
| max              | number                                | 最大值                           |
| min              | number                                | 最小值                           |
| onChange         | (value: number, event) => void        | `value` 发生改变时的回调函数     |
| postfix          | ReactNode                             | 后缀                             |
| prefix           | ReactNode                             | 前缀                             |
| scrollable       | boolean `(true)`                      | 是否可以通过鼠标滚动更新值       |
| size             | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | 设置输入框尺寸                   |
| step             | number `(1)`                          | 每次改变步数，可以为小数         |
| value            | number                                | 当前值（受控）                   |

[5.69.0]: https://img.shields.io/badge/>=-v5.69.0-blue
[5.55.0]: https://img.shields.io/badge/>=-v5.55.0-blue
