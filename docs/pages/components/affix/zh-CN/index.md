# Affix 固定位置

可以辅助导航、按钮等组件固定在可视范围内。常用于内容较长的页面， 把指定元素固定在页面可视范围，辅助快速操作。

## 获取组件

```js
import { Affix } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Affix>`

| 属性名称    | 类型`(默认值)`                    | 描述                                     |
| ----------- | --------------------------------- | ---------------------------------------- |
| children    | string, React.ReactNode           | 需要固定位置的元素                       |
| classPrefix | string `('affix')`                | 组件 CSS 类的前缀                        |
| container   | HTMLElement , (() => HTMLElement) | 指定容器, 容器在可视范围内才固定元素     |
| onChange    | (fixed:boolean) => void           | 当非固定与固定状态发生改变时候的回调函数 |
| top         | number (0)                        | 设置固定高度                             |
