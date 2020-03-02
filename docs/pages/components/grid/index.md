# Grid 栅格

栅格布局的组件，提供 24 栅格， 参照 [Bootstrap](https://getbootstrap.com/docs/3.3/css/) 的响应式设计。

包含下面组件：

* `<Grid>`
* `<Row>`
* `<Col>`

对应屏幕宽度:

* xs, extra-small: < `480px`
* sm, small: ≥ `480px`
* md, medium: ≥ `992px`
* lg, large: ≥ `1200px`

## 获取组件

```js
import { Grid, Row, Col } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Grid>`

| 属性名称       | 类型`(默认值)`              | 描述                     |
| -------------- | --------------------------- | ------------------------ |
| componentClass | React.ElementType `('div')` | 为组件自定义元素类型     |
| fluid          | boolean                     | 流体布局， （100% 宽度） |

### `<Row>`

| 属性名称       | 类型`(默认值)`              | 描述                 |
| -------------- | --------------------------- | -------------------- |
| componentClass | React.ElementType `('div')` | 为组件自定义元素类型 |
| gutter         | number                      | 栅格的间距           |

### `<Col>`

| 属性名称       | 类型`(默认值)`              | 描述                                   |
| -------------- | --------------------------- | -------------------------------------- |
| componentClass | React.ElementType `('div')` | 为组件自定义元素类型                   |
| lg             | number                      | ≥ `1200px` 响应式栅格                  |
| lgHidden       | boolean                     | 隐藏栅格                               |
| lgOffset       | number                      | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| lgPull         | number                      | 栅格向左移动格数                       |
| lgPush         | number                      | 栅格向右移动格数                       |
| md             | number                      | ≥ `992px` 响应式栅格                   |
| mdHidden       | boolean                     | 隐藏栅格                               |
| mdOffset       | number                      | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| mdPull         | number                      | 栅格向左移动格数                       |
| mdPush         | number                      | 栅格向右移动格数                       |
| sm             | number                      | ≥ `480px` 响应式栅格                   |
| smHidden       | boolean                     | 隐藏栅格                               |
| smOffset       | number                      | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| smPull         | number                      | 栅格向左移动格数                       |
| smPush         | number                      | 栅格向右移动格数                       |
| xs             | number                      | < `480px` 响应式栅格                   |
| xsHidden       | boolean                     | 隐藏栅格                               |
| xsOffset       | number                      | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| xsPull         | number                      | 栅格向左移动格数                       |
| xsPush         | number                      | 栅格向右移动格数                       |
