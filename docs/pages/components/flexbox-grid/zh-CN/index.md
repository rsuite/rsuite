# FlexboxGrid 弹性栅格

通过 CSS Flexbox 实现的栅格布局组件，提供 24 栅格。

- `<FlexboxGrid>`
- `<FlexboxGrid.Item>`

## 获取组件

```js
import { FlexboxGrid } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<FlexboxGrid>`

| 属性名称    | 类型`(默认值)`                                                               | 描述              |
| ----------- | ---------------------------------------------------------------------------- | ----------------- |
| align       | enum: 'top' , 'middle' , 'bottom' `('top')`                                  | 对齐方式          |
| classPrefix | string `('flex-box-grid')`                                                   | 组件 CSS 类的前缀 |
| justify     | enum : 'start', 'end', 'center', 'space-around', 'space-between' `('start')` | 水平排列方式      |

### `<FlexboxGrid.Item>`

| 属性名称       | 类型`(默认值)`                  | 描述                 |
| -------------- | ------------------------------- | -------------------- |
| classPrefix    | string `('flex-box-grid-item')` | 组件 CSS 类的前缀    |
| colspan        | number `(0)`                    | 栅格占位格数         |
| order          | number `(0)`                    | 栅格顺序，用于排序   |
| componentClass | React.ElementType `('div')`     | 为组件自定义元素类型 |
