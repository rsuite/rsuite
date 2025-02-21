# Sidenav 侧导航

对页面侧边栏的 Nav 组件的封装。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 子菜单

<!--{include:`submenu.md`}-->

### 分组标题

使用 `Sidenav.GroupLabel` 来定义导航的分组标题。

<!--{include:`group.md`}-->

### Sidenav 顶部

使用 `Sidenav.Header` 来定义导航顶部的内容，比如 Logo、搜索框等。

<!--{include:`header.md`}-->

### Sidenav 底部

使用 `Sidenav.Footer` 来定义导航底部的内容，比如折叠导航的切换按钮。

<!--{include:`footer.md`}-->

### 可控的展开与折叠导航

<!--{include:`collapsed.md`}-->

### 自定义面板和分割线

你可以通过在 `Nav.Item` 上使用 `panel` 和 `divider` 属性来自定义导航的内容。

<!--{include:`divider-panel.md`}-->

### 带徽标

使用 `Badge` 组件来显示子菜单中的项目数量。

<!--{include:`with-badge.md`}-->

### 外观

`appearance` 属性允许你定义 Sidenav 的外观。可用的值包括 `default`、`inverse` 和 `subtle`。`inverse` 值可用于创建与默认外观视觉上不同的 Sidenav。`subtle` 值可用于创建具有简约外观的 Sidenav。

> 在高对比度主题下，所有外观都与 `default` 外观相同。

<!--{include:`appearance.md`}-->

## Props

### `<Sidenav>`

| 属性名称        | 类型 `(默认值)`                                  | 描述                           |
| --------------- | ------------------------------------------------ | ------------------------------ |
| appearance      | 'default' \| 'inverse' \| 'subtle' `('default')` | 设置侧边导航的视觉外观样式     |
| as              | ElementType `('div')`                            | 自定义根组件的 HTML 元素类型   |
| classPrefix     | string `('sidenav')`                             | 组件 CSS 类名的前缀            |
| defaultOpenKeys | string[]                                         | 初始展开下拉菜单项的键值数组   |
| expanded        | boolean `(true)`                                 | 控制侧边导航的展开/折叠状态    |
| onOpenChange    | (openKeys: string[], event) => void              | 菜单项打开状态变化时的回调函数 |
| openKeys        | string[]                                         | 受控的展开下拉菜单项的键值数组 |

### `<Sidenav.Header>`

| 属性名称    | 类型 `(默认值)`             | 描述                           |
| ----------- | --------------------------- | ------------------------------ |
| as          | ElementType `('div')`       | 自定义头部组件的 HTML 元素类型 |
| classPrefix | string `('sidenav-header')` | 头部组件 CSS 类名的前缀        |

### `<Sidenav.Body>`

| 属性名称    | 类型 `(默认值)`           | 描述                           |
| ----------- | ------------------------- | ------------------------------ |
| as          | ElementType `('div')`     | 自定义主体组件的 HTML 元素类型 |
| classPrefix | string `('sidenav-body')` | 主体组件 CSS 类名的前缀        |

### `<Sidenav.Footer>`

| 属性名称    | 类型 `(默认值)`             | 描述                           |
| ----------- | --------------------------- | ------------------------------ |
| as          | ElementType `('div')`       | 自定义底部组件的 HTML 元素类型 |
| classPrefix | string `('sidenav-footer')` | 底部组件 CSS 类名的前缀        |

### `<Sidenav.Toggle>`

| 属性名称    | 类型 `(默认值)`             | 描述                           |
| ----------- | --------------------------- | ------------------------------ |
| as          | ElementType `('button')`    | 自定义切换按钮的 HTML 元素类型 |
| classPrefix | string `('sidenav-toggle')` | 切换按钮 CSS 类名的前缀        |
| expanded    | boolean                     | 控制切换按钮的展开/折叠状态    |
| onToggle    | (expanded: boolean) => void | 切换状态变化时的回调函数       |

### `<Sidenav.GroupLabel>`

| 属性名称    | 类型 `(默认值)`                  | 描述                           |
| ----------- | -------------------------------- | ------------------------------ |
| as          | ElementType `('div')`            | 自定义分组标签的 HTML 元素类型 |
| classPrefix | string `('sidenav-group-label')` | 分组标签 CSS 类名的前缀        |
