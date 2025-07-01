# Pagination 分页

分页导航，用于辅助长列表只加载部分数据，可以快速切换到指定数据页。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

通过 `size` 属性调整分页组件大小（可选值：'xs'、'sm'、'md'、'lg'）。

<!--{include:`size.md`}-->

### 禁用

使用 `disabled` 属性禁用分页控件。也可以传入函数有选择地禁用特定页码。

<!--{include:`disabled.md`}-->

### 上一页和下一页

通过 `prev` 和 `next` 属性显示上一页和下一页导航按钮。

<!--{include:`prev-next.md`}-->

### 第一页和最后一页

使用 `first` 和 `last` 属性显示第一页和最后一页导航按钮。

<!--{include:`first-last.md`}-->

### 路由库

通过自定义 `linkAs` 和 `linkProps` 属性，将分页组件与路由库集成。

<!--{include:`with-router.md`}-->

### 自定义布局

使用 `layout` 属性自定义分页组件的结构。该属性接受一个元素数组，将按指定顺序渲染。可用元素包括：

- `'pager'`：标准页码导航按钮（默认）
- `'total'`：总条目显示区域
- `'limit'`：每页条目选择器
- `'skip'`：快速页面跳转输入框
- `'-'`：弹性占位符（填充剩余空间）
- `'|'`：垂直分隔符

<!--{include:`advanced.md`}-->

## Props

### `<Pagination>`

| 属性名称      | 类型 `(默认值)`                                         | 描述                                                 |
| ------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| activePage \* | number `(1)`                                            | 当前页码                                             |
| boundaryLinks | boolean                                                 | 显示边界分页按钮 1 和 pages                          |
| classPrefix   | string `('pagination-group')`                           | 组件 CSS 类的前缀                                    |
| disabled      | boolean \| (eventKey: number) => boolean                | 禁用分页                                             |
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
| size          | 'lg' \| 'md' \| 'sm' \| 'xs' `('sm')`                   | 分页组件的尺寸                                       |
| total \*      | number                                                  | 数据总数。一般通过服务端得到                         |

### 类型定义

#### `ts:LayoutType`

```ts
type LayoutType = 'total' | '-' | 'pager' | '|' | 'limit' | 'skip';
```
