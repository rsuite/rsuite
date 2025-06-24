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

Box component supports responsive values for all shorthand CSS properties. This allows you to define different styles for different breakpoints.

```jsx
<Box
  w={{ xs: '100%', md: '80%', lg: '60%' }}
  p={{ xs: '10px', md: '20px' }}
  display={{ xs: 'block', md: 'flex' }}
>
  This box has responsive width, padding and display
</Box>
```

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

The Box component provides a series of shorthand properties for more concise style settings. These properties directly map to their corresponding CSS properties.

- **Theme Values**: Provided theme presets, such as `<Box bg='blue.600' />`, `<Box rounded='lg' />`, etc.
- **Responsive Values**: Provided responsive values, such as `<Box w={{ xs: '100%', md: '80%', lg: '60%' }} />`, etc.
- **Standard CSS Properties**: In addition to the shorthand properties below, all standard CSS properties are also supported, for example: `<Box color="red" fontSize="16px" />`, `<Box aspectRatio="16/9" />`, etc.

| Property    | CSS Property           | Theme Values                |
| ----------- | ---------------------- | --------------------------- |
| `display`   | `display`              | -                           |
| `pos`       | `position`             | -                           |
| `boxsizing` | `boxSizing`            | -                           |
| `w`         | `width`                | -                           |
| `h`         | `height`               | -                           |
| `minw`      | `minWidth`             | -                           |
| `maxw`      | `maxWidth`             | -                           |
| `minh`      | `minHeight`            | -                           |
| `maxh`      | `maxHeight`            | -                           |
| `m`         | `margin`               | -                           |
| `mt`        | `marginTop`            | -                           |
| `mr`        | `marginRight`          | -                           |
| `mb`        | `marginBottom`         | -                           |
| `ml`        | `marginLeft`           | -                           |
| `mx`        | `marginInline`         | -                           |
| `my`        | `marginBlock`          | -                           |
| `ms`        | `marginInlineStart`    | -                           |
| `me`        | `marginInlineEnd`      | -                           |
| `p`         | `padding`              | -                           |
| `pt`        | `paddingTop`           | -                           |
| `pr`        | `paddingRight`         | -                           |
| `pb`        | `paddingBottom`        | -                           |
| `pl`        | `paddingLeft`          | -                           |
| `px`        | `paddingInline`        | -                           |
| `py`        | `paddingBlock`         | -                           |
| `ps`        | `paddingInlineStart`   | -                           |
| `pe`        | `paddingInlineEnd`     | -                           |
| `left`      | `left`                 | -                           |
| `top`       | `top`                  | -                           |
| `right`     | `right`                | -                           |
| `bottom`    | `bottom`               | -                           |
| `inset`     | `inset`                | -                           |
| `insetx`    | `insetInline`          | -                           |
| `insety`    | `insetBlock`           | -                           |
| `bg`        | `background`           | [ColorScheme][color-scheme] |
| `bgc`       | `backgroundColor`      | [ColorScheme][color-scheme] |
| `bgi`       | `backgroundImage`      | -                           |
| `bga`       | `backgroundAttachment` | -                           |
| `bgp`       | `backgroundPosition`   | -                           |
| `bgsz`      | `backgroundSize`       | -                           |
| `bgr`       | `backgroundRepeat`     | -                           |
| `bd`        | `border`               | -                           |
| `bs`        | `borderStyle`          | -                           |
| `bc`        | `borderColor`          | [ColorScheme][color-scheme] |
| `bw`        | `borderWidth`          | -                           |
| `rounded`   | `borderRadius`         | [Size][size]                |
| `c`         | `color`                | [ColorScheme][color-scheme] |
| `ff`        | `fontFamily`           | -                           |
| `fs`        | `fontSize`             | -                           |
| `fw`        | `fontWeight`           | -                           |
| `ta`        | `textAlign`            | -                           |
| `tt`        | `textTransform`        | -                           |
| `td`        | `textDecoration`       | -                           |
| `tds`       | `textDecorationStyle`  | -                           |
| `tdc`       | `textDecorationColor`  | [ColorScheme][color-scheme] |
| `lts`       | `letterSpacing`        | -                           |
| `lh`        | `lineHeight`           | -                           |
| `spacing`   | `gap`                  | -                           |
| `gap`       | `gap`                  | -                           |
| `rowgap`    | `rowGap`               | -                           |
| `colgap`    | `columnGap`            | -                           |
| `align`     | `alignItems`           | -                           |
| `justify`   | `justifyContent`       | -                           |
| `shadow`    | `boxShadow`            | [Size][size]                |
| `opacity`   | `opacity`              | -                           |

<!--{include:(_common/types/breakpoints.md)}-->

[breakpoints]: #code-ts-breakpoints-code

<!--{include:(_common/types/size.md)}-->

[size]: #code-ts-size-code

<!--{include:(_common/types/color-scheme.md)}-->

[color-scheme]: #code-ts-color-scheme-code
