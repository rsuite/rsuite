# FlexboxGrid 弹性栅格

通过 CSS Flexbox 实现的栅格布局组件，提供 24 栅格。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

 <!--{include:`basic.md`}-->

### 布局

 <!--{include:`justify.md`}-->

### 对齐排列

 <!--{include:`align.md`}-->

### 排序

 <!--{include:`order.md`}-->

## 响应式

与 `<Col>` 组件结合可以实现响应式。

<!--{include:<example-responsive>}-->

## Props

### `<FlexboxGrid>`

| 属性名称    | 类型`(默认值)`                                                                                | 描述                 |
| ----------- | --------------------------------------------------------------------------------------------- | -------------------- |
| align       | 'top' &#124; 'middle' &#124; 'bottom' `('top')`                                               | 对齐方式             |
| as          | ElementType `('div')`                                                                         | 为组件自定义元素类型 |
| classPrefix | string `('flex-box-grid')`                                                                    | 组件 CSS 类的前缀    |
| justify     | 'start' &#124; 'end' &#124; 'center' &#124; 'space-around' &#124; 'space-between' `('start')` | 水平排列方式         |

### `<FlexboxGrid.Item>`

| 属性名称    | 类型`(默认值)`                  | 描述                 |
| ----------- | ------------------------------- | -------------------- |
| as          | ElementType `('div')`           | 为组件自定义元素类型 |
| classPrefix | string `('flex-box-grid-item')` | 组件 CSS 类的前缀    |
| colspan     | number `(0)`                    | 栅格占位格数         |
| order       | number `(0)`                    | 栅格顺序，用于排序   |
