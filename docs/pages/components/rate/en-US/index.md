# Rate

A rating indicates user interest in content.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}}-->

### Sizes

The size of the rate component

<!--{include:`size.md`}}-->

### Color

The color of the rate component. Supports both preset theme colors and custom colors (hex, rgb, etc.).

<!--{include:`color.md`}}-->

### Half ratings

<!--{include:`half-select.md`}}-->

### Vertical direction

Direction when half select

<!--{include:`vertical.md`}}-->

### Hover feedback

<!--{include:`hover.md`}}-->

### Disabled and read only

<!--{include:`disabled.md`}}-->

### Characters

You can use other icons, emoji, numbers, Chinese or other custom patterns

<!--{include:`character.md`}}-->

### Customized rates

When there are multiple levels of rating, you can customize the character displayed at each level, but you need to implement this yourself

<!--{include:`custom-character.md`}}-->

## Accessibility

WAI tutorial: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating

## Props

| Property        | Type `(Default)`                                       | Description                                                                          |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| allowHalf       | boolean`(false)`                                       | Whether to support half option                                                       |
| character       | ReactNode                                              | custom character                                                                     |
| cleanable       | boolean`(true)`                                        | Whether clear is supported                                                           |
| defaultValue    | number`(0)`                                            | The default value (uncontrolled)                                                     |
| disabled        | boolean`(false)`                                       | Disabled，Cannot interact when value is true                                         |
| max             | number`(5)`                                            | Maximum score                                                                        |
| renderCharacter | (value: number) => ReactNode                           | Customize the render character function                                              |
| readOnly        | boolean                                                | Whether it is read-only, if true, no interaction is possible                         |
| size            | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                  | Set component size                                                                   |
| color           | [Color](#code-ts-color-code) \| CSSProperties['color'] | Set component color. Supports preset theme colors and custom colors (hex, rgb, etc.) |
| value           | number                                                 | The current value (controlled)                                                       |
| vertical        | boolean`(false)`                                       | direction when half select                                                           |
| onChange        | (value: number, event) => void                         | Callback function that changes value                                                 |
| onChangeActive  | (value: number, event) => void                         | Callback function that is fired when the hover state changes.                        |

<!--{include:(_common/types/color.md)}-->
