# Heading 标题

标题是页面、部分或子部分开头的标题或副标题。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 默认

<!--{include:`basic.md`}-->

### 标题级别

<!--{include:`level.md`}-->

### 标题组

<!--{include:`subheading.md`}-->

## Props

### `<Heading>`

| 属性        | 类型`(默认值)`       | 描述                  |
| ----------- | -------------------- | --------------------- |
| children    | React.Node           | 标题的内容。          |
| classPrefix | string `('heading')` | 组件 CSS 类名的前缀。 |
| level       | number`(3)`          | 标题的级别。          |

### `<HeadingGroup>`

| 属性        | 类型`(默认值)`             | 描述                  |
| ----------- | -------------------------- | --------------------- |
| children    | React.Node                 | 标题组的内容。        |
| classPrefix | string `('heading-group')` | 组件 CSS 类名的前缀。 |
