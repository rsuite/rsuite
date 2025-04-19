# Breadcrumb 面包屑

用于显示当前页面路径，并能快速返回到历史页面。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### 图标

<!--{include:`icons.md`}-->

### 背景色

<!--{include:`background.md`}-->

### 自定义分隔符

<!--{include:`separator.md`}-->

### 自动折叠

如果项目超过 5 个，会自动折叠。可以使用 `maxItems` 属性设置要显示的面包屑的最大数量。

<!--{include:`max-items.md`}-->

### 路由

`Breadcrumb.Item` 组件可通过 `as` 属性与其他路由库（如 Next.js、React Router）结合使用。详见[组合指南](/zh/guide/composition/#code-react-router-dom-code)。

<!--{include:`with-router.md`}-->

### 无障碍设计

WAI-ARIA:https://www.w3.org/TR/wai-aria-practices/#breadcrumb

- `<Breadcrumb>` 导航默认被包含在一个 `nav` 元素中。
- 务必在 `<Breadcrumb>`导航组件上加上 `aria-label` 的描述。
- 如果最后一个链接是可交互的，请将 `aria-current` 设置为 `page`。

```js
<Breadcrumb aria-label="breadcrumb">
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Item aria-current="page" href="/components/breadcrumb">
    Breadcrumb
  </Breadcrumb.Item>
</Breadcrumb>
```

## Props

### `<Breadcrumb>`

| 属性名称    | 类型 `(默认值)`                                    | 描述                                           |
| ----------- | -------------------------------------------------- | ---------------------------------------------- |
| as          | ElementType `('nav')`                              | 为组件自定义元素类型                           |
| classPrefix | string `('breadcrumb')`                            | 组件 CSS 类的前缀                              |
| locale      | [BreadcrumbLocaleType](/zh/guide/i18n/#breadcrumb) | 本地化设置，用于显示组件文本的语言             |
| maxItems    | number `(5)`                                       | 设置要显示的面包屑的最大数量，超过后会自动折叠 |
| onExpand    | (event: MouseEvent) => void                        | 折叠视图中点击省略号时的回调函数               |
| separator   | ReactNode `('/')`                                  | 自定义面包屑项之间的分隔符                     |
| size        | 'sm' \| 'md' \| 'lg' \| number \| string `('md')`  | 设置面包屑项的大小                             |

### `<Breadcrumb.Item>`

| 属性名称    | 类型 `(默认值)`              | 描述                                                    |
| ----------- | ---------------------------- | ------------------------------------------------------- |
| active      | boolean                      | 指示面包屑项是否处于激活状态                            |
| as          | ElementType `('a')`          | 自定义元素类型。默认为 'span'，设置 'href' 时默认为 'a' |
| classPrefix | string `('breadcrumb-item')` | 组件 CSS 类的前缀                                       |
| href        | string                       | 当提供时，将面包屑项渲染为锚元素                        |
| icon        | ReactNode                    | 在面包屑项文本前显示的自定义图标                        |
