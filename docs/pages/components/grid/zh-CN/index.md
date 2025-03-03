# Grid 栅格

Grid 组件提供了一个灵活的系统，用于使用 24 列栅格创建响应式布局。它的灵感来自 Bootstrap 的栅格系统，并提供了类似的响应式功能。

## 获取组件

<!--{include:<import-guide>}-->

- `Grid` 用于定义整个栅格系统的容器组件。
- `Row` 用于创建水平的行，包含列组件。
- `Col`用于创建垂直的列，是实际内容的容器。

## 演示

### 栅格系统

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

### 对齐

<!--{include:`justify-align.md`}-->

### 排序

<!--{include:`order.md`}-->

## 响应式

<!--{include:<example-responsive>}-->

## Props

### `<Grid>`

| 属性名称 | 类型`(默认值)`        | 描述                     |
| -------- | --------------------- | ------------------------ |
| as       | ElementType `('div')` | 为组件自定义元素类型     |
| fluid    | boolean               | 流体布局， （100% 宽度） |

### `<Row>`

| 属性名称    | 类型`(默认值)`                                                                                     | 描述                       |
| ----------- | -------------------------------------------------------------------------------------------------- | -------------------------- |
| align       | 'top' \| 'middle' \| 'bottom' \| [ResponsiveValue][responsive]                                     | 垂直对齐方式。支持响应式值 |
| as          | ElementType`('div')`                                                                               | 自定义元素类型             |
| classPrefix | string `('row')`                                                                                   | 组件 CSS 类的前缀          |
| gutter      | number \| string \| [ResponsiveValue][responsive]                                                  | 栅格间距。支持响应式值     |
| justify     | 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| [ResponsiveValue][responsive] | 水平分布方式。支持响应式值 |

### `<Col>`

| 属性名称    | 类型`(默认值)`                           | 描述               |
| ----------- | ---------------------------------------- | ------------------ |
| as          | ElementType`('div')`                     | 自定义元素类型     |
| classPrefix | string `('col')`                         | 组件 CSS 类的前缀  |
| hidden      | boolean \| [ResponsiveValue][responsive] | 是否隐藏栅格       |
| offset      | number \| [ResponsiveValue][responsive]  | 栅格左侧的间隔格数 |
| order       | number \| [ResponsiveValue][responsive]  | 栅格顺序           |
| pull        | number \| [ResponsiveValue][responsive]  | 栅格向左移动格数   |
| push        | number \| [ResponsiveValue][responsive]  | 栅格向右移动格数   |
| span        | number \| [ResponsiveValue][responsive]  | 栅格占位格数       |

### `ts:ResponsiveValue`

```ts
type ResponsiveValue<T> = {
  xs?: T; // 超小屏幕设备 (<576px)
  sm?: T; // 小屏幕设备 (≥576px)
  md?: T; // 中等屏幕设备 (≥768px)
  lg?: T; // 大屏幕设备 (≥992px)
  xl?: T; // 特大屏幕设备 (≥1200px)
  xxl?: T; // 额外超大屏幕设备 (≥1400px)
};
```

[responsive]: #code-ts-responsive-value-code
