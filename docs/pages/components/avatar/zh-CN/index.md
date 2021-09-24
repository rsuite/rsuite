# Avatar 头像

用于展示一个头像或者商标。

## 获取组件

<!--{include:(components/avatar/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 文字

您可以使用 `style` 来改变 `<Avatar>` 的背景色和文字颜色。

<!--{include:`text.md`}-->

### 图标

<!--{include:`icon.md`}-->

### 图片

您可以为 `<Avatar>` 设置 `alt` 以确保当图片加载失败时，依然可以显示文字版本的头像

<!--{include:`image.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 徽标

<!--{include:`badge.md`}-->

## Props

### `<Avatar>`

| 属性名称    | 类型`(默认值)`                                    | 描述                                                    |
| ----------- | ------------------------------------------------- | ------------------------------------------------------- |
| alt         | string                                            | 图片头像加载失败时的替代文案                            |
| children    | string &#124; Element<typeof Icon>                | 内容（可以是文字或图标）                                |
| circle      | boolean                                           | 以圆形显示                                              |
| classPrefix | string `('avatar')`                               | 组件 CSS 类的前缀                                       |
| imgProps    | object                                            | 如果该组件用于显示图像，则应用于`img`元素的属性。       |
| size        | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | 设置头像尺寸                                            |
| sizes       | string                                            | img 元素的 sizes 属性。                                 |
| src         | string                                            | img 元素的 src 属性, 设置头像图片地址。                 |
| srcSet      | string                                            | img 元素的 srcSet 属性。 使用此属性进行响应式图像显示。 |
