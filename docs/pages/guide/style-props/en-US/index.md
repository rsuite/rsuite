# Style Props

React Suite provides a series of style property shorthands for more concise style settings. These properties directly map to their corresponding CSS properties.

## Usage

### Theme Values

Provided theme presets, for example:

```jsx
<Box bg='blue.600' />
<Box rounded='lg' />
```

### Responsive Values

Provided responsive values, for example:

```jsx
<Box w={{ xs: '100%', md: '80%', lg: '60%' }} />
<Box p={{ xs: '10px', md: '20px' }} />
```

## Style Props Reference

| Property  | CSS Property           | Theme Values                |
| --------- | ---------------------- | --------------------------- |
| `p`       | `padding`              | -                           |
| `pt`      | `paddingTop`           | -                           |
| `pr`      | `paddingRight`         | -                           |
| `pb`      | `paddingBottom`        | -                           |
| `pl`      | `paddingLeft`          | -                           |
| `px`      | `paddingInline`        | -                           |
| `py`      | `paddingBlock`         | -                           |
| `ps`      | `paddingInlineStart`   | -                           |
| `pe`      | `paddingInlineEnd`     | -                           |
| `m`       | `margin`               | -                           |
| `mt`      | `marginTop`            | -                           |
| `mr`      | `marginRight`          | -                           |
| `mb`      | `marginBottom`         | -                           |
| `ml`      | `marginLeft`           | -                           |
| `mx`      | `marginInline`         | -                           |
| `my`      | `marginBlock`          | -                           |
| `ms`      | `marginInlineStart`    | -                           |
| `me`      | `marginInlineEnd`      | -                           |
| `w`       | `width`                | -                           |
| `h`       | `height`               | -                           |
| `minw`    | `minWidth`             | -                           |
| `maxw`    | `maxWidth`             | -                           |
| `minh`    | `minHeight`            | -                           |
| `maxh`    | `maxHeight`            | -                           |
| `display` | `display`              | -                           |
| `pos`     | `position`             | -                           |
| `left`    | `left`                 | -                           |
| `top`     | `top`                  | -                           |
| `right`   | `right`                | -                           |
| `bottom`  | `bottom`               | -                           |
| `inset`   | `inset`                | -                           |
| `insetx`  | `insetInline`          | -                           |
| `insety`  | `insetBlock`           | -                           |
| `bsz`     | `boxSizing`            | -                           |
| `z`       | `zIndex`               | -                           |
| `bg`      | `background`           | [ColorScheme][color-scheme] |
| `bgc`     | `backgroundColor`      | [ColorScheme][color-scheme] |
| `bgi`     | `backgroundImage`      | -                           |
| `bga`     | `backgroundAttachment` | -                           |
| `bgp`     | `backgroundPosition`   | -                           |
| `bgsz`    | `backgroundSize`       | -                           |
| `bgr`     | `backgroundRepeat`     | -                           |
| `c`       | `color`                | [ColorScheme][color-scheme] |
| `ff`      | `fontFamily`           | -                           |
| `fs`      | `fontSize`             | -                           |
| `fw`      | `fontWeight`           | -                           |
| `ta`      | `textAlign`            | -                           |
| `tt`      | `textTransform`        | -                           |
| `td`      | `textDecoration`       | -                           |
| `tds`     | `textDecorationStyle`  | -                           |
| `tdc`     | `textDecorationColor`  | [ColorScheme][color-scheme] |
| `lts`     | `letterSpacing`        | -                           |
| `lh`      | `lineHeight`           | -                           |
| `bd`      | `border`               | -                           |
| `bs`      | `borderStyle`          | -                           |
| `bc`      | `borderColor`          | [ColorScheme][color-scheme] |
| `bw`      | `borderWidth`          | -                           |
| `bdt`     | `borderTop`            | -                           |
| `bdb`     | `borderBottom`         | -                           |
| `bdl`     | `borderLeft`           | -                           |
| `bdr`     | `borderRight`          | -                           |
| `bdts`    | `borderTopStyle`       | -                           |
| `bdbs`    | `borderBottomStyle`    | -                           |
| `bdls`    | `borderLeftStyle`      | -                           |
| `bdrs`    | `borderRightStyle`     | -                           |
| `bdtc`    | `borderTopColor`       | [ColorScheme][color-scheme] |
| `bdbc`    | `borderBottomColor`    | [ColorScheme][color-scheme] |
| `bdlc`    | `borderLeftColor`      | [ColorScheme][color-scheme] |
| `bdrc`    | `borderRightColor`     | [ColorScheme][color-scheme] |
| `bdtw`    | `borderTopWidth`       | -                           |
| `bdbw`    | `borderBottomWidth`    | -                           |
| `bdlw`    | `borderLeftWidth`      | -                           |
| `bdrw`    | `borderRightWidth`     | -                           |
| `rounded` | `borderRadius`         | [Size][size]                |
| `shadow`  | `boxShadow`            | [Size][size]                |
| `opacity` | `opacity`              | -                           |
| `spacing` | `gap`                  | -                           |
| `gap`     | `gap`                  | -                           |
| `rowgap`  | `rowGap`               | -                           |
| `colgap`  | `columnGap`            | -                           |
| `align`   | `alignItems`           | -                           |
| `justify` | `justifyContent`       | -                           |
| `self`    | `alignSelf`            | -                           |
| `basis`   | `flexBasis`            | -                           |
| `flex`    | `flex`                 | -                           |
| `grow`    | `flexGrow`             | -                           |
| `order`   | `order`                | -                           |
| `shrink`  | `flexShrink`           | -                           |

### Type Definitions

<!--{include:(_common/types/breakpoints.md)}-->
<!--{include:(_common/types/size.md)}-->
<!--{include:(_common/types/color-scheme.md)}-->

[breakpoints]: #code-ts-breakpoints-code
[size]: #code-ts-size-code
[color-scheme]: #code-ts-color-scheme-code
