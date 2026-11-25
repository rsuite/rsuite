# VisuallyHidden 视觉隐藏

VisuallyHidden 是一个组件，它在视觉上隐藏其子元素，同时使屏幕阅读器可以访问它们。

## 获取组件

<!--{include:<import-guide>}-->

## 用法

<!--{include:`usage.md`}-->

## 可访问性

VisuallyHidden 用于隐藏屏幕上不可见但仍可访问屏幕阅读器的内容。例如，它可用于隐藏由图标表示的按钮的文本。

## Props

### `<VisuallyHidden>`

| 属性     | 类型 `(默认值)`      | 描述                     |
| -------- | -------------------- | ------------------------ |
| children | ReactNode            | 要在视觉上隐藏的子元素。 |
| as       | ElementType `'span'` | 要渲染的 HTML 元素。     |
