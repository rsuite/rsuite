# Loader 加载器

用于数据加载过程中，提供状态的一个组件。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义描述

<!--{include:`content.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 速度

<!--{include:`speed.md`}-->

### 容器内居中

<!--{include:`center.md`}-->

### 背景

<!--{include:`backdrop.md`}-->

### Inverse

<!--{include:`inverse.md`}-->

## 可访问性

### ARIA 属性

- Loader 拥有 `role="status"` 属性。
- 当 Loader 设置了 `content` 属性时，会将 `aria-labelledby` 属性设置为 `content`元素的 `id`。

## Props

### `<Loader>`

| 属性名称    | 类型 `(默认值)`                                      | 描述               |
| ----------- | ---------------------------------------------------- | ------------------ |
| backdrop    | boolean                                              | 显示背景           |
| center      | boolean                                              | 在容器中居中显示   |
| classPrefix | string                                               | 组件 CSS 类的前缀  |
| content     | ReactNode                                            | 自定义描述文本     |
| inverse     | boolean                                              | 翻转加载器颜色     |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                | 设置加载器尺寸     |
| speed       | 'fast' \| 'normal' \| 'slow' \| 'paused'`('normal')` | 加载器旋转速度     |
| vertical    | boolean                                              | 图标与文字垂直显示 |
