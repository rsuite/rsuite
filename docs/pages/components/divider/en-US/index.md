# Divider

Divider are used to group content horizontally or vertically.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Sizes

<!--{include:`size.md`}-->

### Colors

<!--{include:`color.md`}-->

### Divider with Label

<!--{include:`with-label.md`}-->

### Vertical Divider

<!--{include:`vertical.md`}-->

## Props

### `<Divider>`

| Property      | Type`(default)`                                          | Description                                       |
| ------------- | -------------------------------------------------------- | ------------------------------------------------- |
| appearance    | 'solid' \| 'dashed' \| 'dotted'                          | The appearance of the divider                     |
| as            | ElementType `(div)`                                      | You can use a custom element for this component   |
| classPrefix   | string `('divider')`                                     | The prefix of the component CSS class             |
| color         | Color \| CSSProperties['color']                          | The color of the divider                          |
| label         | ReactNode                                                | The content of the label                          |
| labelPosition | 'left' \| 'right' \| 'center'                            | The position of the label                         |
| size          | 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs' \| number \| string | The size of the divider                           |
| spacing       | 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs' \| number \| string | The spacing between the divider and its content   |
| vertical      | boolean                                                  | Vertical dividing line. Cannot be used with label |

<!--{include:(_common/types/color.md)}-->
