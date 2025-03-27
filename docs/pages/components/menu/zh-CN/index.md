# Menu 菜单

一个菜单组件，提供带有图标、描述和键盘快捷键的选项列表。

## 获取组件

<!--{include:<import-guide>}-->

- `Menu` 下拉菜单。
- `Menu.Item` 下拉菜单选项。
- `Menu.Separator` 用于分组的分割线。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 带快捷键

<!--{include:`shortcut.md`}-->

### 带图标

<!--{include:`icons.md`}-->

### 带描述

<!--{include:`description.md`}-->

### 带分割线

<!--{include:`separator.md`}-->

### 路由

`Menu.Item` 组件可通过 `as` 属性与其他路由库（如 Next.js、React Router）结合使用。详见[组合指南](/zh/guide/composition/#code-react-router-dom-code)。

<!--{include:`with-router.md`}-->

## Props

### `<Menu>`

| 属性名称    | 类型 `(默认值)`                                          | 描述                   |
| ----------- | -------------------------------------------------------- | ---------------------- |
| activeKey   | string \| number                                         | 设置菜单选中项的值     |
| as          | ElementType `('ul')`                                     | 为组件自定义元素类型   |
| classPrefix | string `('menu')`                                        | 组件 CSS 类的前缀      |
| onSelect    | (eventKey: string \| number \| undefined, event) => void | 选择菜单项后的回调函数 |

### `<Menu.Item>`

| 属性名称    | 类型 `(默认值)`                             | 描述                   |
| ----------- | ------------------------------------------- | ---------------------- |
| active      | boolean                                     | 激活当前选项           |
| as          | ElementType `('li')`                        | 为组件自定义元素类型   |
| classPrefix | string `('menu-item')`                      | 组件 CSS 类的前缀      |
| description | ReactNode                                   | 当前选项的描述         |
| disabled    | boolean                                     | 禁用当前选项           |
| eventKey    | string \| number                            | 当前选项的值           |
| icon        | ReactElement                                | 设置图标               |
| onSelect    | (eventKey: string \| number, event) => void | 选中当前选项的回调函数 |
| shortcut    | string                                      | 菜单项的键盘快捷键     |

### `<Menu.Separator>`

| 属性名称    | 类型 `(默认值)`                | 描述                 |
| ----------- | ------------------------------ | -------------------- |
| as          | ElementType `('li')`           | 为组件自定义元素类型 |
| classPrefix | string `('menu-item-divider')` | 组件 CSS 类的前缀    |
