# Nav 导航

提供多种形式的导航菜单列表，可以是横向、纵向布局。

## 获取组件

<!--{include:(components/nav/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

`appearance` 属性设置导航外观:

- 'default' (默认值) 默认导航。
- 'tabs' 标签式的导航。
- 'subtle' 弱化的导航。

<!--{include:`appearance.md`}-->

> 针对 subtle/tabs 导航，可以设置一个 `reversed` 属性颠倒方向，用来适配导航在上下左右都可以使用。

### 垂直布局

<!--{include:`vertical.md`}-->

### 设置选项状态

- active 激活
- disabled 禁用

<!--{include:`status.md`}-->

### 宽度自适应

<!--{include:`justified.md`}-->

### 多级导航

<!--{include:`dropdown.md`}-->

> 当使用多级导航时，直接使用 `<Dropdown>` 组件。

### 设置图标

<!--{include:`icon.md`}-->

### 与 next/link 中的 Link 组合

<!--{include:`with-router.md`}-->

## Props

### `<Nav>`

| 属性名称    | 类型`(默认值)`                                    | 描述                                          |
| ----------- | ------------------------------------------------- | --------------------------------------------- |
| activeKey   | string                                            | 激活的 `key`, 对应 `<Nav.Item>` 中 `eventKey` |
| appearance  | enum: 'default', 'tabs', 'subtle' `('default')`   | 设置外观                                      |
| children \* | ChildrenArray&lt;NavItem or Dropdown&gt;          | 组件内容                                      |
| classPrefix | string `('nav')`                                  | 组件 CSS 类的前缀                             |
| justified   | boolean                                           | 宽度自适应                                    |
| onSelect    | (eventKey: string, event: SyntheticEvent) => void | 选择事件触发的回调函数                        |
| pullRight   | boolean                                           | 显示在右侧                                    |
| vertical    | boolean                                           | 垂直导航                                      |

### `<Nav.Item>`

| 属性名称    | 类型                              | 描述                   |
| ----------- | --------------------------------- | ---------------------- |
| active      | boolean                           | 激活状态               |
| as          | ElementType`('a')`                | 为组件自定义元素类型   |
| children \* | ReactNode                         | 组件内容               |
| disabled    | boolean                           | 禁用状态               |
| href        | string                            | 链接                   |
| icon        | Element&lt;typeof Icon&gt;        | 设置图标               |
| onSelect    | (eventKey: string, event) => void | 选择事件触发的回调函数 |

### `<Nav.Dropdown>`

- [继承 Dropdown 组件](./dropdown#Props)
