# Icon

Icon components, in addition to the built-in common icons, you can also customize the introduction of SVG icons.

`<Icon>` Vector graphics implemented by font.

## Import

<!--{include:(components/icon/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Spin and Pulse

<!--{include:`spin.md`}-->

### Rotate and flip

<!--{include:`rotate.md`}-->

### Size

<!--{include:`size.md`}-->

### Stack

<!--{include:`stack.md`}-->

### Custom Icon

Custom Icon to render an externally-introduced SVG file.

<!--{include:`custom.md`}-->

You also need to configure SVG loader in webpack to use [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)

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

### Svg icon color

If you need the svg icon color to match the text color, you can use [currentColor](https://caniuse.com/#search=currentColor) to ensure that your `fill`,`strocke` colors match the font color.If you used [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader), you should set `currentColor` for `use` element.

<!--{include:`custom-svg.md`}-->

## Props

[All Icons](/tools/icons)

### `<Icon>`

| Property    | Type `(Default)`                   | Description                                                    |
| ----------- | ---------------------------------- | -------------------------------------------------------------- |
| classPrefix | string `('icon')`                  | The prefix of the component CSS class                          |
| as          | ElementType `('i')`                | You can use a custom element type for this component           |
| fixedWidth  | boolean                            | Fixed icon width because there are many icons with uneven size |
| flip        | enum: 'horizontal', 'vertical'     | Flip the icon                                                  |
| icon \*     | union: string,SvgSymbol            | Icon name                                                      |
| inverse     | boolean                            | Inverse color                                                  |
| pulse       | boolean                            | Use pulse to have it rotate with 8 steps                       |
| rotate      | number                             | Rotate the icon                                                |
| size        | enum: 'lg', '2x', '3x', '4x', '5x' | Sets the icon size                                             |
| spin        | boolean                            | Dynamic rotation icon                                          |
| stack       | enum: '1x', '2x'                   | Combine multiple icons                                         |
| svgStyle    | CSSProperties                      | Set SVG style when using custom SVG Icon                       |

### `<IconStack>`

| Property    | Type `(Default)`                   | Description                           |
| ----------- | ---------------------------------- | ------------------------------------- |
| classPrefix | string `('icon-stack')`                  | The prefix of the component CSS class |
| size        | enum: 'lg', '2x', '3x', '4x', '5x' | Sets the icon size                    |
