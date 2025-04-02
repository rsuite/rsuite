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

通过在 `Row` 上设置 `gutter` 属性来调整栅格间距。`gutter` 属性可以设置水平和垂直方向的间距，支持响应式值。

<!--{include:`gutter.md`}-->

### 偏移

使用 `offset` 属性将列向右偏移。例如，`offset={4}` 会将元素向右偏移 4 列。这对于创建间隙或在栅格中居中内容非常有用。

<!--{include:`offset.md`}-->

### 多行

如果列的跨度（span）和偏移（offset）的总和超过了 columns 属性（默认为 12），列将会自动换行到下一行。
13）

<!--{include:`multiple-rows.md`}-->

### 栅格推拉

使用 `push` 和 `pull` 改变列的顺序。这允许你在不改变 DOM 结构的情况下视觉上重新排序列，这在创建响应式布局时特别有用。

<!--{include:`pull-push.md`}-->

### 自动调节列宽

当设置 `span="auto"` 时，列宽将根据其内容自动调整。当你希望列根据其内容而不是栅格系统来确定大小时，这个特性非常有用。

<!--{include:`auto.md`}-->

### 隐藏栅格

对象语法提供了 `hidden` 属性来控制在不同屏幕尺寸下的显示和隐藏。使用此功能可以创建响应式布局，使列根据视口大小显示或隐藏。

<!--{include:`hidden.md`}-->

### 嵌套

栅格系统支持无限嵌套。你可以在列内放置行，以创建更复杂和灵活的布局，同时在每一层级保持相同的 24 列栅格系统。

<!--{include:`nested.md`}-->

### 对齐

控制行内列的水平（`justify`）和垂直（`align`）对齐方式。这为布局中的内容定位提供了精确的控制。

<!--{include:`justify-align.md`}-->

### 排序

使用 `order` 属性控制列的视觉顺序，而不受 DOM 位置的影响。这在创建需要在不同屏幕尺寸下改变内容顺序的响应式布局时特别有用。

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
| gutter      | [GutterType][gutter] \| [ResponsiveValue\<GutterType\>][responsive]                                | 栅格间距。支持响应式值     |
| justify     | 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| [ResponsiveValue][responsive] | 水平分布方式。支持响应式值 |

### `<Col>`

| 属性名称    | 类型`(默认值)`                                    | 描述                                                 |
| ----------- | ------------------------------------------------- | ---------------------------------------------------- |
| as          | ElementType`('div')`                              | 自定义元素类型                                       |
| classPrefix | string `('col')`                                  | 组件 CSS 类的前缀                                    |
| hidden      | boolean \| [ResponsiveValue][responsive]          | 是否隐藏栅格                                         |
| offset      | number \| [ResponsiveValue][responsive]           | 栅格左侧的间隔格数                                   |
| order       | number \| [ResponsiveValue][responsive]           | 栅格列的顺序                                         |
| pull        | number \| [ResponsiveValue][responsive]           | 栅格向左移动格数                                     |
| push        | number \| [ResponsiveValue][responsive]           | 栅格向右移动格数                                     |
| span        | number \| 'auto' \| [ResponsiveValue][responsive] | 栅格占位格数，设置为 'auto' 时宽度会根据内容自动调整 |

<!--{include:(_common/types/responsive-value.md)}-->

[responsive]: #code-ts-responsive-value-code
[gutter]: #code-ts-gutter-type-code

### `ts:GutterType`

```ts
type GutterType = number | string | [number | string, number | string];
```
