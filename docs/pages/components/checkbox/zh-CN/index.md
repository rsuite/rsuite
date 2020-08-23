# Checkbox 复选框

复选框在表单中通常成组使用。允许用户从一组中选择一个或者多个值。

## 获取组件

```js
import { Checkbox, CheckboxGroup } from 'rsuite';

//or
import Checkbox from 'rsuite/lib/Checkbox';
import CheckboxGroup from 'rsuite/lib/CheckboxGroup';
```

## 演示

<!--{demo}-->

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
