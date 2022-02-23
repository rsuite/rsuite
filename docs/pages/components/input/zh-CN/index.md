# Input 输入框

代替 HTML 原生控件，input、textarea。

- `<Input>` 输入框组件
- `<InputGroup>` 输入框组合组件
- `<InputGroup.Button>` 与按钮组合
- `<InputGroup.Addon>` 自定义附加元素
- `<MaskedInput>` 带掩码的输入框组件

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

### 带掩码的输入框组件

MaskedInput 是一个输入掩码组件。 它可以为电话、日期、货币、邮政编码、百分比、电子邮件和几乎任何东西创建输入掩码。

<!--{include:`masked-input.md`}-->

## Props

### `<Input>`

| 属性名称     | 类型 `(默认值)`                                   | 描述                     |
| ------------ | ------------------------------------------------- | ------------------------ |
| classPrefix  | string `('input')`                                | 组件 CSS 类的前缀        |
| defaultValue | string                                            | 设置默认值               |
| disabled     | boolean                                           | 禁用                     |
| onChange     | (value: string, event) => void                    | value 发生变化的回调函数 |
| size         | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')` | 设置输入框尺寸           |
| type         | string `('text' )`                                | HTML input type.         |
| value        | string                                            | 设置值 `受控`            |

### `<InputGroup>`

| 属性名称    | 类型 `(默认值)`                                   | 描述              |
| ----------- | ------------------------------------------------- | ----------------- |
| classPrefix | string `('input-group')`                          | 组件 CSS 类的前缀 |
| inside      | boolean                                           | 组合内容在内部    |
| size        | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')` | 设置输入框组尺寸  |

### `<MaskedInput>`

`MaskedInput` 继承了 `Input` 的所有属性，但是没有 `type` 属性。

| 属性名称          | 类型 `(默认值)`       | 描述                                               |
| ----------------- | --------------------- | -------------------------------------------------- |
| mask (\*)         | array &#124; function | 用于定义如何阻止用户输入。                         |
| guide             | boolean               | 在引导模式或无引导模式                             |
| placeholderChar   | string `('_')`        | 占位符代表遮罩中的可填充点                         |
| keepCharPositions | boolean `(false)`     | 当为 true 时，添加或删除字符不会影响现有字符的位置 |
| showMask          | boolean               | 在输入值为空时将掩码显示为占位符而不是常规占位符   |
