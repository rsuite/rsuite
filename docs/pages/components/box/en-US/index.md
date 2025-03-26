# Box

Box component is the base component for all components, providing shorthand for style properties.

## Import

<!--{include:<import-guide>}-->

## Usage

<!--{include:`usage.md`}-->

## Examples

### Color and Background

<!--{include:`background.md`}-->

### Border and Rounded

<!--{include:`border.md`}-->

### Shadow

<!--{include:`shadow.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

## Props

### `<Box>`

| Property  | Type`(default)`                               | Description                                                         |
| --------- | --------------------------------------------- | ------------------------------------------------------------------- |
| as        | ElementType `('div')`                         | Custom element type for the component                               |
| children  | ReactNode                                     | The content of the component                                        |
| className | string                                        | Additional CSS class                                                |
| display   | CSSProperties['display']                      | CSS display property                                                |
| hideFrom  | [Breakpoints][breakpoints]                    | Breakpoint above which the component is hidden with `display: none` |
| showFrom  | [Breakpoints][breakpoints]                    | Breakpoint below which the component is hidden with `display: none` |
| style     | CSSProperties                                 | Inline style                                                        |
| ...       | [Style Shorthand](#code-style-shorthand-code) | Other style shorthand properties                                    |

### `Style Shorthand`

| Property | Type`(default)`                                            | Description                                                           |
| -------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| bd       | CSSProperties['border']                                    | CSS border property for the box                                       |
| bg       | [ColorScheme][color-scheme] \| CSSProperties['background'] | Background color of the box. Supports theme colors (e.g., 'blue.600') |
| c        | [ColorScheme][color-scheme] \| CSSProperties['color']      | Text color of the box. Supports theme colors (e.g., 'blue.600')       |
| h        | CSSProperties['height']                                    | Height of the box                                                     |
| m        | CSSProperties['margin']                                    | Margin on all sides                                                   |
| mb       | CSSProperties['marginBottom']                              | Margin bottom                                                         |
| ml       | CSSProperties['marginLeft']                                | Margin left                                                           |
| mr       | CSSProperties['marginRight']                               | Margin right                                                          |
| mt       | CSSProperties['marginTop']                                 | Margin top                                                            |
| mx       | CSSProperties['marginInline']                              | Margin on left and right sides                                        |
| my       | CSSProperties['marginBlock']                               | Margin on top and bottom sides                                        |
| p        | CSSProperties['padding']                                   | Padding on all sides                                                  |
| pb       | CSSProperties['paddingBottom']                             | Padding bottom                                                        |
| pl       | CSSProperties['paddingLeft']                               | Padding left                                                          |
| pr       | CSSProperties['paddingRight']                              | Padding right                                                         |
| pt       | CSSProperties['paddingTop']                                | Padding top                                                           |
| px       | CSSProperties['paddingInline']                             | Padding on left and right sides                                       |
| py       | CSSProperties['paddingBlock']                              | Padding on top and bottom sides                                       |
| rounded  | [Size][size] \| CSSProperties['borderRadius']              | Border radius of the box                                              |
| shadow   | [Size][size] \| CSSProperties['boxShadow']                 | Box shadow                                                            |
| w        | CSSProperties['width']                                     | Width of the box                                                      |

<!--{include:(_common/types/breakpoints.md)}-->

[breakpoints]: #code-ts-breakpoints-code

<!--{include:(_common/types/size.md)}-->

[size]: #code-ts-size-code

<!--{include:(_common/types/color-scheme.md)}-->

[color-scheme]: #code-ts-color-scheme-code
