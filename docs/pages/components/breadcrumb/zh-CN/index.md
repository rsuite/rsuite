# Breadcrumb 面包屑

用于显示当前页面路径，并能快速返回到历史页面。

- `<Breadcrumb>` 面包屑组件。
- `<Breadcrumb.Item>` 面包屑选项组件。

## 获取组件

```js
import { Breadcrumb } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Breadcrumb>`

| 属性名称    | 类型 `(默认值)`                   | 描述                                           |
| ----------- | --------------------------------- | ---------------------------------------------- |
| classPrefix | string `('breadcrumb')`           | 组件 CSS 类的前缀                              |
| maxItems    | numner`(5)`                       | 设置要显示的面包屑的最大数量, 超过后会自动折叠 |
| separator   | React.Node `('/')`                | 分隔符                                         |
| onExpand    | (event: React.MouseEvent) => void | 在折叠视图中并单击省略号时要调用的函数         |

### `<Breadcrumb.Item>`

| 属性名称       | 类型 `(默认值)`                 | 描述                 |
| -------------- | ------------------------------- | -------------------- |
| active         | boolean                         | 激活状态             |
| componentClass | React.ElementType `('ol')`      | 为组件自定义元素类型 |
| renderItem     | (item:React.Node) => React.Node | 自定义渲染选项       |
