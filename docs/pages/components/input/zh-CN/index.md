# Input 输入框

代替 HTML 原生控件，input、textarea。

- `<Input>` 输入框组件
- `<InputGroup>` 输入框组合组件
- `<InputGroup.Button>` 与按钮组合
- `<InputGroup.Addon>` 自定义附加元素

## 获取组件

<!--{include:(components/input/fragments/import.md)}-->

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

### Textarea

<!--{include:`textarea.md`}-->

### 禁用与只读

<!--{include:`disabled.md`}-->

### 输入框组合

<!--{include:`input-group.md`}-->

### Inside

<!--{include:`input-group-inside.md`}-->

### 与按钮组合

<!--{include:`input-group-button.md`}-->

### 密码框

<!--{include:`input-group-password.md`}-->

### 帮助提示

<!--{include:`tooltip.md`}-->

## Props

### `<Input>`

| 属性名称     | 类型 `(默认值)`                       | 描述                     |
| ------------ | ------------------------------------- | ------------------------ |
| classPrefix  | string `('input')`                    | 组件 CSS 类的前缀        |
| defaultValue | string                                | 设置默认值               |
| disabled     | boolean                               | 禁用                     |
| onChange     | (value: string, event) => void        | value 发生变化的回调函数 |
| size         | enum: 'lg', 'md', 'sm', 'xs' `('md')` | 设置输入框尺寸           |
| type         | string `('text' )`                    | HTML input type.         |
| value        | string                                | 设置值 `受控`            |

### `<InputGroup>`

| 属性名称    | 类型 `(默认值)`                       | 描述              |
| ----------- | ------------------------------------- | ----------------- |
| classPrefix | string `('input-group')`              | 组件 CSS 类的前缀 |
| inside      | boolean                               | 组合内容在内部    |
| size        | enum: 'lg', 'md', 'sm', 'xs' `('md')` | 设置输入框组尺寸  |
