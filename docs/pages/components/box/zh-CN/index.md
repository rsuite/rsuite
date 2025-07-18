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

| 属性      | 类型`(默认值)`             | 描述                                           |
| --------- | -------------------------- | ---------------------------------------------- |
| as        | ElementType `('div')`      | 自定义元素类型                                 |
| children  | ReactNode                  | 组件的内容                                     |
| className | string                     | 额外的 CSS 类                                  |
| display   | CSSProperties['display']   | CSS display 属性                               |
| hideFrom  | [Breakpoints][breakpoints] | 在指定断点以上隐藏组件（使用 `display: none`） |
| showFrom  | [Breakpoints][breakpoints] | 在指定断点以下显示组件（使用 `display: none`） |
| style     | CSSProperties              | 内联样式                                       |

### `Style Props`

Box 组件提供了一系列简写属性，可以更简洁地设置常用样式。这些属性直接映射到对应的 CSS 属性。

请参阅 [样式属性](/zh/guide/style-props) 文档以获取完整的样式属性参考。

- **主题值**：提供的主题预设值, 例如 `<Box bg='blue.600' />`, `<Box rounded='lg' />` 等。
- **响应式值**：提供的响应式值, 例如 `<Box w={{ xs: '100%', md: '80%', lg: '60%' }} />` 等。
- **CSS 原生属性**：提供的 CSS 原生属性, 例如 `<Box aspectRatio='9/16' />`, `<Box borderRadius='6px' />` 等。

### 类型定义

<!--{include:(_common/types/breakpoints.md)}-->

[breakpoints]: #code-ts-breakpoints-code
