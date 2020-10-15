# Tag 标签

`<Tag>`

## 获取组件

<!--{include:(components/tag/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 多彩标签

<!--{include:`color.md`}-->

### 动态添加标签

<!--{include:`dynamic.md`}-->

## Props

### `<Tag>`

| 属性名称    | 类型`(默认值)`        | 描述                   |
| ----------- | --------------------- | ---------------------- |
| children \* | ReactNode             | 组件的内容             |
| classPrefix | string `('tag')`      | 组件 CSS 类的前缀      |
| closable    | boolean               |
| as          | ElementType `('div')` | 为组件自定义元素类型   |
| onClose     | (event) => void       | 点击关闭按钮的回调函数 |
