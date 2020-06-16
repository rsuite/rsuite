# Carousel 轮播

以轮播的方式显示一组元素

## 获取组件

```js
import { Carousel } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Carousel>`

| 属性名称       | 类型`(默认值)`                                  | 描述              |
| -------------- | ----------------------------------------------- | ----------------- |
| autoplay       | boolean                                         | 自动轮播          |
| children       | string, React.ReactNode                         | 轮播的元素        |
| classPrefix    | string `('carousel')`                           | 组件 CSS 类的前缀 |
| componentClass | React.ElementType `('div')`                     | 自定义元素类型    |
| placement      | enum:'top','bottom','left','right' `('bottom')` | 按钮的位置        |
| shape          | enum:'dot','bar' `('dot')`                      | 按钮的形状        |
