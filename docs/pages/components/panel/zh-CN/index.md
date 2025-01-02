# Panel 面板

一个内容面板， 支持折叠、阴影、线框的容器。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 带线框

<!--{include:`bordered.md`}-->

### 有阴影

<!--{include:`shaded.md`}-->

### 滚动阴影

<!--{include:`scroll-shadow.md`}-->

### 带操作按钮

<!--{include:`with-action.md`}-->

### 没有标题

<!--{include:`no-header.md`}-->

### 卡片

<!--{include:`card.md`}-->

### 卡片组

<!--{include:`card-grid.md`}-->

### 可折叠

<!--{include:`collapsible.md`}-->

### 撑满容器

<!--{include:`body-fill.md`}-->

### 面板组

<!--{include:`panel-group.md`}-->

### 可折叠面板组

<!--{include:`accordion-group.md`}-->

### 手风琴效果

每次只能展开一个面板

<!--{include:`accordion-group-active.md`}-->

## 可访问性

### ARIA 属性

- 当 Panel 为可折叠时，在按钮上设置 `aria-expanded` 属性，用于标识当前面板是否展开。
- 当 Panel 为可折叠时，在按钮上设置 `aria-controls` 属性，用于标识当前面板的内容区域。
- 当 Panel 为可折叠时，在面板内容区域上设置 `aria-labelledby` 属性，用于标识当前面板的标题。

### 键盘操作

- 当 Panel 为可折叠时，按下 <kbd>Enter</kbd> 或 <kbd>Space</kbd> 键，展开或折叠面板。
- 当 Panel 为可折叠时，按下 <kbd>Tab</kbd> 键，焦点移动到下一个可聚焦的面板。

## Props

### `<Panel>`

| 属性名称        | 类型`(默认值)`     | 描述                                       |
| --------------- | ------------------ | ------------------------------------------ |
| bodyFill        | boolean            | 内容区域撑满容器                           |
| bodyProps       | HTMLAttributes     | 内容区域的属性<br/>![][5.62.0]             |
| bordered        | boolean            | 显示线框                                   |
| classPrefix     | string `('panel')` | 组件 CSS 类的前缀                          |
| collapsible     | boolean            | 可折叠的                                   |
| defaultExpanded | boolean            | 默认展开                                   |
| eventKey        | string             | 面板对应的事件 key                         |
| expanded        | boolean            | 展开面板                                   |
| header          | ReactNode          | 头部显示信息                               |
| id              | string             | 面板的 id                                  |
| scrollShadow    | boolean            | 滚动时候显示内容区域的阴影<br/>![][5.62.0] |
| shaded          | boolean            | 是否在边框上添加阴影效果                   |

### `<PanelGroup>`

| 属性名称         | 类型`(默认值)`                    | 描述                                     |
| ---------------- | --------------------------------- | ---------------------------------------- |
| accordion        | boolean                           | 可折叠的面板                             |
| activeKey        | string                            | 展开的面板，对应 `<Panel>` 的 `eventKey` |
| classPrefix      | string                            | 组件 CSS 类的前缀                        |
| defaultActiveKey | string                            | 默认展开面板                             |
| onSelect         | (eventKey: string, event) => void | 切换展开面板的回调函数                   |

[5.62.0]: https://img.shields.io/badge/>=-v5.62.0-blue
