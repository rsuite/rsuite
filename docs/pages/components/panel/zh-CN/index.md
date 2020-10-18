# Panel 面板

一个内容面板， 支持折叠面板。Panel 中可以放所有 `Data Display` 组件，可以作为表单的容器。

- `<Panel>` 面板
- `<PanelGroup>` 面板组

## 获取组件

<!--{include:(components/panel/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 带线框

<!--{include:`bordered.md`}-->

### 有阴影

<!--{include:`shaded.md`}-->

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

## Props

### `<Panel>`

| 属性名称        | 类型`(默认值)`     | 描述               |
| --------------- | ------------------ | ------------------ |
| bodyFill        | boolean            | 内容区域撑满容器   |
| bordered        | boolean            | 显示线框           |
| shaded          | boolean            | 显示阴影           |
| classPrefix     | string `('panel')` | 组件 CSS 类的前缀  |
| collapsible     | boolean            | 可折叠的           |
| defaultExpanded | boolean            | 默认展开           |
| eventKey        | any                | 面板对应的事件 key |
| expanded        | boolean            | 展开面板           |
| header          | ReactNode          | 头部显示信息       |
| id              | string or number   | ID                 |

### `<PanelGroup>`

| 属性名称         | 类型`(默认值)`                                 | 描述                                     |
| ---------------- | ---------------------------------------------- | ---------------------------------------- |
| accordion        | boolean                                        | 可折叠的面板                             |
| activeKey        | any                                            | 展开的面板，对应 `<Panel>` 的 `eventKey` |
| classPrefix      | string                                         | 组件 CSS 类的前缀                        |
| defaultActiveKey | any                                            | 默认展开面板                             |
| onSelect         | (eventKey: any, event: SyntheticEvent) => void | 切换展开面板的回调函数                   |
