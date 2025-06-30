# Accordion 手风琴

手风琴组件用于通过点击标题展开和折叠内容区域。它通常用于在有限的空间中显示大量内容。

## 获取组件

<!--{include:<import-guide>}-->

## 示例

### 默认

默认情况下，可以展开多个面板。点击标题展开或折叠手风琴面板区域。

<!--{include:`basic.md`}-->

### 带边框

<!--{include:`bordered.md`}-->

### 只展开一个面板

当设置 `defaultActiveKey` 或 `activeKey` 时，只能展开一个面板。

<!--{include:`accordion.md`}-->

### 受控组件

`activeKey` 可以通过 `onSelect` 回调来控制。

<!--{include:`controlled.md`}-->

### 自定义指示器

<!--{include:`custom-indicator.md`}-->

### 自定义标题

<!--{include:`custom-header.md`}-->

### 禁用面板

<!--{include:`disabled-panel.md`}-->

## 可访问性

### ARIA 属性

- `aria-expanded`: 表示面板是否展开或折叠。
- `aria-controls`: 标识面板控制的内容。
- `aria-labelledby`: 标识面板的标题元素。
- `aria-disabled`: 表示面板是否禁用。

### 键盘交互

- <kbd>Tab</kbd>: 移动焦点到下一个可聚焦的面板。
- <kbd>Enter</kbd> 或者 <kbd>Space</kbd>: 展开或折叠面板。

### 资源

- [ARIA 实践：手风琴模式](https://www.w3.org/WAI/translations/#accordion)

## Props

### `<Accordion>`

| 属性             | 类型 `(默认值)`                   | 描述                         |
| ---------------- | --------------------------------- | ---------------------------- |
| activeKey        | string                            | 激活的项的事件键。           |
| bordered         | boolean                           | 显示边框。                   |
| classPrefix      | string                            | 组件 CSS 类名的前缀。        |
| defaultActiveKey | string                            | 默认激活的项的事件键。       |
| onSelect         | (eventKey: string, event) => void | 当激活的项发生变化时的回调。 |

### `<Accordion.Panel>`

| 属性            | 类型 `(默认值)`    | 描述                  |
| --------------- | ------------------ | --------------------- |
| bodyFill        | boolean            | 内容区域是否填充。    |
| caretAs         | ReactNode          | 自定义指示器。        |
| classPrefix     | string `('panel')` | 组件 CSS 类名的前缀。 |
| defaultExpanded | boolean            | 默认展开面板。        |
| disabled        | boolean            | 禁用面板。            |
| eventKey        | string             | 面板对应的事件键。    |
| expanded        | boolean            | 展开面板。            |
| header          | ReactNode          | 面板标题。            |
