# Pagination 分页

分页导航，用于辅助长列表只加载部分数据，可以快速切换到指定数据页。

## 获取组件

<!--{include:(components/pagination/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 更多设置

<!--{include:`advanced.md`}-->

## Props

### `<Pagination>`

| 属性名称      | 类型 `(默认值)`                               | 描述                        |
| ------------- | --------------------------------------------- | --------------------------- |
| activePage \* | number `(1)`                                  | 当前页码                    |
| boundaryLinks | boolean                                       | 显示边界分页按钮 1 和 pages |
| classPrefix   | string `('pagination')`                       | 组件 CSS 类的前缀           |
| disabled      | boolean &#124; (eventKey: number) => boolean  | 禁用分页                    |
| ellipsis      | boolean                                       | 显示省略符                  |
| first         | boolean                                       | 显示第一页                  |
| last          | boolean                                       | 显示最后一页                |
| linkAs        | ElementType `(a)`                             | 为组件选项自定义元素类型    |
| linkProps     | object                                        | 为组件选项添加属性          |
| maxButtons    | number `(0)`                                  | 分页按钮最多显示数          |
| next          | boolean                                       | 显示下一页                  |
| onSelect      | (eventKey:number, event: MouseEvent) => void; | 选择页码后的回调            |
| pages \*      | number `(1)`                                  | 页数                        |
| prev          | boolean                                       | 显示上一页                  |
