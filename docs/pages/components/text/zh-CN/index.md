# Text 文本

Text 是一个基本组件，允许您在页面上显示文本内容。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 默认

<!--{include:`basic.md`}-->

### 颜色

<!--{include:`color.md`}-->

### 粗细

<!--{include:`weight.md`}-->

### 覆盖元素

<!--{include:`as.md`}-->

### 文本对齐

<!--{include:`text-align.md`}-->

### 文本转换

<!--{include:`text-transform.md`}-->

### 限制行数

<!--{include:`max-lines.md`}-->

> **注意**: `maxLines` 属性不支持 IE 浏览器。

## Props

### `<Text>`

| 属性        | 类型`(默认值)`                                                                    | 描述                                           |
| ----------- | --------------------------------------------------------------------------------- | ---------------------------------------------- |
| align       | 'left' \| 'center' \| 'right' \| 'justify'                                        | 文本的对齐方式。                               |
| as          | ElementType`(div)`                                                                | 组件的自定义元素类型。                         |
| classPrefix | string `('text')`                                                                 | 组件 CSS 类名的前缀。                          |
| color       | [Color](#code-ts-color-code) \| CSSProperties['color']                            | 文本的颜色。                                   |
| maxLines    | number                                                                            | 限制提供文本的行数, 文本将被截断并显示省略号。 |
| muted       | boolean                                                                           | 文本是否为静音。                               |
| size        | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' \| number \| string                         | 文本的大小。                                   |
| transform   | 'uppercase' \| 'lowercase' \| 'capitalize'                                        | 文本的转换方式。                               |
| weight      | 'thin' \| 'light' \| 'regular' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' | 文本的粗细。                                   |

<!--{include:(_common/types/color.md)}-->
