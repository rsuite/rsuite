# Icon 图标

图标组件，除了内置的常用图标外，还可以自定义引入 SVG 图标。

`<Icon>` 通过字体实现的矢量图形。
`<IconStack>` 实现多个图标叠加。

## 获取组件

<!--{include:(components/icon/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 动态图标

<!--{include:`spin.md`}-->

### 旋转和翻转

<!--{include:`rotate.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 叠加图标

<!--{include:`stack.md`}-->

### 自定义图标

自定义图标, 可以渲染一个外部引入的 svg 文件。

<!--{include:`custom.md`}-->

同时需要在 webpack 中配置 svg loader, 这里用到一个 [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)

```js
{
  test: /\.svg$/,
  use: [{
    loader: 'svg-sprite-loader',
    options: {
      symbolId: 'icon-[name]'
    }
  }]
}
```

### 设置 SVG 图标的颜色

如果您需要 svg 图标颜色与文字颜色一致，可以使用 [currentColor](https://caniuse.com/#search=currentColor)以确保您的 `fill`、 `stroke` 颜色与字体颜色保持一致。如果您使用了 [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)，则应对 `use` 元素设置 `currentColor`。

<!--{include:`custom-svg.md`}-->

## Props

[图标库](/tools/icons)

### `<Icon>`

| 属性名称    | 类型 `(默认值)`                    | 描述                                    |
| ----------- | ---------------------------------- | --------------------------------------- |
| classPrefix | string `('icon')`                  | 组件 CSS 类的前缀                       |
| as          | ElementType `('i')`                | 为组件自定义元素类型                    |
| fixedWidth  | boolean                            | 因为有很多图标尺寸参差不齐,固定图标宽度 |
| flip        | enum: 'horizontal', 'vertical'     | 翻转图标                                |
| icon \*     | union: string, SvgSymbol           | 使用的 Icon 名                          |
| inverse     | boolean                            | 翻转颜色                                |
| pulse       | boolean                            | 动态旋转图标，旋转 8 步                 |
| rotate      | number                             | 旋转图标                                |
| size        | enum: 'lg', '2x', '3x', '4x', '5x' | 放大图标                                |
| spin        | boolean                            | 动态旋转图标                            |
| stack       | enum: '1x', '2x'                   | 组合多个图标                            |
| svgStyle    | CSSProperties                      | 当使用自定义 svg Icon, 设置 svg 的样式  |

### `<IconStack>`

| 属性名称    | 类型 `(默认值)`                    | 描述              |
| ----------- | ---------------------------------- | ----------------- |
| classPrefix | string `('icon-stack')`            | 组件 CSS 类的前缀 |
| size        | enum: 'lg', '2x', '3x', '4x', '5x' | 放大图标          |
