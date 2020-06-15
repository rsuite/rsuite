# Icon

Icon components, in addition to the built-in common icons, you can also customize the introduction of SVG icons.

`<Icon>` Vector graphics implemented by font.

## Usage

```js
import { Icon } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

[All Icons](/tools/icons)

### `<Icon>`

| Property       | Type `(Default)`                   | Description                                                    |
| -------------- | ---------------------------------- | -------------------------------------------------------------- |
| classPrefix    | string `('icon')`                  | The prefix of the component CSS class                          |
| componentClass | React.ElementType `('i')`          | You can use a custom element type for this component           |
| fixedWidth     | boolean                            | Fixed icon width because there are many icons with uneven size |
| flip           | enum: 'horizontal', 'vertical'     | Flip the icon                                                  |
| icon \*        | union: string,SvgSymbol            | Icon name                                                      |
| inverse        | boolean                            | Inverse color                                                  |
| pulse          | boolean                            | Use pulse to have it rotate with 8 steps                       |
| rotate         | number                             | Rotate the icon                                                |
| size           | enum: 'lg', '2x', '3x', '4x', '5x' | Sets the icon size                                             |
| spin           | boolean                            | Dynamic rotation icon                                          |
| stack          | enum: '1x', '2x'                   | Combine multiple icons                                         |
| svgStyle       | React.CSSProperties                | Set SVG style when using custom SVG Icon                       |

### `<IconStack>`

| Property    | Type `(Default)`                   | Description                           |
| ----------- | ---------------------------------- | ------------------------------------- |
| classPrefix | string `('icon')`                  | The prefix of the component CSS class |
| size        | enum: 'lg', '2x', '3x', '4x', '5x' | Sets the icon size                    |
