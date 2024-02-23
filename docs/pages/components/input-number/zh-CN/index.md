# InputNumber 数字输入框

只能输入数字的文本输入组件。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 浮点数

<!--{include:`decimals.md`}-->

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

<!-- prettier-sort-markdown-table -->

| 属性名称     | 类型 `(默认值)`                       | 描述                                                                     |
| ------------ | ------------------------------------- | ------------------------------------------------------------------------ |
| classPrefix  | string `('input-number')`             | 组件 CSS 类的前缀                                                        |
| defaultValue | number                                | 设置默认值                                                               |
| disabled     | boolean                               | 禁用                                                                     |
| formatter    | (value: number) => string             | 格式化输入框的值 <br/>![](https://img.shields.io/badge/min-v5.55.0-blue) |
| max          | number                                | 最大值                                                                   |
| min          | number                                | 最小值                                                                   |
| onChange     | (value: number, event) => void        | `value` 发生改变时的回调函数                                             |
| postfix      | ReactNode                             | 后缀                                                                     |
| prefix       | ReactNode                             | 前缀                                                                     |
| scrollable   | boolean `(true)`                      | 是否可以通过鼠标滚动更新值                                               |
| size         | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | 设置输入框尺寸                                                           |
| step         | number `(1)`                          | 每次改变步数，可以为小数                                                 |
| value        | number                                | 设置值 `受控`                                                            |
