# Highlight 高亮

高亮匹配的文本内容。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 默认

<!--{include:`basic.md`}-->

### 高亮多个词

<!--{include:`multiple-words.md`}-->

### 自定义高亮

<!--{include:`custom.md`}-->

### 与搜索结合

<!--{include:`search.md`}-->

## Props

### `<Highlight>`

| 属性        | 类型`(默认值)`         | 描述                       |
| ----------- | ---------------------- | -------------------------- |
| children    | React.Node             | 需要高亮的内容。           |
| classPrefix | string `('highlight')` | 组件 CSS 类名的前缀。      |
| query       | string[]               | 需要高亮的单词数组。       |
| renderMark  | Function               | 自定义高亮标记的渲染函数。 |
