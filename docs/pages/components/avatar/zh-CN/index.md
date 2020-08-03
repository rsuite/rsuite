# Avatar 头像

用于展示一个头像或者商标。

## 获取组件

```js
import { Avatar } from 'rsuite';

// or
import Avatar from 'rsuite/lib/Avatar';
```

## 演示

<!--{demo}-->

## Props

### `<Avatar>`

| 属性名称    | 类型`(默认值)`                        | 描述                                                    |
| ----------- | ------------------------------------- | ------------------------------------------------------- |
| alt         | string                                | 图片头像加载失败时的替代文案                            |
| children    | string, React.Element<typeof Icon>    | 内容（可以是文字或图标）                                |
| circle      | boolean                               | 以圆形显示                                              |
| classPrefix | string `('avatar')`                   | 组件 CSS 类的前缀                                       |
| imgProps    | object                                | 如果该组件用于显示图像，则应用于`img`元素的属性。       |
| size        | enum: 'lg', 'md', 'sm', 'xs' `('md')` | 设置头像尺寸                                            |
| sizes       | string                                | img 元素的 sizes 属性。                                 |
| src         | string                                | img 元素的 src 属性, 设置头像图片地址。                 |
| srcSet      | string                                | img 元素的 srcSet 属性。 使用此属性进行响应式图像显示。 |
