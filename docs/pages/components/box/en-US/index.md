# Box

Box is a container component for all components.

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

## Props

### `<Box>`

| Property  | Type`(default)`                                            | Description                                                           |
| --------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| as        | ElementType `('div')`                                      | Custom element type for the component                                 |
| bg        | [ColorScheme][color-scheme] \| CSSProperties['background'] | Background color of the box. Supports theme colors (e.g., 'blue.600') |
| border    | CSSProperties['border']                                    | CSS border property for the box                                       |
| children  | ReactNode                                                  | The content of the component                                          |
| className | string                                                     | Additional CSS class                                                  |
| color     | [ColorScheme][color-scheme] \| CSSProperties['color']      | Text color of the box. Supports theme colors (e.g., 'blue.600')       |
| display   | CSSProperties['display']                                   | CSS display property                                                  |
| h         | CSSProperties['height']                                    | Height of the box                                                     |
| hidden    | [Breakpoints][breakpoints]                                 | Hide the component at the specified breakpoint                        |
| m         | CSSProperties['margin']                                    | Margin on all sides                                                   |
| mb        | CSSProperties['marginBottom']                              | Margin bottom                                                         |
| ml        | CSSProperties['marginLeft']                                | Margin left                                                           |
| mr        | CSSProperties['marginRight']                               | Margin right                                                          |
| mt        | CSSProperties['marginTop']                                 | Margin top                                                            |
| mx        | CSSProperties['marginInline']                              | Margin on left and right sides                                        |
| my        | CSSProperties['marginBlock']                               | Margin on top and bottom sides                                        |
| p         | CSSProperties['padding']                                   | Padding on all sides                                                  |
| pb        | CSSProperties['paddingBottom']                             | Padding bottom                                                        |
| pl        | CSSProperties['paddingLeft']                               | Padding left                                                          |
| pr        | CSSProperties['paddingRight']                              | Padding right                                                         |
| pt        | CSSProperties['paddingTop']                                | Padding top                                                           |
| px        | CSSProperties['paddingInline']                             | Padding on left and right sides                                       |
| py        | CSSProperties['paddingBlock']                              | Padding on top and bottom sides                                       |
| rounded   | [Size][size] \| CSSProperties['borderRadius']              | Border radius of the box                                              |
| shadow    | [Size][size] \| CSSProperties['boxShadow']                 | Box shadow                                                            |
| style     | CSSProperties                                              | Inline style                                                          |
| visible   | [Breakpoints][breakpoints]                                 | Show the component only at the specified breakpoint                   |
| w         | CSSProperties['width']                                     | Width of the box                                                      |

<!--{include:(_common/types/breakpoints.md)}-->
<!--{include:(_common/types/size.md)}-->
<!--{include:(_common/types/color-scheme.md)}-->

[breakpoints]: #code-ts-breakpoints-code
[size]: #code-ts-size-code
[color-scheme]: #code-ts-color-scheme-code
