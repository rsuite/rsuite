# Checkbox 多选框

常用的多选框。

- `<Checkbox>`
- `<CheckboxGroup>`

## 获取组件

```js
import { Checkbox, CheckboxGroup } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Checkbox>`

| 属性名称       | 类型 `(默认值)`                                                    | 描述                                         |
| -------------- | ------------------------------------------------------------------ | -------------------------------------------- |
| checked        | boolean                                                            | 被选择（受控）                               |
| defaultChecked | boolean                                                            | 默认被选择                                   |
| disabled       | boolean                                                            | 禁用                                         |
| id             | React.ElementType                                                  | 为组件自定义元素类型                         |
| indeterminate  | boolean                                                            | 作为一个全选框时，子项部分被选择后的样式设置 |
| inline         | boolean                                                            | 内联布局                                     |
| inputRef       | React.Ref                                                          | 对应 input 元素的 ref                        |
| name           | string                                                             | 用于表单对应的名称                           |
| onChange       | (value: any, checked: boolean, event: SyntheticInputEvent) => void | checked 状态发生改变的回调函数               |
| title          | string                                                             | HTML title                                   |
| value          | any                                                                | 值，对应 CheckboxGroup 的值，判断是否选中    |

### `<CheckboxGroup>`

| 性名称       | 类型 `(默认值)`           | 描述               |
| ------------ | ------------------------- | ------------------ |
| defaultValue | Array                     | 默认值             |
| inline       | boolean                   | 内联布局           |
| name         | string                    | 用于表单对应的名称 |
| onChange     | (value:any,event) => void | 值改变后的回调函数 |
| value        | Array                     | 值(受控)           |
