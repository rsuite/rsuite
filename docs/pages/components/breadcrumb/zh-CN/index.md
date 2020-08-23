# Breadcrumb 面包屑

用于显示当前页面路径，并能快速返回到历史页面。

## 获取组件

```js
import { Breadcrumb } from 'rsuite';

//or
import Breadcrumb from 'rsuite/lib/Breadcrumb';
```

## 演示

<!--{demo}-->

## Props

### `<Breadcrumb>`

| 属性名称    | 类型 `(默认值)`             | 描述                                           |
| ----------- | --------------------------- | ---------------------------------------------- |
| as          | elementType `('a')`         | 为组件自定义元素类型                           |
| classPrefix | string `('breadcrumb')`     | 组件 CSS 类的前缀                              |
| maxItems    | numner`(5)`                 | 设置要显示的面包屑的最大数量, 超过后会自动折叠 |
| separator   | ReactNode `('/')`           | 分隔符                                         |
| onExpand    | (event: MouseEvent) => void | 在折叠视图中并单击省略号时要调用的函数         |

### `<Breadcrumb.Item>`

| 属性名称   | 类型 `(默认值)`               | 描述                 |
| ---------- | ----------------------------- | -------------------- |
| active     | boolean                       | 激活状态             |
| as         | elementType `('a')`           | 为组件自定义元素类型 |
| renderItem | (item:ReactNode) => ReactNode | 自定义渲染选项       |
