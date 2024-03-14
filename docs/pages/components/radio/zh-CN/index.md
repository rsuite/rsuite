# Radio 单选按钮

Radio 通常在 RadioGroup 中使用 — 描述一组相关选项的单选按钮的集合。

## 获取组件

<!--{include:<import-guide>}-->

- `<Radio>` 单选按钮。
- `<RadioGroup>` 单选按钮组。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 颜色

<!--{include:`colors.md`}-->

### 单选按钮组

<!--{include:`radio-group.md`}-->

### 单选按钮组 - 横向布局

<!--{include:`radio-group-inline.md`}-->

### 单选按钮组 - Picker

<!--{include:`radio-group-inline-picker.md`}-->

### 受控的单选按钮组

<!--{include:`radio-group-controlled.md`}-->

## 可访问性

### ARIA 属性

- 单选按钮组的 `role` 属性为 `radiogroup`。
- 每一个单选按钮的 `role` 属性为 `radio`。
- 如果选中单选按钮，则将 `aria-checked` 设置为 `true`。
- 如果单选按钮禁用，则将 `aria-disabled` 设置为 `true`。

### 键盘交互

- <kbd>→</kbd> - 将焦点移动到下一个单选按钮，当焦点位于单选组中的最后一个单选按钮上则移动到第一个单选按钮。
- <kbd>←</kbd> - 将焦点移动到上一个单选按钮。焦点位于单选组中的第一个单选按钮上则移动到最后个单选按钮。

## Props

### `<Radio>`

| 属性名称       | 类型                                             | 描述                                                                     |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------------ |
| as             | ElementType`(div)`                               | 为组件自定义元素类型                                                     |
| checked        | boolean                                          | 被选中（受控）                                                           |
| color          | [Color](#code-ts-color-code)                     | 选中状态时的颜色 <br/>![](https://img.shields.io/badge/min-v5.56.0-blue) |
| defaultChecked | boolean                                          | 默认被选中                                                               |
| disabled       | boolean                                          | 禁用                                                                     |
| inline         | boolean                                          | 内联布局                                                                 |
| inputProps     | object                                           | 设置 input 元素的属性                                                    |
| inputRef       | ref                                              | 将 ref 传递给 input 元素                                                 |
| name           | string                                           | 用于表单对应的名称                                                       |
| onChange       | (value: string, checked: boolean, event) => void | checked 状态发生改变的回调函数                                           |
| title          | string                                           | HTML title                                                               |
| value          | string                                           | 值，对应 RadioGroup 的值，判断是否选中                                   |

### `<RadioGroup>`

| 属性名称     | 类型`(默认值)`                | 描述               |
| ------------ | ----------------------------- | ------------------ |
| appearance   | 'default' &#124; 'picker'     | 设置外观           |
| defaultValue | string                        | 默认值             |
| inline       | boolean                       | 内联布局           |
| name         | string                        | 用于表单对应的名称 |
| onChange     | (value:string, event) => void | 值改变后的回调函数 |
| value        | string                        | 值(受控)           |

<!--{include:(_common/types/color.md)}-->
