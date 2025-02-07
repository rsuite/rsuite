# Badge

Used to display the number of unread messages or status on icons or other components.

## Usage

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### With content

<!--{include:`content.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Shapes

If the wrapped element is a circle, you can use the `shape` property `circle` to make the Badge position more reasonable.

<!--{include:`shape.md`}-->

### Offset

If the Badge position is not reasonable, you can use the `offset` property to make fine adjustments.

<!--{include:`offset.md`}-->

### Invisible

<!--{include:`invisible.md`}-->

### Badge without children

<!--{include:`independent.md`}-->

### Colors

<!--{include:`color.md`}-->

## Props

### `<Badge>`

| Property    | Type`(Default)`                                        | Description                                                                                            |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| children    | ReactNode                                              | The wrapped component                                                                                  |
| classPrefix | string `('badge')`                                     | The prefix of the component CSS class                                                                  |
| color       | [Color](#code-ts-color-code) \| CSSProperties['color'] | Set the color of the badge                                                                             |
| compact     | boolean                                                | Whether to use compact mode<br/>![][6.0.0]                                                             |
| content     | number \| ReactNode                                    | The content of the badge                                                                               |
| invisible   | boolean                                                | Whether the badge is invisible<br/>![][6.0.0]                                                          |
| maxCount    | number`(99)`                                           | Max count number（Only valid if `content` is type number）                                             |
| offset      | [number,number] \| [string, string]                    | Define the horizontal and vertical offset of the badge relative to its wrapped element <br/>![][6.0.0] |
| outline     | boolean`(true)`                                        | Whether to use outline mode<br/>![][6.0.0]                                                             |
| placement   | [PlacementCorners](#code-ts-placement-corners-code)    | Set the position of the badge in the wrapped element<br/>![][6.0.0]                                    |
| shape       | 'rectangle' \| 'circle'                                | The shape of the wrapped element<br/>![][6.0.0]                                                        |

<!--{include:(_common/types/color.md)}-->
<!--{include:(_common/types/placement-corners.md)}-->

[6.0.0]: https://img.shields.io/badge/>=-v6.0.0-blue
