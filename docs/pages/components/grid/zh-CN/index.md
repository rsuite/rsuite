# Grid 栅格

栅格布局的组件，提供 24 栅格， 参照 [Bootstrap](https://getbootstrap.com/docs/5.2/layout/grid/#grid-options) 的响应式设计。

## 获取组件

<!--{include:<import-guide>}-->

- `<Grid>` 定义一个栅格布局。
- `<Row>` 定义栅格布局中的一行。
- `<Col>` 定义栅格布局中的一列。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 栅格间隔

<!--{include:`gutter.md`}-->

### 偏移

<!--{include:`offset.md`}-->

### 栅格推拉

<!--{include:`pull-push.md`}-->

### 隐藏栅格

<!--{include:`hidden.md`}-->

### 嵌套

<!--{include:`nested.md`}-->

## 响应式

<!--{include:<example-responsive>}-->

## Props

### `<Grid>`

| 属性名称 | 类型`(默认值)`        | 描述                     |
| -------- | --------------------- | ------------------------ |
| as       | ElementType `('div')` | 为组件自定义元素类型     |
| fluid    | boolean               | 流体布局， （100% 宽度） |

### `<Row>`

| 属性名称 | 类型`(默认值)`        | 描述                 |
| -------- | --------------------- | -------------------- |
| as       | ElementType `('div')` | 为组件自定义元素类型 |
| gutter   | number                | 栅格的间距           |

### `<Col>`

| 属性名称  | 类型`(默认值)`        | 描述                                   |
| --------- | --------------------- | -------------------------------------- |
| as        | ElementType `('div')` | 为组件自定义元素类型                   |
| xxl       | number                | ≥ `1400px` 响应式栅格                  |
| xxlHidden | boolean               | 隐藏栅格                               |
| xxlOffset | number                | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| xxlPull   | number                | 栅格向左移动格数                       |
| xxlPush   | number                | 栅格向右移动格数                       |
| xl        | number                | ≥ `1200px` 响应式栅格                  |
| xlHidden  | boolean               | 隐藏栅格                               |
| xlOffset  | number                | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| xlPull    | number                | 栅格向左移动格数                       |
| xlPush    | number                | 栅格向右移动格数                       |
| lg        | number                | ≥ `992px` 响应式栅格                   |
| lgHidden  | boolean               | 隐藏栅格                               |
| lgOffset  | number                | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| lgPull    | number                | 栅格向左移动格数                       |
| lgPush    | number                | 栅格向右移动格数                       |
| md        | number                | ≥ `768px` 响应式栅格                   |
| mdHidden  | boolean               | 隐藏栅格                               |
| mdOffset  | number                | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| mdPull    | number                | 栅格向左移动格数                       |
| mdPush    | number                | 栅格向右移动格数                       |
| sm        | number                | ≥ `576px` 响应式栅格                   |
| smHidden  | boolean               | 隐藏栅格                               |
| smOffset  | number                | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| smPull    | number                | 栅格向左移动格数                       |
| smPush    | number                | 栅格向右移动格数                       |
| xs        | number                | < `576px` 响应式栅格                   |
| xsHidden  | boolean               | 隐藏栅格                               |
| xsOffset  | number                | 栅格左侧的间隔格数，间隔内不可以有栅格 |
| xsPull    | number                | 栅格向左移动格数                       |
| xsPush    | number                | 栅格向右移动格数                       |

#### 对应屏幕宽度

- xxl, extra-large: ≥ `1400px`
- xl, extra-large: ≥ `1200px`
- lg, large: ≥ `992px`
- md, medium: ≥ `768px`
- sm, small: ≥ `576px`
- xs, extra-small: < `576px`
