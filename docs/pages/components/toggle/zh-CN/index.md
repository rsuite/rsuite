# Toggle 开关

开关选择器，用于两个值之间的选择。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 开关尺寸

<!--{include:`size.md`}-->

### 颜色

<!--{include:`color.md`}-->

### 带标签

<!--{include:`with-label.md`}-->

### 文字和图标

可以通过 `checkedChildren`,`unCheckedChildren` 两个属性分别设置开关两种状态下显示的内容

<!--{include:`inner.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 加载中

<!--{include:`loading.md`}-->

## 无障碍设计

### ARIA 属性

- Toggle 具有 `switch` role 。
- 当处于 `checked` 状态时，Toggle 将 `aria-checked` 设置为 `true`。
- 当处于 `unchecked` 状态时，Toggle 将 `aria-checked` 设置为 `false`。
- 当处于 `loading` 状态时，Toggle 将 `aria-busy` 设置为 `true`。
- 当处于 `disabled` 状态时，Toggle 将 `aria-disabled` 设置为 `true`。
- 当拥有 `children` 时，Toggle 将 `aria-labelledby` 设置为 `children` 的 id。

### 键盘交互

- <kbd>Space</kbd> - 切换开关状态。

## Props

### `<Toggle>`

| 属性名称          | 类型 `(默认值)`                            | 描述                                               |
| ----------------- | ------------------------------------------ | -------------------------------------------------- |
| checked           | boolean                                    | 指定当前是否选中                                   |
| checkedChildren   | ReactNode                                  | 选中显示的内容                                     |
| children          | ReactNode                                  | 开关的标签<br/>![][5.63.0]                         |
| classPrefix       | string `('toggle')`                        | 组件 CSS 类的前缀                                  |
| color             | [Color](#code-ts-color-code)               | 开关颜色<br/>![][5.63.0]                           |
| defaultChecked    | boolean                                    | 初始是否选中                                       |
| disabled          | boolean                                    | 禁用                                               |
| loading           | boolean                                    | 是否展示一个圈圈表示选中状态正在获取/更新          |
| locale            | [ToggleLocaleType](/zh/guide/i18n/#toggle) | 定义本地化设置，使组件文本根据用户地区显示相应语言 |
| onChange          | (checked: boolean, event) => void          | 状态改变时的回调函数                               |
| size              | 'lg' \| 'md' \| 'sm'                       | 开关尺寸                                           |
| unCheckedChildren | ReactNode                                  | 非选中显示的内容                                   |

<!--{include:(_common/types/color.md)}-->

[5.63.0]: https://img.shields.io/badge/>=-v5.63.0-blue
