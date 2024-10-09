# RadioTile 磁贴单选

一系列可选的磁贴组件，其行为类似于 Radio。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 水平横向布局

<!--{include:`inline.md`}-->

### 禁用

<!--{include:`disabled.md`}-->

### 无障碍设计

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton

- 选中 `RadioTile` 时将 `aria-checked` 设置为 `true`。 否则，将 `aria-checked` 设置为 `false`。

## Props

### `<RadioTile>`

| Property       | Type `(Default)`                             | Description                            |
| -------------- | -------------------------------------------- | -------------------------------------- |
| checked        | boolean                                      | 被选中（受控）                         |
| defaultChecked | boolean                                      | 默认被选中                             |
| disabled       | boolean                                      | 禁用                                   |
| name           | string                                       | 用于表单对应的名称                     |
| onChange       | (value: string &#124; number, event) => void | checked 状态发生改变的回调函数         |
| value          | string &#124; number                         | 对应 RadioTileGroup 的值，判断是否选中 |

### `<RadioTileGroup>`

| Property     | Type `(Default)`                            | Description        |
| ------------ | ------------------------------------------- | ------------------ |
| defaultValue | string &#124; number                        | 默认值（非受控）   |
| disabled     | boolean                                     | 禁用               |
| inline       | boolean                                     | 水平布局           |
| name         | string                                      | 用于表单对应的名称 |
| onChange     | (value:string &#124; number, event) => void | 值改变后的回调     |
| value        | string &#124; number                        | 当前值(受控)       |
