# Loader 加载器

用于数据加载过程中，提供状态的一个组件。

* `<Loader>` 加载器

## 获取组件

```js
import { Loader } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Loader>`

| 属性名称    | 类型 `(默认值)`                         | 描述               |
| ----------- | --------------------------------------- | ------------------ |
| backdrop    | boolean                                 | 显示背景           |
| center      | boolean                                 | 在容器中居中显示   |
| classPrefix | string                                  | 组件 CSS 类的前缀  |
| content     | React.Node                              | 自定义描述文本     |
| inverse     | boolean                                 | 翻转加载器颜色     |
| size        | enum: 'lg', 'md', 'sm', 'xs'`('md')`    | 设置加载器尺寸     |
| speed       | enum:'fast','normal','slow'`('normal')` | 加载器旋转速度     |
| vertical    | boolean                                 | 图标与文字垂直显示 |
