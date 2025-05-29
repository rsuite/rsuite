# Card 卡片

Card 是一个数据展示的容器组件，可以包含多个子组件，如图片、按钮和文本。它用于以结构化方式显示信息。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 默认

<!--{include:`basic.md`}-->

### 阴影

<!--{include:`shadow.md`}-->

### 鼠标悬停阴影

<!--{include:`hover-shadow.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 带头像

<!--{include:`with-avatar.md`}-->

### 带图片

<!--{include:`with-image.md`}-->

### 横向排列

<!--{include:`horizontal.md`}-->

### 占位符

<!--{include:`placeholder.md`}-->

### 在表单中

<!--{include:`within-form.md`}-->

### 卡片组

<!--{include:`group.md`}-->

## Props

### `<Card>`

| 属性        | 类型`(默认值)`       | 描述             |
| ----------- | -------------------- | ---------------- |
| as          | ElementType `(div)`  | 组件的 HTML 标签 |
| bordered    | boolean`(true)`      | 卡片是否有边框   |
| children    | ReactNode            | 组件的子元素     |
| classPrefix | string `('card')`    | 组件类名的前缀   |
| direction   | 'row' \| 'column'    | 卡片的排列方向   |
| shaded      | boolean \| 'hover'   | 是否有阴影       |
| size        | 'sm' \| 'md' \| 'lg' | 卡片的尺寸       |
| width       | string \| number     | 卡片的宽度       |

### `<Card.Header>`

| 属性        | 类型`(默认值)`           | 描述             |
| ----------- | ------------------------ | ---------------- |
| as          | ElementType `(div)`      | 组件的 HTML 标签 |
| children    | ReactNode                | 组件的子元素     |
| classPrefix | string `('card-header')` | 组件类名的前缀   |

### `<Card.Body>`

| 属性        | 类型`(默认值)`         | 描述             |
| ----------- | ---------------------- | ---------------- |
| as          | ElementType `(div)`    | 组件的 HTML 标签 |
| children    | ReactNode              | 组件的子元素     |
| classPrefix | string `('card-body')` | 组件类名的前缀   |

### `<Card.Footer>`

| 属性        | 类型`(默认值)`           | 描述             |
| ----------- | ------------------------ | ---------------- |
| as          | ElementType `(div)`      | 组件的 HTML 标签 |
| children    | ReactNode                | 组件的子元素     |
| classPrefix | string `('card-footer')` | 组件类名的前缀   |

### `<CardGroup>`

| 属性        | 类型`(默认值)`          | 描述             |
| ----------- | ----------------------- | ---------------- |
| as          | ElementType `(div)`     | 组件的 HTML 标签 |
| children    | ReactNode               | 组件的子元素     |
| classPrefix | string `('card-group')` | 组件类名的前缀   |
| columns     | number                  | 卡片组的列数     |
| spacing     | number `(16)`           | 卡片组的间距     |
