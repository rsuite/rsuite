# Grid 栅格

Grid 组件提供了一个灵活的系统，用于使用 24 列栅格创建响应式布局。它的灵感来自 Bootstrap 的栅格系统，并提供了类似的响应式功能。

## 获取组件

<!--{include:<import-guide>}-->

- `Grid` 用于定义整个栅格系统的容器组件。
- `Row` 用于创建水平的行，包含列组件。
- `Col`用于创建垂直的列，是实际内容的容器。

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
| gutter   | number \| string      | 栅格的间距           |

### `<Col>`

| 属性名称    | 类型                          | 描述                                         |
| ----------- | ----------------------------- | -------------------------------------------- |
| as          | ElementType                   | 自定义元素类型                               |
| classPrefix | string                        | 组件 CSS 类的前缀                            |
| xs          | number \| [ColConfig][config] | 超小屏幕设备的栅格数或配置对象 (<576px)      |
| sm          | number \| [ColConfig][config] | 小屏幕设备的栅格数或配置对象 (≥576px)        |
| md          | number \| [ColConfig][config] | 中等屏幕设备的栅格数或配置对象 (≥768px)      |
| lg          | number \| [ColConfig][config] | 大屏幕设备的栅格数或配置对象 (≥992px)        |
| xl          | number \| [ColConfig][config] | 特大屏幕设备的栅格数或配置对象 (≥1200px)     |
| xxl         | number \| [ColConfig][config] | 额外超大屏幕设备的栅格数或配置对象 (≥1400px) |

[config]: #code-ts-col-config-code

### `ts:ColConfig`

```ts
interface ColConfig {
  span?: number; // 栅格占位格数
  offset?: number; // 栅格左侧的间隔格数
  push?: number; // 栅格向右移动格数
  pull?: number; // 栅格向左移动格数
  hidden?: boolean; // 是否隐藏栅格
}
```
