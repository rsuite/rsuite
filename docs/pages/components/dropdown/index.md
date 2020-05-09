# Dropdown 下拉菜单

下拉菜单是一种导航，如果需要选择值请使用 SelectPicker。

- `<Dropdown>` 下拉菜单。
- `<Dropdown.Item>` 下拉菜单选项。
- `<Dropdown.Menu>` 下拉菜单中创建子菜单。

## 获取组件

```js
import { Dropdown } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Dropdown>`

| 属性名称             | 类型 `(默认值)`                                           | 描述                                             |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------ |
| activeKey            | any                                                       | 激活状态的选项，对应 Dropdown.Item 中的 eventKey |
| classPrefix          | string `('dropdown')`                                     | 组件 CSS 类的前缀                                |
| disabled             | boolean                                                   | 禁用组件                                         |
| icon                 | React.Element&lt;typeof Icon&gt;                          | 设置图标                                         |
| menuStyle            | React.CSSProperties                                       | 菜单样式                                         |
| onClose              | () => void                                                | 菜单关闭的回调函数                               |
| onOpen               | () => void                                                | 菜单弹出的回调函数                               |
| onSelect             | (eventKey: any, event: SyntheticEvent&lt;any&gt;) => void | 选择后的回调函数                                 |
| onToggle             | (open?: boolean) => void                                  | 菜单状态切换的回调函数                           |
| open                 | boolean                                                   | 受控的打开状态                                   |
| placement            | enum: [Placement8](#types)`('bottomStart')`               | 菜单显示位置                                     |
| renderTitle          | (children?: React.Node) => React.Node                     | 自定义 title                                     |
| title                | React.Node                                                | 菜单默认显示内容                                 |
| toggleClassName      | string                                                    | 设置 Toggle 的 className                         |
| toggleComponentClass | React.ElementType `(Button)`                              | 为组件自定义元素类型                             |
| trigger              | union: [Trigger](#types) `('click')`                      | 触发事件                                         |

### `<Dropdown.Item>`

| 属性名称       | 类型 `(默认值)`                                           | 描述                   |
| -------------- | --------------------------------------------------------- | ---------------------- |
| active         | boolean                                                   | 选中当前选项           |
| children \*    | React.Node                                                | 组件内容               |
| classPrefix    | string `('dropdown-item')`                                |
| componentClass | React.ElementType `('a')`                                 | 为组件自定义元素类型   |
| disabled       | boolean                                                   | 禁用当前选项           |
| divider        | boolean                                                   | 显示为分割线           |
| eventKey       | any                                                       | 当前选项的值           |
| icon           | React.Element&lt;typeof Icon&gt;                          | 设置图标               |
| onSelect       | (eventKey: any, event: SyntheticEvent&lt;any&gt;) => void | 选中当前选项的回调函数 |
| panel          | boolean                                                   | 显示一个自定义的面板   |
| renderItem     | (item:React.Node) => React.Node                           | 自定义渲染选项         |

### `<Dropdown.Menu>`

| 属性名称 | 类型                             | 描述                             |
| -------- | -------------------------------- | -------------------------------- |
| icon     | React.Element&lt;typeof Icon&gt; | 设置图标                         |
| pullLeft | boolean                          | 子菜单从左侧展开，默认为右侧展开 |
| title    | string                           | 作为子菜单定义标题               |
