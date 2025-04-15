# Input 输入框

用于接收和展示用户的单行文本输入。

## 获取组件

<!--{include:<import-guide>}-->

- `<Input>` 输入框组件。
- `<InputGroup>` 输入框组合组件。
- `<InputGroup.Button>` 与按钮组合。
- `<InputGroup.Addon>` 自定义附加元素。
- `<MaskedInput>` 带掩码的输入框组件。

## 演示

### 默认

<!--{include:`basic.md`}-->

### 尺寸

<!--{include:`size.md`}-->

如果你想使用原生 DOM 的 size 属性，你可以使用 `htmlSize` 属性。
为了使其按预期工作，您还需要提供 `style={{ width: 'auto' }}` 属性。

```jsx
<Input htmlSize={10} style={{ width: 'auto' }} />
```

### 禁用与只读

<!--{include:`disabled.md`}-->

### 输入框组合

<!--{include:`input-group.md`}-->

### Inside

<!--{include:`input-group-inside.md`}-->

### 与按钮组合

<!--{include:`input-group-button.md`}-->

### 搜索框

<!--{include:`input-group-search.md`}-->

### 带加载状态

<!--{include:`input-group-loader.md`}-->

### 带下拉菜单

<!--{include:`input-group-dropdown.md`}-->

### 帮助提示

<!--{include:`tooltip.md`}-->

### 带掩码的输入框组件

MaskedInput 是一个输入掩码组件。 它可以为电话、日期、货币、邮政编码、百分比、电子邮件和几乎任何东西创建输入掩码。

<!--{include:`masked-input.md`}-->

## Props

### `<Input>`

| 属性名称     | 类型 `(默认值)`                       | 描述                                   |
| ------------ | ------------------------------------- | -------------------------------------- |
| as           | ElementType `('input')`               | 为组件自定义元素类型                   |
| classPrefix  | string `('input')`                    | 组件 CSS 类的前缀                      |
| defaultValue | string                                | 默认值（非受控）                       |
| disabled     | boolean                               | 禁用状态                               |
| htmlSize     | number                                | 设置原生 input 的 size 属性            |
| id           | string                                | HTML input 的 id                       |
| inputRef     | Ref                                   | 指向 input 元素的 ref                  |
| onChange     | (value: string, event) => void        | value 发生变化的回调函数               |
| plaintext    | boolean                               | 以纯文本形式呈现，当值为空时显示占位符 |
| readOnly     | boolean                               | 只读状态                               |
| size         | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | 设置输入框尺寸                         |
| type         | string `('text')`                     | HTML input 类型                        |
| value        | string                                | 当前值（受控）                         |

### `<InputGroup>`

| 属性名称    | 类型 `(默认值)`                       | 描述                 |
| ----------- | ------------------------------------- | -------------------- |
| as          | ElementType `('div')`                 | 为组件自定义元素类型 |
| classPrefix | string `('input-group')`              | 组件 CSS 类的前缀    |
| disabled    | boolean                               | 禁用状态             |
| inside      | boolean                               | 组合内容在内部       |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | 设置输入框组尺寸     |

### `<InputGroup.Button>`

| 属性名称    | 类型 `(默认值)`              | 描述                               |
| ----------- | ---------------------------- | ---------------------------------- |
| classPrefix | string `('input-group-btn')` | 组件 CSS 类的前缀                  |
| ...         | [ButtonProps][ButtonProps]   | 继承所有来自 `<Button>` 组件的属性 |

[ButtonProps]: /zh/components/button/#props

### `<InputGroup.Addon>`

| 属性名称    | 类型 `(默认值)`                | 描述                 |
| ----------- | ------------------------------ | -------------------- |
| as          | ElementType `('span')`         | 为组件自定义元素类型 |
| classPrefix | string `('input-group-addon')` | 组件 CSS 类的前缀    |

### `<MaskedInput>`

| 属性名称          | 类型 `(默认值)`          | 描述                                                  |
| ----------------- | ------------------------ | ----------------------------------------------------- |
| guide             | boolean                  | 在引导模式或无引导模式                                |
| keepCharPositions | boolean `(false)`        | 当为 true 时，添加或删除字符不会影响现有字符的位置    |
| mask (\*)         | array \| function        | 用于定义如何阻止用户输入。                            |
| placeholderChar   | string `('_')`           | 占位符代表遮罩中的可填充点                            |
| showMask          | boolean                  | 在输入值为空时将掩码显示为占位符而不是常规占位符      |
| ...               | [InputProps][InputProps] | 继承所有来自 `<Input>` 组件的属性, 不包括 `type` 属性 |

[InputProps]: /zh/components/input/#props
