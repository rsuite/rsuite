# Image 图片

使用 Image 组件来显示图片。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 默认

<!--{include:`basic.md`}-->

### 圆角

<!--{include:`rounded.md`}-->

### 圆形

<!--{include:`circle.md`}-->

### 边框

<!--{include:`bordered.md`}-->

### 缩放

<!--{include:`zoomed.md`}-->

### 适应

<!--{include:`fit.md`}-->

### 带有回退图像

当图像加载失败时显示回退图像。

<!--{include:`fallback.md`}-->

### 带有占位符

在图像加载时显示占位符。

<!--{include:`placeholder.md`}-->

### 使用 Next.js Image

<!--{include:`nextjs.md`}-->

## Props

### `<Image>`

| 属性        | 类型 `(默认值)`                 | 说明                              |
| ----------- | ------------------------------- | --------------------------------- |
| bordered    | boolean                         | 图像带有边框                      |
| circle      | boolean                         | 图像显示为圆形                    |
| fallbackSrc | string                          | 当 src 加载失败时的回退图像       |
| fit         | CSSProperties['objectFit']      | 映射到 CSS `object-fit` 属性      |
| height      | number \| string                | 图像的高度                        |
| placeholder | ReactNode                       | 图像加载时显示的占位符            |
| position    | CSSProperties['objectPosition'] | 映射到 CSS `object-position` 属性 |
| rounded     | boolean                         | 图像显示为圆角                    |
| shaded      | boolean                         | 是否有阴影                        |
| src         | string                          | 图像的 URL                        |
| width       | number \| string                | 图像的宽度                        |
| zoomed      | boolean                         | 当鼠标悬停在图像上时是否放大      |
