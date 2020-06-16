# Radio 单选框

常用的单选框。 如果选项只有两个的情况下，也可以使用 Toggle 组件。

- `<Radio>`
- `<RadioGroup>`

## 获取组件

```js
import { Radio, RadioGroup } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Radio>`

| 属性名称       | 类型                                                               | 描述                                   |
| -------------- | ------------------------------------------------------------------ | -------------------------------------- |
| checked        | boolean                                                            | 被选中（受控）                         |
| defaultChecked | boolean                                                            | 默认被选中                             |
| disabled       | boolean                                                            | 禁用                                   |
| inline         | boolean                                                            | 内联布局                               |
| inputRef       | React.Ref                                                          | 对应 input 元素的 ref                  |
| name           | string                                                             | 用于表单对应的名称                     |
| onChange       | (value: any, checked: boolean, event: SyntheticInputEvent) => void | checked 状态发生改变的回调函数         |
| title          | string                                                             | HTML title                             |
| value          | any                                                                | 值，对应 RadioGroup 的值，判断是否选中 |

### `<RadioGroup>`

| 性名称       | 类型`(默认值)`                                 | 描述               |
| ------------ | ---------------------------------------------- | ------------------ |
| appearance   | enum: 'default', 'picker'                      | 设置外观           |
| defaultValue | any                                            | 默认值             |
| inline       | boolean                                        | 内联布局           |
| name         | string                                         | 用于表单对应的名称 |
| onChange     | (value:any, event:SyntheticInputEvent) => void | 值改变后的回调函数 |
| value        | any                                            | 值(受控)           |
