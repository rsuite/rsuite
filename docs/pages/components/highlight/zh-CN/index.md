# Highlight 高亮

用于标记或突出显示匹配的文本内容。例如，用于高亮搜索结果。

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

| 属性        | 类型`(默认值)`                              | 描述                       |
| ----------- | ------------------------------------------- | -------------------------- |
| children    | ReactNode                                   | 需要高亮的内容。           |
| classPrefix | string `('highlight')`                      | 组件 CSS 类名的前缀。      |
| query       | string \| string[]                          | 需要高亮的关键词。         |
| renderMark  | (match: string, index: number) => ReactNode | 自定义高亮标记的渲染函数。 |
