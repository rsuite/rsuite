# 样式属性 (Style Props)

React Suite 提供了一系列样式属性简写，可以更简洁地设置常用样式。这些属性直接映射到对应的 CSS 属性。

## 使用方式

### 主题值

提供的主题预设值，例如：

```jsx
<Box bg='blue.600' />
<Box rounded='lg' />
```

### 响应式值

提供的响应式值，例如：

```jsx
<Box w={{ xs: '100%', md: '80%', lg: '60%' }} />
<Box p={{ xs: '10px', md: '20px' }} />
```

## 样式属性参考

| 属性      | CSS 属性               | 主题值                      |
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

### 类型定义

<!--{include:(_common/types/breakpoints.md)}-->
<!--{include:(_common/types/size.md)}-->
<!--{include:(_common/types/color-scheme.md)}-->

[breakpoints]: #code-ts-breakpoints-code
[size]: #code-ts-size-code
[color-scheme]: #code-ts-color-scheme-code
