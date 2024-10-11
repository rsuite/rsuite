# Pagination 分页

分页导航，用于辅助长列表只加载部分数据，可以快速切换到指定数据页。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 与 next/link 中的 Link 组合

<!--{include:`with-router.md`}-->

### 更多设置

`layout` 属性可以自定一个分页组件的布局，接收一个数组参数，会根据数组中值的先后顺序进行渲染，`layout` 的默认值为 `['pager']`， 可选值包括: `total`(总条目输区域) 、`pager`(分页区域) 、`limit`(条目选项区域)、`skip`(快捷跳页区域)、`-`(区域占位符，撑满剩余空间) 、`|`(垂直分隔符)。

<!--{include:`advanced.md`}-->

## Props

### `<Pagination>`

| 属性名称      | 类型 `(默认值)`                                         | 描述                                                 |
| ------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| activePage \* | number `(1)`                                            | 当前页码                                             |
| boundaryLinks | boolean                                                 | 显示边界分页按钮 1 和 pages                          |
| classPrefix   | string `('pagination-group')`                           | 组件 CSS 类的前缀                                    |
| disabled      | boolean &#124; (eventKey: number) => boolean            | 禁用分页                                             |
| ellipsis      | boolean                                                 | 显示省略符                                           |
| first         | boolean                                                 | 显示第一页                                           |
| last          | boolean                                                 | 显示最后一页                                         |
| layout        | [LayoutType](#code-ts-layout-type-code)[] `(['pager'])` | 自定义一个分页组件的布局                             |
| limit         | number `(30)`                                           | 每页显示的条数。将会借助 total 和 limit 计算出分页数 |
| limitOptions  | number[] `([30,50,100])`                                | 每页条数的选择项                                     |
| linkAs        | ElementType `(button)`                                  | 为组件选项自定义元素类型                             |
| linkProps     | object                                                  | 为组件选项添加属性                                   |
| locale        | [PaginationLocale](/zh/guide/i18n/#pagination)          | 定义本地化设置，使组件文本根据用户地区显示相应语言   |
| maxButtons    | number                                                  | 分页按钮最多显示数                                   |
| next          | boolean                                                 | 显示下一页                                           |
| onChangeLimit | (limit:number) => void;                                 | 每页显示的条数改变的回调                             |
| onChangePage  | (page:number) => void;                                  | 页码改变的回调                                       |
| prev          | boolean                                                 | 显示上一页                                           |
| total \*      | number                                                  | 数据总数。一般通过服务端得到                         |

### `ts:LayoutType`

```ts
type LayoutType = 'total' | '-' | 'pager' | '|' | 'limit' | 'skip';
```
