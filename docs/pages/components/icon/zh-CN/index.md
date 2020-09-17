# Icon 图标

图标组件，除了内置的常用图标外，还可以自定义引入 SVG 图标。

`<Icon>` 通过字体实现的矢量图形。
`<IconStack>` 实现多个图标叠加。

## 获取组件

```js
import { Icon } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

[图标库](/tools/icons)

### `<Icon>`

| 属性名称       | 类型 `(默认值)`                    | 描述                                    |
| -------------- | ---------------------------------- | --------------------------------------- |
| classPrefix    | string `('icon')`                  | 组件 CSS 类的前缀                       |
| componentClass | React.ElementType `('i')`          | 为组件自定义元素类型                    |
| fixedWidth     | boolean                            | 因为有很多图标尺寸参差不齐,固定图标宽度 |
| flip           | enum: 'horizontal', 'vertical'     | 翻转图标                                |
| icon \*        | union: string,SvgSymbol            | 使用的 icon 名                          |
| inverse        | boolean                            | 翻转颜色                                |
| pulse          | boolean                            | 动态旋转图标，旋转 8 步                 |
| rotate         | number                             | 旋转图标                                |
| size           | enum: 'lg', '2x', '3x', '4x', '5x' | 放大图标                                |
| spin           | boolean                            | 动态旋转图标                            |
| stack          | enum: '1x', '2x'                   | 组合多个图标                            |
| svgStyle       | React.CSSProperties                | 当使用自定义 svg Icon, 设置 svg 的样式  |


### `<IconStack>`

| 属性名称    | 类型 `(默认值)`                    | 描述              |
| ----------- | ---------------------------------- | ----------------- |
| classPrefix | string `('icon')`                  | 组件 CSS 类的前缀 |
| size        | enum: 'lg', '2x', '3x', '4x', '5x' | 放大图标          |
