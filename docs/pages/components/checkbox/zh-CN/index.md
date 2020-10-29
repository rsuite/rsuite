# Checkbox 复选框

复选框在表单中通常成组使用。允许用户从一组中选择一个或者多个值。

## 获取组件

<!--{include:(components/checkbox/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### Indeterminate 状态

`indeterminate` 该状态主要在全选或者树形结构 Checkbox 上使用。

<!--{include:`indeterminate.md`}-->

### 复选框分组

<!--{include:`checkbox-group.md`}-->

### 复选框组水平布局

<!--{include:`checkbox-groupinline.md`}-->

### 受控的复选框组

<!--{include:`checkbox-group-controller.md`}-->

## 无障碍设计

WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox

- 选中后，`Checkbox` 将 `aria-checked` 设置为 `true`。
- 如果未选中，则 `Checkbox` 的 `aria-checked` 设置为 `false`。
- 如果部分选中，则 `Checkbox` 的 `aria-checked` 设置为 `mixed`。
- 如果设置了 `children`, 则会和 `Checkbox` 一起包裹在 `<label>` 中。

## Props

```ts
type ValueType = string | number;
```

### `<Checkbox>`

| 属性名称       | 类型 `(默认值)`                                     | 描述                                         |
| -------------- | --------------------------------------------------- | -------------------------------------------- |
| checked        | boolean                                             | 被选择（受控）                               |
| defaultChecked | boolean                                             | 默认被选择                                   |
| disabled       | boolean                                             | 禁用                                         |
| id             | ElementType                                         | 为组件自定义元素类型                         |
| indeterminate  | boolean                                             | 作为一个全选框时，子项部分被选择后的样式设置 |
| inline         | boolean                                             | 内联布局                                     |
| inputRef       | Ref                                                 | HTML input 元素                              |
| name           | string                                              | 用于表单对应的名称                           |
| onChange       | (value: ValueType, checked: boolean, event) => void | checked 状态发生改变的回调函数               |
| title          | string                                              | HTML title                                   |
| value          | ValueType                                           | 值，对应 CheckboxGroup 的值，判断是否选中    |

### `<CheckboxGroup>`

| 性名称       | 类型 `(默认值)`                    | 描述               |
| ------------ | ---------------------------------- | ------------------ |
| defaultValue | ValueType[]                        | 默认值             |
| inline       | boolean                            | 内联布局           |
| name         | string                             | 用于表单对应的名称 |
| onChange     | (value:ValueType[], event) => void | 值改变后的回调函数 |
| value        | ValueType[]                        | 值(受控)           |
