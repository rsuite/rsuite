# Nav 导航

提供多种形式的导航菜单列表，可以是横向、纵向布局。

包含以下组件：

- `<Nav>` 导航组件；
- `<Nav.Item>` 导航选项组件。

## 获取组件

```js
import { Nav, Dropdown } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Nav>`

| 属性名称    | 类型`(默认值)`                                             | 描述                                          |
| ----------- | ---------------------------------------------------------- | --------------------------------------------- |
| activeKey   | any                                                        | 激活的 `key`, 对应 `<Nav.Item>` 中 `eventKey` |
| appearance  | enum: 'default', 'tabs', 'subtle' `('default')`            | 设置外观                                      |
| children \* | React.ChildrenArray&lt;NavItem or Dropdown&gt;             | 组件内容                                      |
| classPrefix | string `('nav')`                                           | 组件 CSS 类的前缀                             |
| justified   | boolean                                                    | 宽度自适应                                    |
| onSelect    | (eventKey: any, event: SyntheticEvent&lt;any&gt;) => void, | 选择事件触发的回调函数                        |
| pills       | boolean                                                    | 胶囊式导航                                    |
| pullRight   | boolean                                                    | 显示在右侧                                    |
| stacked     | boolean                                                    | 垂直导航                                      |

### `<Nav.Item>`

| 属性名称       | 类型                                                       | 描述                   |
| -------------- | ---------------------------------------------------------- | ---------------------- |
| active         | boolean                                                    | 激活状态               |
| children \*    | React.Node                                                 | 组件内容               |
| componentClass | React.ElementType`('a')`                                   | 为组件自定义元素类型   |
| disabled       | boolean                                                    | 禁用状态               |
| href           | string                                                     | 链接                   |
| icon           | React.Element&lt;typeof Icon&gt;                           | 设置图标               |
| onSelect       | (eventKey: any, event: SyntheticEvent&lt;any&gt;) => void, | 选择事件触发的回调函数 |
| renderItem     | (item:React.Node) => React.Node                            | 自定义渲染选项         |
