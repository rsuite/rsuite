# Container 容器

用于布局和包装内容的容器组件。

## 获取组件

<!--{include:<import-guide>}-->

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
