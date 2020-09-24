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

### 禁用

设置 `disabled` 属性，组件则处于禁用状态

<!--{include:`disabled.md`}-->

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
