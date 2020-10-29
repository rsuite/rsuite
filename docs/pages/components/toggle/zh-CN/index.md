# Toggle 开关

开关选择器，用于两个值之间的选择。

## 获取组件

<!--{include:(components/toggle/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 开关尺寸

`size` 属性设置开关尺寸, 值包括: `lg`、`md`、`sm`

<!--{include:`size.md`}-->

### 文字和图标

可以通过 `checkedChildren`,`unCheckedChildren` 两个属性分别设置开关两种状态下显示的内容

<!--{include:`inner.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

## 无障碍设计

- `Toggle` 具有 `switch` role 。
- 当处于 `on` 状态时，`Toggle` 将 `aria-checked` 设置为 `true`。
- 当处于 `off` 状态时，`Toggle` 将 `aria-checked` 设置为 `false`。
- 所有表单控件都应该带有标签，在表单中可以通过[`Form.ControlLabel`](./form#Accessibility)实现。如果你需要独立使用则需要直接添加属性 (`arial-label`,`aria-labelledby`)。

```js
<Toggle arial-label="Switch" />
```

## Props

### `<Toggle>`

| 属性名称          | 类型 `(默认值)`                    | 描述                 |
| ----------------- | ---------------------------------- | -------------------- |
| checked           | boolean                            | 指定当前是否选中     |
| checkedChildren   | ReactNode                          | 选中显示的内容       |
| classPrefix       | string `('toggle')`                | 组件 CSS 类的前缀    |
| defaultChecked    | boolean                            | 初始是否选中         |
| disabled          | boolean                            | 禁用                 |
| onChange          | (checked: boolean, event) => void  | 状态改变时的回调函数 |
| size              | enum: 'lg' &#124; 'md' &#124; 'sm' | 开关尺寸             |
| unCheckedChildren | ReactNode                          | 非选中显示的内容     |
