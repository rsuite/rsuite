# Checkbox 复选框

复选框在表单中通常成组使用。允许用户从一组中选择一个或者多个值。

## 获取组件

<!--{include:<import-guide>}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 不确定状态

使用 `indeterminate` 属性可以将 Checkbox 设置为不确定状态，主要用在全选或者树形结构 Checkbox 上。

<!--{include:`indeterminate.md`}-->

### 颜色

<!--{include:`colors.md`}-->

### 复选框分组

<!--{include:`checkbox-group.md`}-->

### 复选框组水平布局

<!--{include:`checkbox-groupinline.md`}-->

### 受控的复选框组

<!--{include:`checkbox-group-controlled.md`}-->

## 可访问性

### ARIA 属性

- 复选框组的 `role` 属性为 `group`。
- 每一个复选框的 `role` 属性为 `checkbox`。
- 如果复选框禁用，则将 `aria-disabled` 设置为 `true`。
- 如果复选框选中，则将 `aria-checked` 设置为 `true`，否则设置为 `false`。
- 当部分选中时，`aria-checked` 设置为 mixed。
- 由 `aria-labelledby` 引用的可见标签设置在具有 `role` 为 `checkbox` 的元素上。

### 键盘交互

- 当复选框获得焦点时，按下 <kbd>Space</kbd> 键改变复选框的状态。

## Props

```ts
type ValueType = string | number;
```

### `<Checkbox>`

| 属性名称       | 类型 `(默认值)`                                            | 描述                                         |
| -------------- | ---------------------------------------------------------- | -------------------------------------------- |
| as             | ElementType`(div)`                                         | 为组件自定义元素类型                         |
| checked        | boolean                                                    | 被选择（受控）                               |
| color          | [Color](#code-ts-color-code)                               | 选中或不确定状态时的颜色 <br/>![][5.56.0]    |
| defaultChecked | boolean                                                    | 默认被选择                                   |
| disabled       | boolean                                                    | 禁用                                         |
| indeterminate  | boolean                                                    | 作为一个全选框时，子项部分被选择后的样式设置 |
| inputRef       | Ref                                                        | HTML input 元素                              |
| name           | string                                                     | 用于表单对应的名称                           |
| onChange       | (value: string \| number, checked: boolean, event) => void | checked 状态发生改变的回调函数               |
| title          | string                                                     | HTML title                                   |
| value          | string \| number                                           | 值，对应 CheckboxGroup 的值，判断是否选中    |

### `<CheckboxGroup>`

| 属性名称     | 类型 `(默认值)`                             | 描述               |
| ------------ | ------------------------------------------- | ------------------ |
| defaultValue | string[] \| number[]                        | 默认值（非受控）   |
| inline       | boolean                                     | 内联布局           |
| name         | string                                      | 用于表单对应的名称 |
| onChange     | (value:string[] \| number[], event) => void | 值改变后的回调函数 |
| value        | string[] \| number[]                        | 当前值(受控)       |

<!--{include:(_common/types/color.md)}-->

[5.56.0]: https://img.shields.io/badge/>=-v5.56.0-blue
