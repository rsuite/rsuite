# Box

Box 组件是所有组件的基础组件，为样式属性提供了简写方式。

## 获取组件

<!--{include:<import-guide>}-->

## 使用

<!--{include:`usage.md`}-->

## 演示

### 颜色和背景

<!--{include:`background.md`}-->

### 边框和圆角

<!--{include:`border.md`}-->

### 阴影

<!--{include:`shadow.md`}-->

## 响应式

Box 组件支持所有简写 CSS 属性的响应式值。这允许你为不同的断点定义不同的样式。

```jsx
<Box
  w={{ xs: '100%', md: '80%', lg: '60%' }}
  p={{ xs: '10px', md: '20px' }}
  display={{ xs: 'block', md: 'flex' }}
>
  这个 Box 组件有响应式宽度、内边距和显示
</Box>
```

<!--{include:<example-responsive>}-->

## Props

### `<Box>`

| 属性      | 类型`(默认值)`                                | 描述                                           |
| --------- | --------------------------------------------- | ---------------------------------------------- |
| ...       | [Style Shorthand](#code-style-shorthand-code) | 其他样式简写属性                               |
| as        | ElementType `('div')`                         | 自定义元素类型                                 |
| children  | ReactNode                                     | 组件的内容                                     |
| className | string                                        | 额外的 CSS 类                                  |
| display   | CSSProperties['display']                      | CSS display 属性                               |
| hideFrom  | [Breakpoints][breakpoints]                    | 在指定断点以上隐藏组件（使用 `display: none`） |
| showFrom  | [Breakpoints][breakpoints]                    | 在指定断点以下显示组件（使用 `display: none`） |
| style     | CSSProperties                                 | 内联样式                                       |

### `Style Shorthand`

Box 组件提供了一系列简写属性，可以更简洁地设置常用样式。这些属性直接映射到对应的 CSS 属性。

- **主题值**：提供的主题预设值, 例如 `bg='blue.600'`, `rounded='lg'` 等。
- **响应式值**：提供的响应式值, 例如 `w={{ xs: '100%', md: '80%', lg: '60%' }}` 等。

| 属性    | CSS 属性      | 主题值                      |
| ------- | ------------- | --------------------------- |
| bd      | border        | -                           |
| bg      | background    | [ColorScheme][color-scheme] |
| c       | color         | [ColorScheme][color-scheme] |
| h       | height        | -                           |
| m       | margin        | -                           |
| maxh    | maxHeight     | -                           |
| maxw    | maxWidth      | -                           |
| mb      | marginBottom  | -                           |
| minh    | minHeight     | -                           |
| minw    | minWidth      | -                           |
| ml      | marginLeft    | -                           |
| mr      | marginRight   | -                           |
| mt      | marginTop     | -                           |
| mx      | marginInline  | -                           |
| my      | marginBlock   | -                           |
| p       | padding       | -                           |
| pb      | paddingBottom | -                           |
| pl      | paddingLeft   | -                           |
| pr      | paddingRight  | -                           |
| pt      | paddingTop    | -                           |
| px      | paddingInline | -                           |
| py      | paddingBlock  | -                           |
| rounded | borderRadius  | [Size][size]                |
| shadow  | boxShadow     | [Size][size]                |
| w       | width         | -                           |

### 类型定义

<!--{include:(_common/types/breakpoints.md)}-->
<!--{include:(_common/types/size.md)}-->
<!--{include:(_common/types/color-scheme.md)}-->

[breakpoints]: #code-ts-breakpoints-code
[size]: #code-ts-size-code
[color-scheme]: #code-ts-color-scheme-code
