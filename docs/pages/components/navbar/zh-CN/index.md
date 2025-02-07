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

<!--{include:`basic.md`}-->

### 外观

`appearance` 属性设置导航栏外观:

- 'default'(默认值) 默认导航栏。
- 'inverse' 反色的导航栏。
- 'subtle' 弱化的导航栏。

<!--{include:`appearance.md`}-->

### 搜索

<!--{include:`search.md`}-->

### 二级导航

<!--{include:`subnav.md`}-->

### 带抽屉菜单

<!--{include:`with-drawer.md`}-->

## 响应式

<!--{include:<example-responsive>}-->

你可以使用 `visible` 和 `hidden` 属性来控制在不同断点下的显示和隐藏：

```jsx
// 在小屏幕上显示
<Navbar.Content visible="sm">
  {/* 小屏幕内容 */}
</Navbar.Content>

// 在小屏幕上隐藏
<Navbar.Content hidden="sm">
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

| 属性名称    | 类型 `(默认值)`                               | 描述                 |
| ----------- | --------------------------------------------- | -------------------- |
| as          | ElementType `('div')`                         | 为组件自定义元素类型 |
| classPrefix | string `('navbar-content')`                   | 组件 CSS 类的前缀    |
| children    | ReactNode                                     | 内容                 |
| visible     | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' | 在指定断点显示内容   |
| hidden      | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' | 在指定断点隐藏内容   |

### `<Navbar.Toggle>`

![][6.0.0]

继承 [`IconButton`](/zh/components/icon-button)

### `<Navbar.Drawer>`

![][6.0.0]

继承 [`Drawer`](/zh/components/drawer)

[6.0.0]: https://img.shields.io/badge/>=-v6.0.0-blue
