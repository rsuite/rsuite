# Frame 框架

用于包裹页面内容的布局组件。

## 获取组件

<!--{include:<import-guide>}-->

- `Container` 用于提供布局元素的结构性容器。
- `Header` 代表顶部区域，通常包含导航或品牌信息。
- `Content` 承载主要内容区域。
- `Footer` 位于底部，通常包含版权信息或链接。
- `Sidebar` 作为侧边区域，可用于导航或附加内容。

## 示例

### 水平布局

<!--{include:<example-horizontal>}-->

### 右侧边栏

<!--{include:<example-right-sidebar>}-->

### 垂直布局

<!--{include:<example-vertical>}-->

### 居中布局

<!--{include:<example-center>}-->

## Props

### `<Container>`

| 属性名称    | 类型 `(默认值)`           | 描述                 |
| ----------- | ------------------------- | -------------------- |
| as          | ElementType `('section')` | 为组件自定义元素类型 |
| children    | ReactNode                 | 主要内容             |
| classPrefix | string `('container')`    | 组件 CSS 类的前缀    |
| className   | string                    | 自定义 CSS 类名      |
| style       | CSSProperties             | 自定义样式           |

### `<Header>`

| 属性名称    | 类型 `(默认值)`          | 描述                 |
| ----------- | ------------------------ | -------------------- |
| as          | ElementType `('header')` | 为组件自定义元素类型 |
| children    | ReactNode                | 主要内容             |
| classPrefix | string `('header')`      | 组件 CSS 类的前缀    |
| className   | string                   | 自定义 CSS 类名      |
| style       | CSSProperties            | 自定义样式           |

### `<Content>`

| 属性名称    | 类型 `(默认值)`        | 描述                 |
| ----------- | ---------------------- | -------------------- |
| as          | ElementType `('main')` | 为组件自定义元素类型 |
| children    | ReactNode              | 主要内容             |
| classPrefix | string `('content')`   | 组件 CSS 类的前缀    |
| className   | string                 | 自定义 CSS 类名      |
| style       | CSSProperties          | 自定义样式           |

### `<Footer>`

| 属性名称    | 类型 `(默认值)`          | 描述                 |
| ----------- | ------------------------ | -------------------- |
| as          | ElementType `('footer')` | 为组件自定义元素类型 |
| children    | ReactNode                | 主要内容             |
| classPrefix | string `('footer')`      | 组件 CSS 类的前缀    |
| className   | string                   | 自定义 CSS 类名      |
| style       | CSSProperties            | 自定义样式           |

### `<Sidebar>`

| 属性名称    | 类型 `(默认值)`         | 描述                 |
| ----------- | ----------------------- | -------------------- |
| as          | ElementType `('aside')` | 为组件自定义元素类型 |
| children    | ReactNode               | 主要内容             |
| classPrefix | string `('sidebar')`    | 组件 CSS 类的前缀    |
| className   | string                  | 自定义 CSS 类名      |
| collapsible | boolean                 | 是否可折叠           |
| style       | CSSProperties           | 自定义样式           |
| width       | number                  | 侧边栏宽度           |
