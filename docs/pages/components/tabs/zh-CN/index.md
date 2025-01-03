# Tabs 标签页

Tabs 是一组分层的内容区域，也就是标签面板，每次只显示一个面板。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### Pills

<!--{include:`pills.md`}-->

### Subtle

<!--{include:`subtle.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 反转

<!--{include:`reversed.md`}-->

### 垂直

<!--{include:`vertical.md`}-->

### 带图标

<!--{include:`with-icon.md`}-->

### 受控的

<!--{include:`controlled.md`}-->

## 可访问性

### ARIA 属性

- `tablist` 角色被添加到容器元素。
  - `aria-orientation` 当 `vertical` 为 `true` 时设置为 `vertical`。
- `tab` 角色被添加到每个选项卡元素。
  - `aria-selected` 当 `activeKey` 与 `eventKey` 相同时设置为 `true`。
  - `aria-disabled` 当 `disabled` 为 `true` 时设置为 `true`。
  - `aria-controls` 设置为相应选项卡面板的 `id`。
- `tabpanel` 角色被添加到每个面板元素。
  - `aria-labelledby` 设置为相应选项卡的 `id`。
  - `aria-hidden` 当 `activeKey` 与 `eventKey` 不同时设置为 `true`。

### 键盘交互

- <kbd>←</kbd> - 将焦点移动到上一个选项卡，并激活它。
- <kbd>→</kbd> - 将焦点移动到下一个选项卡，并激活它。
- <kbd>↑</kbd> - 将焦点移动到上一个选项卡，并激活它。（垂直模式）
- <kbd>↓</kbd> - 将焦点移动到下一个选项卡，并激活它。（垂直模式）
- <kbd>Home</kbd> - 将焦点移动到第一个选项卡，并激活它。
- <kbd>End</kbd> - 将焦点移动到最后一个选项卡，并激活它。

## Props

| 名称             | 类型`(默认值)` ˇ                                 | 描述                                           |
| ---------------- | ------------------------------------------------ | ---------------------------------------------- |
| activeKey        | string                                           | 将具有匹配 `eventKey` 的选项卡标记为活动状态。 |
| appearance       | 'tabs' &#124; 'subtle' &#124; 'pills' `('tabs')` | 外观样式。                                     |
| children         | ChildrenArray&lt;Tabs.Tab&gt;                    | 组件的内容。                                   |
| classPrefix      | string `('tabs')`                                | 组件 CSS 类的前缀。                            |
| defaultActiveKey | string                                           | 默认活动的选项卡的 `eventKey`。                |
| onSelect         | (eventKey: string, event) => void                | 选项卡选中后的回调函数。                       |
| reversed         | boolean                                          | 反转显示。                                     |
| vertical         | boolean                                          | 垂直显示。                                     |

### `<Tabs.Tab>`

| 名称     | 类型 `(默认值)`            | 描述               |
| -------- | -------------------------- | ------------------ |
| children | ReactNode                  | 组件的内容。       |
| disabled | boolean                    | 禁用状态。         |
| eventKey | string                     | 选项卡的标识符。   |
| icon     | Element&lt;typeof Icon&gt; | 设置选项卡的图标。 |
| title \* | ReactNode                  | 设置选项卡的标题。 |
