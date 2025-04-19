# Navbar 导航栏

对 Nav 的一个封装，一般用于页面顶部导航。

## 获取组件

<!--{include:<import-guide>}-->

- `<Navbar>` 导航栏组件。
- `<Navbar.Brand>` 设置品牌，可以是你的公司、产品或项目的名称。
- `<Navbar.Content>` 导航栏内容容器, 将一组元素放在一起。
- `<Navbar.Toggle>` 用于在小屏幕上显示抽屉菜单的按钮。
- `<Navbar.Drawer>` 抽屉菜单容器。

## 演示

### 默认

最基础的导航栏用法，包含品牌和导航项。

<!--{include:`basic.md`}-->

### 外观

通过 `appearance` 属性切换导航栏的不同视觉风格。

<!--{include:`appearance.md`}-->

### 搜索

在导航栏中集成搜索框。

<!--{include:`search.md`}-->

### 二级导航

展示包含二级菜单的导航栏。

<!--{include:`subnav.md`}-->

### 大菜单

展示带有大型下拉菜单的导航栏。

<!--{include:`mege-menu.md`}-->

### 带抽屉菜单

小屏幕下可通过抽屉菜单展示导航项。

<!--{include:`with-drawer.md`}-->

### 带 Popover 菜单

通过弹出菜单（Popover）展示更多导航项。

<!--{include:`with-popover.md`}-->

## 响应式

导航栏可自适应不同屏幕尺寸，支持响应式布局。

<!--{include:<example-responsive>}-->

你可以使用 `showFrom` 和 `hideFrom` 属性来控制在不同断点下的显示和隐藏：

```jsx
// 在 xs 断点以上隐藏
<Navbar.Content hideFrom="xs">
  {/* 小屏幕内容 */}
</Navbar.Content>

// 在 xs 断点以下隐藏
<Navbar.Content showFrom="xs">
  {/* 大屏幕内容 */}
</Navbar.Content>
```

## Props

### `<Navbar>`

| 属性名称           | 类型`(默认值)`                                  | 描述                                           |
| ------------------ | ----------------------------------------------- | ---------------------------------------------- |
| as                 | ElementType `('div')`                           | 为组件自定义元素类型                           |
| appearance         | 'default' \| 'inverse' \| 'subtle'`('default')` | 导航栏外观                                     |
| classPrefix        | string `('navbar')`                             | 组件 CSS 类的前缀                              |
| onDrawerOpenChange | (open: boolean) => void                         | 抽屉菜单打开或关闭时的回调函数<br/> ![][6.0.0] |

### `<Navbar.Brand>`

| 属性名称    | 类型 `(默认值)`           | 描述                 |
| ----------- | ------------------------- | -------------------- |
| as          | ElementType `('a')`       | 为组件自定义元素类型 |
| href        | string                    | 品牌链接的 URL       |
| classPrefix | string `('navbar-brand')` | 组件 CSS 类的前缀    |
| children    | ReactNode                 | 品牌的内容           |

### `<Navbar.Content>`

![][6.0.0]

| 属性名称    | 类型 `(默认值)`             | 描述                 |
| ----------- | --------------------------- | -------------------- |
| as          | ElementType `('div')`       | 为组件自定义元素类型 |
| classPrefix | string `('navbar-content')` | 组件 CSS 类的前缀    |
| children    | ReactNode                   | 内容                 |
| showFrom    | [Breakpoints][breakpoints]  | 在指定断点显示内容   |
| hideFrom    | [Breakpoints][breakpoints]  | 在指定断点隐藏内容   |

### `<Navbar.Toggle>`

![][6.0.0]

| 属性名称      | 类型 `(Default)`                         | 描述                       |
| ------------- | ---------------------------------------- | -------------------------- |
| as            | ElementType `('button')`                 | 为组件自定义元素类型       |
| classPrefix   | string `('burger')`                      | 组件 CSS 类的前缀          |
| color         | [Color][Color] \| CSSProperties['color'] | 菜单按钮的线条颜色         |
| lineThickness | number                                   | 菜单按钮的线条粗细         |
| onToggle      | (open: boolean) => void                  | 菜单按钮点击时的回调函数   |
| open          | boolean                                  | 菜单按钮是否为打开状态 (X) |

### `<Navbar.Drawer>`

![][6.0.0]

继承 [`Drawer`](/zh/components/drawer)

<!--{include:(_common/types/breakpoints.md)}-->
<!--{include:(_common/types/color.md)}-->

[breakpoints]: #code-ts-breakpoints-code
[Color]: #code-ts-color-code
