# Nav 导航

提供多种形式的导航菜单列表，可以是横向、纵向布局。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

`appearance` 属性设置导航外观:

- 'default' (默认值) 默认导航。
- 'tabs' 标签式的导航。
- 'subtle' 弱化的导航。
- 'pills' 胶囊式的导航。

<!--{include:`appearance.md`}-->

### Reversed

<!--{include:`reversed.md`}-->

### 垂直布局

<!--{include:`vertical.md`}-->

### 禁用项

<!--{include:`status.md`}-->

### 宽度自适应

<!--{include:`justified.md`}-->

### 多级导航

<!--{include:`dropdown.md`}-->

### 设置图标

<!--{include:`icon.md`}-->

### 与 next/link 中的 Link 组合

<!--{include:`with-router.md`}-->

> [与 React Router 中的 Link 组合](/zh/guide/composition/#react-router-dom)

## Props

### `<Nav>`

| 属性名称    | 类型`(默认值)`                                                       | 描述                                          |
| ----------- | -------------------------------------------------------------------- | --------------------------------------------- |
| activeKey   | string                                                               | 激活的 `key`, 对应 `<Nav.Item>` 中 `eventKey` |
| appearance  | 'default' &#124; 'tabs' &#124; 'subtle' &#124; 'pills' `('default')` | 设置外观                                      |
| children \* | ChildrenArray&lt;NavItem or Dropdown&gt;                             | 组件内容                                      |
| classPrefix | string `('nav')`                                                     | 组件 CSS 类的前缀                             |
| justified   | boolean                                                              | 宽度自适应                                    |
| onSelect    | (eventKey: string, event: SyntheticEvent) => void                    | 选择事件触发的回调函数                        |
| vertical    | boolean                                                              | 垂直导航                                      |

### `<Nav.Item>`

| 属性名称    | 类型                              | 描述                   |
| ----------- | --------------------------------- | ---------------------- |
| active      | boolean                           | 激活状态               |
| as          | ElementType`('a')`                | 为组件自定义元素类型   |
| children \* | ReactNode                         | 组件内容               |
| disabled    | boolean                           | 禁用状态               |
| eventKey    | string                            | 当前选项的值           |
| href        | string                            | 链接                   |
| icon        | Element&lt;typeof Icon&gt;        | 设置图标               |
| onSelect    | (eventKey: string, event) => void | 选择事件触发的回调函数 |

### `<Nav.Menu>`

| 属性名称      | 类型                                           | 描述                            |
| ------------- | ---------------------------------------------- | ------------------------------- |
| icon          | ReactElement                                   | 展开菜单的导航项图标            |
| noCaret       | boolean `(false)`                              | 是否隐藏小箭头图标              |
| onClose       | (event: SyntheticEvent) => void                | 菜单关闭时的回调                |
| onOpen        | (event: SyntheticEvent) => void                | 菜单开启时的回调                |
| onToggle      | (open: boolean, event: SyntheticEvent) => void | 菜单开启/关闭时的回调           |
| openDirection | "start"&#124;"end" `("end")`                   | 菜单开启的方向 (仅适用于子菜单) |
| title         | ReactNode                                      | 展开菜单的导航项内容            |
