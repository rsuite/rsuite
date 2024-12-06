# List 列表

List 组件用于展示一组数据，适用于展示类似于列表的内容. 并且支持拖拽排序功能

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`default.md`}-->

### 列表尺寸

<!--{include:`size.md`}-->

### 边框

<!--{include:`bordered.md`}-->

### 悬停效果

<!--{include:`hover.md`}-->

### 可排序

必须给 List.Item 传入 `index` (组内唯一)

<!--{include:`sortable.md`}-->

### 分组排序

每个 `collection` 的位置独立， 必须给 List.Item 传入 `index` (组内唯一)

<!--{include:`collection.md`}-->

### 固定项

基于`分组排序`，列表中的项在排序时固定位置

<!--{include:`sort-fixed.md`}-->

### 带自定义项的列表

<!--{include:`custom.md`}-->

### 没有分割线

<!--{include:`no-divider.md`}-->

## Props

### `<List>`

| 属性名称           | 类型 `(默认值)`                                 | 描述                           |
| ------------------ | ----------------------------------------------- | ------------------------------ |
| autoScroll         | boolean `(true)`                                | 溢出表格自动滚动               |
| bordered           | boolean                                         | 是否需要边框                   |
| divider            | boolean                                         | 是否显示分割线<br/>![][5.75.0] |
| hover              | boolean                                         | 是否有鼠标悬停效果             |
| onSort             | (payload: Payload) => void                      | 排序结束回调                   |
| onSortEnd          | (payload: Payload) => void                      | 排序结束回调                   |
| onSortMove         | (payload: Payload) => void                      | 排序移动元素时的回调           |
| onSortStart        | (payload: Payload) => void                      | 排序开始回调                   |
| pressDelay         | number `(0)`                                    | 排序触发延迟                   |
| size               | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `(md)` | 列表大小                       |
| sortable           | boolean                                         | 是否可以排序                   |
| transitionDuration | number `(300)`                                  | 排序动画持续时间               |

### `<List.Item>`

| 属性名称   | 类型 `(默认值)`                                 | 描述                                |
| ---------- | ----------------------------------------------- | ----------------------------------- |
| collection | number &#124; string `(0)`                      | 元素组号                            |
| disabled   | boolean                                         | 禁止直接改变该元素的排序            |
| index \*   | number                                          | 元素索引(同组内必须唯一),排序时必选 |
| size       | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `(md)` | 当前项大小                          |

### `ts:Payload`

```ts
interface Payload {
  collection: number | string;
  node: HTMLElement;
  newIndex: number;
  oldIndex: number;
}
```

[5.75.0]: https://img.shields.io/badge/>=-v5.75.0-blue
