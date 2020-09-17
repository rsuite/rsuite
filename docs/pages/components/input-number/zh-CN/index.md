# InputNumber 数字输入框

`<InputNumber>` 数字输入框

## 获取组件

```js
import { InputNumber } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<InputNumber>`

| 属性名称     | 类型 `(默认值)`                                                    | 描述                         |
| ------------ | ------------------------------------------------------------------ | ---------------------------- |
| classPrefix  | string `('input-number')`                                          | 组件 CSS 类的前缀            |
| defaultValue | number                                                             | 设置默认值                   |
| disabled     | boolean                                                            | 禁用                         |
| max          | number `(Infinity)`                                                | 最大值                       |
| min          | number `(-Infinity)`                                               | 最小值                       |
| onChange     | (value: any, event: SyntheticInputEvent<HTMLInputElement>) => void | `value` 发生改变时的回调函数 |
| postfix      | React.Node                                                         | 后缀                         |
| prefix       | React.Node                                                         | 前缀                         |
| scrollable   | boolean `(true)`                                                   | 是否可以通过鼠标滚动更新值   |
| size         | enum: 'lg', 'md', 'sm', 'xs' `('md')`                              | 设置输入框尺寸               |
| step         | number `(1)`                                                       | 每次改变步数，可以为小数     |
| value        | number                                                             | 设置值 `受控`                |
