# Link 链接

用于创建链接。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 默认

<!--{include:`basic.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 外部链接

设置 Link 的 `external` 属性可以在新标签页/窗口中打开链接，并添加 `rel="noopener noreferrer"` 属性。使用 `showAnchorIcon` 属性可以显示一个外部链接图标。

<!--{include:`external.md`}-->

### 自定义图标

<!--{include:`custom-icon.md`}-->

### 下划线

<!--{include:`underline.md`}-->

### 在文本内

<!--{include:`within-text.md`}-->

### 路由

Link 组件可通过 `as` 属性与其他路由库（如 Next.js、React Router）结合使用。详见[组合指南](https://rsuitejs.com/guide/composition/#react-router-dom)。

<!--{include:`routing-library.md`}-->

## Props

### `<Link>`

| 属性           | 类型`(默认)`                                  | 描述             |
| -------------- | --------------------------------------------- | ---------------- |
| anchorIcon     | ReactNode                                     | 链接后的图标     |
| as             | ElementType                                   | 自定义组件元素   |
| children       | ReactNode                                     | 链接内容         |
| classPrefix    | string `('link')`                             | 组件 CSS 类前缀  |
| disabled       | boolean                                       | 是否禁用链接     |
| external       | boolean                                       | 是否为外部链接   |
| href           | string                                        | 链接 URL         |
| showAnchorIcon | boolean                                       | 是否显示链接图标 |
| target         | string                                        | 链接 target 属性 |
| underline      | 'always' \| 'hover' \| 'not-hover' \| 'never' | 下划线样式       |
