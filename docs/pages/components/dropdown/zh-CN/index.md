# Dropdown 下拉菜单

下拉菜单是一种导航，如果需要选择值请使用 SelectPicker。

- `<Dropdown>` 下拉菜单。
- `<Dropdown.Item>` 下拉菜单选项。
- `<Dropdown.Menu>` 下拉菜单中创建子菜单。

## 获取组件

<!--{include:(components/dropdown/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 触发事件

通过 `trigger` 属性设置触发事件，支持事件:

- `click` (默认值)
- `hover`
- `contextMenu`

> 同时支持多个事件 `Array<click, hover, contextMenu>`

<!--{include:`trigger.md`}-->

### 选项激活状态

<!--{include:`active.md`}-->

### 禁用状态

可以禁用整个组件，也可以禁用单个选项，只需配置 `disabled` 属性。

<!--{include:`disabled.md`}-->

### 与按钮组合

`Dropdown` 的 `toggleAs` 属性默认值为是 `Button`, 可以设置按钮相关的属性（例如: size, appearance）, 以按钮的样式展示。

<!--{include:`toggle-as.md`}-->

### 没有插入号

<!--{include:`no-caret.md`}-->

### 带图标的

<!--{include:`icons.md`}-->

### 分割线与面板

- `divider` 设置分割选项。
- `panel` 设置一个面板。

<!--{include:`divider.md`}-->

### 菜单位置

<!--{include:`placement.md`}-->

### 多级菜单

<!--{include:`submenu.md`}-->

### 菜单项

<!--{include:`menu-items.md`}-->

### 与 Popover 组合使用

<!--{include:`with-popover.md`}-->

### 与按钮组合使用

<!--{include:`buttons.md`}-->

### 与 `next/link` 组合

<!--{include:`with-router.md`}-->

## Props

<!--{include:(_common/types/placement8.md)}-->
<!--{include:(_common/types/trigger.md)}-->

### `<Dropdown>`

| 属性名称        | 类型 `(默认值)`                     | 描述                                             |
| --------------- | ----------------------------------- | ------------------------------------------------ |
| activeKey       | string                              | 激活状态的选项，对应 Dropdown.Item 中的 eventKey |
| classPrefix     | string `('dropdown')`               | 组件 CSS 类的前缀                                |
| disabled        | boolean                             | 禁用组件                                         |
| icon            | Element&lt;typeof Icon&gt;          | 设置图标                                         |
| menuStyle       | CSSProperties                       | 菜单样式                                         |
| onClose         | () => void                          | 菜单关闭的回调函数                               |
| onOpen          | () => void                          | 菜单弹出的回调函数                               |
| onSelect        | (eventKey: string, event) => void   | 选择后的回调函数                                 |
| onToggle        | (open?: boolean) => void            | 菜单状态切换的回调函数                           |
| open            | boolean                             | 受控的打开状态                                   |
| placement       | Placement `('bottomStart')`         | 菜单显示位置                                     |
| renderTitle     | (children?: ReactNode) => ReactNode | 自定义 title                                     |
| title           | ReactNode                           | 菜单默认显示内容                                 |
| toggleAs        | ElementType `(Button)`              | 为组件自定义元素类型                             |
| toggleClassName | string                              | 设置 Toggle 的 className                         |
| trigger         | Trigger `('click')`                 | 触发事件                                         |

### `<Dropdown.Item>`

| 属性名称    | 类型 `(默认值)`                | 描述                   |
| ----------- | ------------------------------ | ---------------------- |
| active      | boolean                        | 选中当前选项           |
| as          | ElementType `('a')`            | 为组件自定义元素类型   |
| children \* | ReactNode                      | 组件内容               |
| classPrefix | string `('dropdown-item')`     | 组件 CSS 类的前缀      |
| disabled    | boolean                        | 禁用当前选项           |
| divider     | boolean                        | 显示为分割线           |
| eventKey    | string                         | 当前选项的值           |
| icon        | Element&lt;typeof Icon&gt;     | 设置图标               |
| onSelect    | (eventKey: any, event) => void | 选中当前选项的回调函数 |
| panel       | boolean                        | 显示一个自定义的面板   |

### `<Dropdown.Menu>`

| 属性名称 | 类型                       | 描述                             |
| -------- | -------------------------- | -------------------------------- |
| icon     | Element&lt;typeof Icon&gt; | 设置图标                         |
| title    | string                     | 作为子菜单定义标题               |
