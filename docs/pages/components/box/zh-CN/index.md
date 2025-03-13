# Box

Box 是所有组件的基础组件.

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

## Props

### `<Box>`

| 属性      | 类型`(默认值)`                                             | 描述                                             |
| --------- | ---------------------------------------------------------- | ------------------------------------------------ |
| as        | ElementType `('div')`                                      | 自定义元素类型                                   |
| bg        | [ColorScheme][color-scheme] \| CSSProperties['background'] | 盒子的背景颜色。支持主题颜色（例如：'blue.600'） |
| border    | CSSProperties['border']                                    | 盒子的 CSS 边框属性                              |
| children  | ReactNode                                                  | 组件的内容                                       |
| className | string                                                     | 额外的 CSS 类                                    |
| color     | [ColorScheme][color-scheme] \| CSSProperties['color']      | 文本颜色。支持主题颜色（例如：'blue.600'）       |
| display   | CSSProperties['display']                                   | CSS display 属性                                 |
| h         | CSSProperties['height']                                    | 盒子的高度                                       |
| hidden    | [Breakpoints][breakpoints]                                 | 在指定断点隐藏组件                               |
| m         | CSSProperties['margin']                                    | 四周外边距                                       |
| mb        | CSSProperties['marginBottom']                              | 底部外边距                                       |
| ml        | CSSProperties['marginLeft']                                | 左侧外边距                                       |
| mr        | CSSProperties['marginRight']                               | 右侧外边距                                       |
| mt        | CSSProperties['marginTop']                                 | 顶部外边距                                       |
| mx        | CSSProperties['marginInline']                              | 左右两侧外边距                                   |
| my        | CSSProperties['marginBlock']                               | 上下两侧外边距                                   |
| p         | CSSProperties['padding']                                   | 四周内边距                                       |
| pb        | CSSProperties['paddingBottom']                             | 底部内边距                                       |
| pl        | CSSProperties['paddingLeft']                               | 左侧内边距                                       |
| pr        | CSSProperties['paddingRight']                              | 右侧内边距                                       |
| pt        | CSSProperties['paddingTop']                                | 顶部内边距                                       |
| px        | CSSProperties['paddingInline']                             | 左右两侧内边距                                   |
| py        | CSSProperties['paddingBlock']                              | 上下两侧内边距                                   |
| rounded   | [Size][size] \| CSSProperties['borderRadius']              | 盒子的边框圆角                                   |
| shadow    | [Size][size] \| CSSProperties['boxShadow']                 | 盒子阴影                                         |
| style     | CSSProperties                                              | 内联样式                                         |
| visible   | [Breakpoints][breakpoints]                                 | 仅在指定断点显示组件                             |
| w         | CSSProperties['width']                                     | 盒子的宽度                                       |

<!--{include:(_common/types/breakpoints.md)}-->
<!--{include:(_common/types/size.md)}-->
<!--{include:(_common/types/color-scheme.md)}-->

[breakpoints]: #code-ts-breakpoints-code
[size]: #code-ts-size-code
[color-scheme]: #code-ts-color-scheme-code
