# Avatar 头像

用于展示一个头像或者商标。

## 获取组件

<!--{include:(components/avatar/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 字符头像

You can create an avatar component containing simple characters, and change the background color and text color of `<Avatar>` by using `style`.

<!--{include:`text.md`}-->

### 图标头像

<!--{include:`icon.md`}-->

### 图片头像

您可以为 `<Avatar>` 设置 `alt` 以确保当图片加载失败时，依然可以显示文字版本的头像

<!--{include:`image.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 堆积的头像组

<!--{include:`stack.md`}-->

### 带有徽标的头像

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
| size        | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')` | 设置头像尺寸                                            |
| sizes       | string                                            | img 元素的 sizes 属性。                                 |
| src         | string                                            | img 元素的 src 属性, 设置头像图片地址。                 |
| srcSet      | string                                            | img 元素的 srcSet 属性。 使用此属性进行响应式图像显示。 |

### `<AvatarGroup>`

| 属性名称 | 类型`(默认值)`                           | 描述                       |
| -------- | ---------------------------------------- | -------------------------- |
| size     | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' | 为一组的头像设置尺寸       |
| spacing  | number                                   | 为一组的头像设置间距       |
| stack    | boolean                                  | 把一组头像以堆栈的方式显示 |
