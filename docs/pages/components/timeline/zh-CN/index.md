# Timeline 时间轴

一个时间流信息显示组件

## 获取组件

```js
import { Timeline } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Timeline>`

| 属性名称       | 类型`(默认值)`                                  | 描述                 |
| -------------- | ----------------------------------------------- | -------------------- |
| align          | enum: 'left' , 'right' , 'alternate' `('left')` | 时间轴内容的对齐方式 |
| children \*    | React.ChildrenArray&lt;Timeline.Item&gt;        | 组件的内容           |
| classPrefix    | string `('timeline')`                           | 组件 CSS 类的前缀    |
| componentClass | React.ElementType `('ul')`                      | 为组件自定义元素类型 |
| endless        | boolean                                         | 时间轴无止境的       |

### `<Timeline.Item>`

| 属性名称       | 类型`(默认值)`             | 描述                 |
| -------------- | -------------------------- | -------------------- |
| children \*    | React.Node                 | 组件的内容           |
| classPrefix    | string `('timeline-item')` | 组件 CSS 类的前缀    |
| componentClass | React.ElementType `('li')` | 为组件自定义元素类型 |
| dot            | React.Node                 | 自定义时间轴点       |
| time           | React.Node                 | 自定义时间轴时间     |
