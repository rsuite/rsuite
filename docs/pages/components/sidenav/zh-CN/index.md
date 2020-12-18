# Sidenav 侧导航

对 Nav 的一个封装，用于页面侧边栏。

- `<Sidenav>` 侧导航组件。
- `<Sidenav.Header>` 导航顶部内容区域。
- `<Sidenav.Body>` 导航选项区域。

## 获取组件

<!--{include:(components/sidenav/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

`appearance` 属性设置导航栏外观:

- `default` (默认值) 默认导航栏。
- `inverse` 反色的导航栏。
- `subtle` 弱化的导航栏。

<!--{include:`appearance.md`}-->

### 折叠菜单

<!--{include:`collapsed.md`}-->

### 自定义侧导航

- 设置 `panel` 属性，可以自定义一个面板区域。
- 设置 `divider` 属性，设置一个分割线。

<!--{include:`divider-panel.md`}-->

## Props

### `<Sidenav>`

| 属性名称        | 类型 `(默认值)`                                    | 描述                                       |
| --------------- | -------------------------------------------------- | ------------------------------------------ |
| activeKey       | string                                             | 激活选项, 对应菜单 eventKey                |
| appearance      | enum: 'default', 'inverse', 'subtle' `('default')` | 菜单外观                                   |
| as              | ElementType `('div')`                              | 为组件自定义元素类型                       |
| classPrefix     | string `('sidenav')`                               | 组件 CSS 类的前缀                          |
| defaultOpenKeys | string[]                                           | 默认展开菜单, 对应 Dropdown 中 eventKey    |
| expanded        | boolean `(true)`                                   | 是否是展开 Sidenav                         |
| onOpenChange    | (openKeys: string[], event) => void                | 菜单打开发生改变的回调函数                 |
| onSelect        | (eventKey: string[], event) => void                | 选择菜单的回调函数                         |
| openKeys        | string[]                                           | 打开菜单, 对应 Dropdown 中 eventKey (受控) |
