# Timeline 时间轴

一个时间流信息显示组件

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义激活的条目

默认情况下，最后一个 `Timeline.Item` 被显示为“激活”状态（蓝色圆点）。
你可以通过为 `isItemActive` 属性设置一个函数来改变这一行为。

为了方便，`Timeline` 提供了两个预设的函数：

- `Timeline.ACTIVE_FIRST` 将第一个条目标记为激活
- `Timeline.ACTIVE_LAST` 将最后一个条目标记为激活（默认的行为）

<!--{include:`custom-active-item.md`}-->

### 自定义时间轴内容的对齐方式

<!--{include:`align.md`}-->

### 自定义时间轴时间

<!--{include:`time.md`}-->

### 无止境的

<!--{include:`endless.md`}-->

### 自定义图标

<!--{include:`custom.md`}-->

## Props

### `<Timeline>`

| 属性名称     | 类型`(默认值)`                                      | 描述                                   |
| ------------ | --------------------------------------------------- | -------------------------------------- |
| align        | 'left' &#124; 'right' &#124; 'alternate' `('left')` | 时间轴内容的对齐方式                   |
| as           | ElementType `('ul')`                                | 为组件自定义元素类型                   |
| children \*  | Timeline.Item[]                                     | 组件的内容                             |
| classPrefix  | string `('timeline')`                               | 组件 CSS 类的前缀                      |
| endless      | boolean                                             | 时间轴无止境的                         |
| isItemActive | (index: number, totalItemsCount: number) => boolean | 确定某个条目是否应当被标记为“激活”状态 |

### `<Timeline.Item>`

| 属性名称    | 类型`(默认值)`             | 描述                 |
| ----------- | -------------------------- | -------------------- |
| as          | ElementType `('li')`       | 为组件自定义元素类型 |
| children \* | ReactNode                  | 组件的内容           |
| classPrefix | string `('timeline-item')` | 组件 CSS 类的前缀    |
| dot         | ReactNode                  | 自定义时间轴点       |
| time        | ReactNode                  | 自定义时间轴时间     |
