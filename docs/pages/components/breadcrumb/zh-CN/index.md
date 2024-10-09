# Breadcrumb 面包屑

用于显示当前页面路径，并能快速返回到历史页面。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 自定义分隔符

<!--{include:`separator.md`}-->

### 自动折叠

如果项目超过 5 个，会自动折叠。可以使用 `maxItems` 属性设置要显示的面包屑的最大数量。

<!--{include:`max-items.md`}-->

### 与 next/link 中的 Link 组合

<!--{include:`with-router.md`}-->

> [与 React Router 中的 Link 组合](/zh/guide/composition/#react-router-dom)

### 无障碍设计

WAI-ARIA:https://www.w3.org/TR/wai-aria-practices/#breadcrumb

- `<Breadcrumb>` 导航默认被包含在一个 `nav` 元素中。
- 务必在 `<Breadcrumb>`导航组件上加上 `aria-label` 的描述。

```js
<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
</Breadcrumb>
```

- 如果最后一个链接是可交互的，请将 `aria-current` 设置为 `page`。

```js
<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
  <Breadcrumb.Item aria-current="page" href="/components/breadcrumb">
    Breadcrumb
  </Breadcrumb.Item>
</Breadcrumb>
```

## Props

### `<Breadcrumb>`

| 属性名称    | 类型 `(默认值)`                                    | 描述                                               |
| ----------- | -------------------------------------------------- | -------------------------------------------------- |
| as          | elementType `('nav')`                              | 为组件自定义元素类型                               |
| classPrefix | string `('breadcrumb')`                            | 组件 CSS 类的前缀                                  |
| locale      | [BreadcrumbLocaleType](/zh/guide/i18n/#breadcrumb) | 定义本地化设置，使组件文本根据用户地区显示相应语言 |
| maxItems    | numner`(5)`                                        | 设置要显示的面包屑的最大数量, 超过后会自动折叠     |
| onExpand    | (event: MouseEvent) => void                        | 在折叠视图中并单击省略号时要调用的函数             |
| separator   | ReactNode `('/')`                                  | 分隔符                                             |

### `<Breadcrumb.Item>`

| 属性名称    | 类型 `(默认值)`              | 描述                                                                        |
| ----------- | ---------------------------- | --------------------------------------------------------------------------- |
| active      | boolean                      | 激活状态                                                                    |
| as          | elementType `('span')`       | 为组件自定义元素类型，默认为 `span` 元素，当设置 `href` 则会默认为 `a` 元素 |
| classPrefix | string `('breadcrumb-item')` | 组件 CSS 类的前缀                                                           |
| href        | string                       | 跳转链接                                                                    |
