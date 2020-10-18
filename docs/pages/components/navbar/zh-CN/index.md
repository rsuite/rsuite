# Navbar 导航栏

对 Nav 的一个封装，一般用于页面顶部导航。

- `<Navbar>` 导航栏组件。
- `<Navbar.Header>` 设置导航栏头部信息。
- `<Navbar.Body>` 设置导航栏选项。

## 获取组件

<!--{include:(components/navbar/fragments/import.md)`}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

`appearance` 属性设置导航栏外观:

- 'default'(默认值) 默认导航栏。
- 'inverse' 反色的导航栏。
- 'subtle' 弱化的导航栏。

<!--{include:`appearance.md`}-->

## Props

### `<Navbar>`

| 属性名称    | 类型`(默认值)`                                    | 描述                 |
| ----------- | ------------------------------------------------- | -------------------- |
| as          | ElementType `('div')`                             | 为组件自定义元素类型 |
| appearance  | enum: 'default', 'inverse', 'subtle'`('default')` | 导航栏外观           |
| classPrefix | string `('navbar')`                               | 组件 CSS 类的前缀    |
