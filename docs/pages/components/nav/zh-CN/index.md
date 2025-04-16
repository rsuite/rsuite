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

### 路由

`Nav.Item` 组件可以与 Next.js 和 React Router 等框架和客户端路由器一起使用。有关设置说明，请参阅[路由指南](/guide/composition/#third-party-routing-library)。

<!--{include:`with-router.md`}-->

## Props

### `<Nav>`

| 属性名称    | 类型`(默认值)`                                           | 描述                                          |
| ----------- | -------------------------------------------------------- | --------------------------------------------- |
| activeKey   | string                                                   | 激活的 `key`, 对应 `<Nav.Item>` 中 `eventKey` |
| appearance  | 'default' \| 'tabs' \| 'subtle' \| 'pills' `('default')` | 设置外观                                      |
| children \* | ChildrenArray&lt;NavItem or Dropdown&gt;                 | 组件内容                                      |
| classPrefix | string `('nav')`                                         | 组件 CSS 类的前缀                             |
| justified   | boolean                                                  | 宽度自适应                                    |
| onSelect    | (eventKey: string, event) => void                        | 选择事件触发的回调函数                        |
| vertical    | boolean                                                  | 垂直导航                                      |

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

| 属性名称      | 类型                           | 描述                            |
| ------------- | ------------------------------ | ------------------------------- |
| icon          | ReactElement                   | 展开菜单的导航项图标            |
| noCaret       | boolean `(false)`              | 是否隐藏小箭头图标              |
| onClose       | (event) => void                | 菜单关闭时的回调                |
| onOpen        | (event) => void                | 菜单开启时的回调                |
| onToggle      | (open: boolean, event) => void | 菜单开启/关闭时的回调           |
| openDirection | "start"\|"end" `("end")`       | 菜单开启的方向 (仅适用于子菜单) |
| title         | ReactNode                      | 展开菜单的导航项内容            |

### `<Nav.MegaMenu>`

![][6.0.0]

| 属性名称  | 类型                                                         | 描述                                                             |
| --------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| title     | ReactNode                                                    | 大型菜单触发器的标题或内容                                       |
| children  | ReactNode \| ((props: { onClose: () => void }) => ReactNode) | 大型菜单的内容，可以是 React 节点或返回带有 onClose 的节点的函数 |
| placement | [Placement](#code-ts-placement-code) `('autoVertical')`      | 大型菜单的位置                                                   |
| ...       | [NavItemProps][NavItemProps]                                 | 继承 `<Nav.Item>` 组件的所有属性                                 |

[NavItemProps]: /components/nav/#code-lt-nav-item-gt-code

<!--{include:(_common/types/placement-all.md)}-->


