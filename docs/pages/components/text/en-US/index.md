# Text

Text is a basic component that allows you to display text content on the page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Color

<!--{include:`color.md`}-->

### Weight

<!--{include:`weight.md`}-->

### Size

<!--{include:`size.md`}-->

### Override the element

<!--{include:`as.md`}-->

### Text align

<!--{include:`text-align.md`}-->

### Text transform

<!--{include:`text-transform.md`}-->

### Max lines truncation

<!--{include:`max-lines.md`}-->

## Props

### `<Text>`

| Property    | Type`(Default)`                                                                   | Description                                                                                 |
| ----------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| align       | 'left' \| 'center' \| 'right' \| 'justify'                                        | The alignment of the text.                                                                  |
| as          | ElementType`(div)`                                                                | Custom element type for the component.                                                      |
| classPrefix | string `('text')`                                                                 | The prefix of the component CSS class.                                                      |
| color       | [Color](#code-ts-color-code) \| CSSProperties['color']                            | The color of the text.                                                                      |
| maxLines    | number                                                                            | The number of lines to limit the provided text to. Text will be truncated with an ellipsis. |
| muted       | boolean                                                                           | Whether the text is muted.                                                                  |
| size        | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' \| number \| string                         | The size of the text.                                                                       |
| transform   | 'uppercase' \| 'lowercase' \| 'capitalize'                                        | The transformation of the text.                                                             |
| weight      | 'thin' \| 'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' | The weight of the text.                                                                     |

<!--{include:(_common/types/color.md)}-->
