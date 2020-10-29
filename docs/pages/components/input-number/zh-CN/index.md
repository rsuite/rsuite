# InputNumber 数字输入框

只能输入数字的文本输入组件。

## 获取组件

<!--{include:(components/input-number/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 浮点数

<!--{include:`decimals.md`}-->

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

| 属性名称     | 类型 `(默认值)`                                   | 描述                         |
| ------------ | ------------------------------------------------- | ---------------------------- |
| classPrefix  | string `('input-number')`                         | 组件 CSS 类的前缀            |
| defaultValue | number                                            | 设置默认值                   |
| disabled     | boolean                                           | 禁用                         |
| max          | number `(Infinity)`                               | 最大值                       |
| min          | number `(-Infinity)`                              | 最小值                       |
| onChange     | (value: number, event) => void                    | `value` 发生改变时的回调函数 |
| postfix      | ReactNode                                         | 后缀                         |
| prefix       | ReactNode                                         | 前缀                         |
| scrollable   | boolean `(true)`                                  | 是否可以通过鼠标滚动更新值   |
| size         | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | 设置输入框尺寸               |
| step         | number `(1)`                                      | 每次改变步数，可以为小数     |
| value        | number                                            | 设置值 `受控`                |
