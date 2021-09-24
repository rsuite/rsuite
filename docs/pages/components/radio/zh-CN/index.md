# Radio 单选框

允许用户从一组中选择一个选项。

## 获取组件

<!--{include:(components/radio/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### Radio 组

<!--{include:`radio-group.md`}-->

### Radio 组 - 横向布局

<!--{include:`radio-group-inline.md`}-->

### Radio 组 - Picker

<!--{include:`radio-group-inline-picker.md`}-->

### 受控的 Radio 组

<!--{include:`radio-group-controller.md`}-->

### 无障碍设计

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton

- 选中 `Radio` 时将 `aria-checked` 设置为 `true`。 否则，将 `aria-checked` 设置为 `false`。

## Props

### `<Radio>`

| 属性名称       | 类型                                             | 描述                                   |
| -------------- | ------------------------------------------------ | -------------------------------------- |
| checked        | boolean                                          | 被选中（受控）                         |
| defaultChecked | boolean                                          | 默认被选中                             |
| disabled       | boolean                                          | 禁用                                   |
| inline         | boolean                                          | 内联布局                               |
| inputProps     | object                                           | 设置 input 元素的属性                  |
| inputRef       | ref                                              | 将 ref 传递给 input 元素               |
| name           | string                                           | 用于表单对应的名称                     |
| onChange       | (value: string, checked: boolean, event) => void | checked 状态发生改变的回调函数         |
| title          | string                                           | HTML title                             |
| value          | string                                           | 值，对应 RadioGroup 的值，判断是否选中 |

### `<RadioGroup>`

| 性名称       | 类型`(默认值)`                | 描述               |
| ------------ | ----------------------------- | ------------------ |
| appearance   | enum: 'default', 'picker'     | 设置外观           |
| defaultValue | string                        | 默认值             |
| inline       | boolean                       | 内联布局           |
| name         | string                        | 用于表单对应的名称 |
| onChange     | (value:string, event) => void | 值改变后的回调函数 |
| value        | string                        | 值(受控)           |
