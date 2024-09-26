# Dropdown 下拉菜单

下拉菜单是一种导航，如果需要选择值请使用 SelectPicker。

## 获取组件

<!--{include:<import-guide>}-->

- `<Dropdown>` 下拉菜单。
- `<Dropdown.Item>` 下拉菜单选项。
- `<Dropdown.Menu>` 下拉菜单中创建子菜单。
- `<Dropdown.Separator>` 下拉菜单中的分割线。

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

### 禁用

<!--{include:`disabled.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 没有箭头图标

<!--{include:`no-caret.md`}-->

### 带快捷键

<!--{include:`shortcut.md`}-->

### 带图标的

<!--{include:`icons.md`}-->

### 分割线与面板

- 使用 `<Dropdown.Separator>` 设置分割线。
- 使用 `panel` 属性将一个 `Dropdown.Item` 设置为一个面板。

<!--{include:`custom.md`}-->

### 菜单位置

<!--{include:`placement.md`}-->

### 多级菜单

<!--{include:`submenu.md`}-->

### 菜单项

<!--{include:`menu-items.md`}-->

### 自定义 Toggle

<!--{include:`custom-toggle.md`}-->

### 与 Popover 组合使用

<!--{include:`with-popover.md`}-->

### 与按钮组合使用

<!--{include:`buttons.md`}-->

### 使用路由

`<Dropdown.Item>` 组件可与框架和客户端路由（例如 Next.js 和 React Router）配合使用。请参阅[路由指南](/zh/guide/composition/#third-party-routing-library)以了解如何进行设置。

<!--{include:`with-router.md`}-->

## Props

### `<Dropdown>`

| 属性名称        | 类型 `(默认值)`                                        | 描述                                             |
| --------------- | ------------------------------------------------------ | ------------------------------------------------ |
| activeKey       | string                                                 | 激活状态的选项，对应 Dropdown.Item 中的 eventKey |
| classPrefix     | string `('dropdown')`                                  | 组件 CSS 类的前缀                                |
| defaultOpen     | boolean                                                | 菜单是否初始开启                                 |
| disabled        | boolean                                                | 禁用组件                                         |
| icon            | Element&lt;typeof Icon&gt;                             | 设置图标                                         |
| menuStyle       | CSSProperties                                          | 菜单样式                                         |
| noCaret         | boolean                                                | 不展示箭头 icon                                  |
| onClose         | () => void                                             | 菜单关闭的回调函数                               |
| onOpen          | () => void                                             | 菜单弹出的回调函数                               |
| onSelect        | (eventKey: string, event) => void                      | 选择后的回调函数                                 |
| onToggle        | (open?: boolean) => void                               | 菜单状态切换的回调函数                           |
| open            | boolean                                                | 菜单是否开启 (受控)                              |
| placement       | [Placement](#code-ts-placement-code) `('bottomStart')` | 菜单显示位置                                     |
| renderToggle    | (props, ref) => any;                                   | 自定义 Toggle                                    |
| title           | ReactNode                                              | 菜单默认显示内容                                 |
| toggleAs        | ElementType `(Button)`                                 | 为组件自定义元素类型                             |
| toggleClassName | string                                                 | 设置 Toggle 的 className                         |
| trigger         | [Trigger](#code-ts-trigger-code) `('click')`           | 触发事件                                         |

### `<Dropdown.Item>`

| 属性名称    | 类型 `(默认值)`                | 描述                                    |
| ----------- | ------------------------------ | --------------------------------------- |
| active      | boolean                        | 选中当前选项                            |
| as          | ElementType `('li')`           | 为组件自定义元素类型                    |
| children \* | ReactNode                      | 组件内容                                |
| classPrefix | string `('dropdown-item')`     | 组件 CSS 类的前缀                       |
| disabled    | boolean                        | 禁用当前选项                            |
| divider     | boolean                        | 显示为分割线                            |
| eventKey    | string                         | 当前选项的值                            |
| icon        | Element&lt;typeof Icon&gt;     | 设置图标                                |
| onSelect    | (eventKey: any, event) => void | 选中当前选项的回调函数                  |
| panel       | boolean                        | 显示一个自定义的面板                    |
| shortcut    | string                         | 下拉菜单项的键盘快捷键 <br/>![][5.58.0] |

### `<Dropdown.Menu>`

| 属性名称 | 类型                       | 描述               |
| -------- | -------------------------- | ------------------ |
| icon     | Element&lt;typeof Icon&gt; | 设置图标           |
| title    | string                     | 作为子菜单定义标题 |

### `<Dropdown.Separator>`

| 属性名称 | 类型                 | 描述                 |
| -------- | -------------------- | -------------------- |
| as       | ElementType `('li')` | 为组件自定义元素类型 |

<!--{include:(_common/types/placement8.md)}-->
<!--{include:(_common/types/trigger.md)}-->

[5.58.0]: https://img.shields.io/badge/>=-v5.58.0-blue
