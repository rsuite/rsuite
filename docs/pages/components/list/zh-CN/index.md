# List 列表

用于展示一组数据

* `<List>` 列表
* `<List.Item>` 列表元素

## 获取组件

```js
import { List } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<List>`

| 属性名称            | 类型 `(默认值)`                           | 描述              |
| ----------------   | ---------------------------------------- | ----------------- |
| bordered           | boolean                                  | 是否需要边框        |
| hover              | boolean                                  | 是否有鼠标悬停效果   |
| sortable           | boolean                                  | 是否可以排序        |
| size               | enums: 'lg','md','sm'  `md`              | 列表大小            |
| autoScroll         | boolean  `true`                          | 溢出表格自动滚动    |
| pressDelay         | number `0`                               | 排序触发延迟        |
| transitionDuration | number `300`                             | 排序动画持续时间        |
| onSortStart        | (payload:{ collection: number/string, node:HTMLElement, newIndex: number, oldIndex: number }) => void | 排序开始回调        |
| onSortMove         | (payload:{ collection: number/string, node:HTMLElement, newIndex: number, oldIndex: number }) => void | 排序移动元素时的回调        |
| onSortEnd          | (payload:{ collection: number/string, node:HTMLElement, newIndex: number, oldIndex: number }) => void | 排序结束回调        |
| onSort             | (payload:{ collection: number/string, node:HTMLElement, newIndex: number, oldIndex: number }) => void | 排序结束回调        |


### `<List.Item>`

| 属性名称      | 类型 `(默认值)`                                  | 描述                               |
| ------------ | ----------------------------------------------- | ---------------------------- |
| index        | number(排序时必选)                               | 元素索引(同组内必须唯一)        |
| collection   | number/string `0`                               | 元素组号                      |
| disabled     | boolean                                         | 禁止直接改变该元素的排序         |
