# Pagination 分页

分页导航，用于辅助长列表只加载部分数据，可以快速切换到指定数据页。

`<Pagination>` 分页组件

## 获取组件

```js
import { Pagination } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Pagination>`

| 属性名称             | 类型 `(默认值)`                      | 描述                        |
| -------------------- | ------------------------------------ | --------------------------- |
| activePage \*        | number `(1)`                         | 当前页码                    |
| boundaryLinks        | boolean                              | 显示边界分页按钮 1 和 pages |
| buttonComponentClass | React.ElementType `(SafeAnchor)`     | 为组件自定义元素类型        |
| classPrefix          | string `('pagination')`              | 组件 CSS 类的前缀           |
| disabled             | boolean , (eventKey: any) => boolean | 禁用分页                    |
| ellipsis             | boolean                              | 显示省略符                  |
| first                | boolean                              | 显示第一页                  |
| last                 | boolean                              | 显示最后一页                |
| maxButtons           | number `(0)`                         | 分页按钮最多显示数          |
| next                 | boolean                              | 显示下一页                  |
| pages \*             | number `(1)`                         | 页数                        |
| prev                 | boolean                              | 显示上一页                  |
