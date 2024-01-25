# Navbar 导航栏

对 Nav 的一个封装，一般用于页面顶部导航。

## 获取组件

<!--{include:<import-guide>}-->

- `<Navbar>` 导航栏组件。
- `<Navbar.Brand>` 设置品牌，可以是你的公司、产品或项目的名称。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 外观

`appearance` 属性设置导航栏外观:

- 'default'(默认值) 默认导航栏。
- 'inverse' 反色的导航栏。
- 'subtle' 弱化的导航栏。

> 在高对比度主题下, 只有 `default` 外观有效。

<!--{include:`appearance.md`}-->

## Props

### `<Navbar>`

| 属性名称    | 类型`(默认值)`                                          | 描述                 |
| ----------- | ------------------------------------------------------- | -------------------- |
| as          | ElementType `('div')`                                   | 为组件自定义元素类型 |
| appearance  | 'default' &#124; 'inverse' &#124; 'subtle'`('default')` | 导航栏外观           |
| classPrefix | string `('navbar')`                                     | 组件 CSS 类的前缀    |
