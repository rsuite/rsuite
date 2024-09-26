# Avatar 头像

用于展示一个头像或者商标。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 字符头像

<!--{include:`text.md`}-->

### 图标头像

<!--{include:`icon.md`}-->

### 图片头像

<!--{include:`image.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 带边框

<!--{include:`bordered.md`}-->

### 颜色

<!--{include:`color.md`}-->

### 头像后备

如果加载头像的 src 时出现错误，有 2 个后备方案：

1. 如果有 alt 属性，将会渲染 alt 属性的值。
2. 如果没有 alt 属性，将会渲染一个默认的头像。

<!--{include:`fallback.md`}-->

### 堆积的头像组

<!--{include:`stack.md`}-->

### 带有徽标的头像

<!--{include:`badge.md`}-->

## Props

### `<Avatar>`

| 属性名称    | 类型`(默认值)`                                         | 描述                                                    |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------- |
| alt         | string                                                 | 图片头像加载失败时的替代文案。                          |
| bordered    | boolean                                                | 是否显示边框。 <br/>![][5.59.0]                         |
| children    | string \| Element<typeof Icon>                         | 内容（可以是文字或图标）。                              |
| circle      | boolean                                                | 以圆形显示。                                            |
| classPrefix | string `('avatar')`                                    | 组件 CSS 类的前缀。                                     |
| color       | string                                                 | 设置头像的背景颜色 <br/>![][5.59.0]                     |
| imgProps    | object                                                 | 如果该组件用于显示图像，则应用于`img`元素的属性。       |
| onError     | (event) => void                                        | 图片加载失败时的回调函数。<br/>![][5.59.0]              |
| size        | 'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | 设置头像尺寸。                                          |
| sizes       | string                                                 | img 元素的 sizes 属性。                                 |
| src         | string                                                 | img 元素的 src 属性, 设置头像图片地址。                 |
| srcSet      | string                                                 | img 元素的 srcSet 属性。 使用此属性进行响应式图像显示。 |

### `<AvatarGroup>`

| 属性名称 | 类型`(默认值)`                                | 描述                         |
| -------- | --------------------------------------------- | ---------------------------- |
| size     | 'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs' | 为一组的头像设置尺寸。       |
| spacing  | number                                        | 为一组的头像设置间距。       |
| stack    | boolean                                       | 把一组头像以堆栈的方式显示。 |

[5.59.0]: https://img.shields.io/badge/>=-v5.59.0-blue
