# Form 表单

一组处理表单数据的组件和模型。

## 获取组件

<!--{include:<import-guide>}-->

- `<Form>` 定义一个表单。
- `<Form.Group>` 表单控件组，用于表单控件布局。
- `<Form.Control>` 表单控件，定义一个表单字段。
- `<Form.ControlLabel>` 表单控件对应的标题。
- `<Form.HelpText>` 表单控件对应帮助信息。
- `<Form.ErrorMessage>` 表单控件对应的错误提示信息。

## 布局

---

### 默认

默认为垂直布局

<!--{include:`basic.md`}-->

### 撑满容器

`fluid` 属性可以让表单中的 Input 100% 撑满容器，只在垂直布局中有效。

<!--{include:`fluid.md`}-->

### 水平排列布局

<!--{include:`horizontal.md`}-->

### 行内排列布局

<!--{include:`inline.md`}-->

### 模态框中布局

<!--{include:`modal-layout.md`}-->

## 状态

---

### 帮助说明

`<Form.HelpText>` 可以在表单组件下面定义一个帮助说明信息，如果设置 `tooltip` 属性，就会在表单组件显示一个图标，以 `<Tooltip>` 的方式显示帮助说明信息。

<!--{include:`help-block.md`}-->

### 错误消息

错误消息提醒可以通过 2 种方式设定：

- `<Form.Control>` 组件上传递一个 `errorMessage` 属性设置错误信息，通过 `errorPlacement`设置错误信息显示的位置 。
- 自定义一个提示信息。

<!--{include:`error-message.md`}-->

### 禁用与只读

<!--{include:`status.md`}-->

## 可访问性

### ARIA 属性

- 您应该为每个表单设置 `aria-label` 或 `aria-labelledby` 属性，以便屏幕阅读器可以正确地读取表单的目的。
- 通过 `<Form.Group>` 的 `controlId` 属性，可以在 `<Form.Control>` 上设置 `id` 同时在 `<Form.ControlLabel>` 上设置 `htmlFor`。另外会为 `<Form.Control>` 生成`aria-labelledby` 和 `aria- describeby`， 对应到 `<Form.ControlLabel>` 与 `<Form.HelpText>` 的 `id`。

```html
<Form.Group controlId="name">
  <Form.ControlLabel>Username</Form.ControlLabel>
  <Form.Control />
  <Form.HelpText>Username is required</Form.HelpText>
</Form.Group>
```

生成为:

```html
<div class="rs-form-group" role="group">
  <label id="name-control-label" for="name" class="rs-form-control-label">Username</label>
  <div class="rs-form-control rs-form-control-wrapper">
    <input
      id="name"
      class="rs-input"
      aria-labelledby="name-control-label"
      aria-describedby="name-help-text"
    />
  </div>
  <span id="name-help-text" class="rs-form-help-text">Username is required</span>
</div>
```

### 必需的 JavaScript 功能

- 在 Form 内点击 `type='submit'` 的按钮，会自动触发表单的 submit 事件。

## Props

### `<Form>`

| 名称             | 类型 `(默认值)`                                       | 描述                                               |
| ---------------- | ----------------------------------------------------- | -------------------------------------------------- |
| checkTrigger     | 'change' \| 'blur' \| 'none' `('change')`             | 触发表单校验的类型                                 |
| classPrefix      | string `('form')`                                     | 组件 CSS 类的前缀                                  |
| disabled         | boolean `(false)`                                     | 禁用表单                                           |
| errorFromContext | boolean `(true)`                                      | Form.Control 中的错误提醒默认从 Context 获取       |
| fluid            | boolean                                               | 让表单中的 Input 100% 撑满容器，只在垂直布局中有效 |
| formDefaultValue | object                                                | 表单的初始默认值 `非受控组件`                      |
| formError        | object                                                | 表单错误信息                                       |
| formValue        | object                                                | 表单的值 `受控组件`                                |
| layout           | 'horizontal' \| 'vertical' \| 'inline' `('vertical')` | 设置表单内的元素左右两栏布局                       |
| model            | Schema                                                | SchemaModel 实例对象                               |
| nestedField      | boolean `(false)`                                     | 是否支持表单数据嵌套                               |
| onChange         | (formValue: object, event) => void                    | 数据改变后的回调函数                               |
| onCheck          | (formError: object) => void                           | 数据校验的回调函数                                 |
| onError          | (formError: object) => void                           | 校验出错的回调函数                                 |
| onReset          | (formValue: object, event?: FormEvent) => void        | 表单重置的回调函数                                 |
| onSubmit         | (formValue: object, event?: FormEvent) => void        | 表单提交的回调函数, 前提是表单数据校验通过后触发   |
| plaintext        | boolean `(false)`                                     | 表单显示为纯文本                                   |
| readOnly         | boolean `(false)`                                     | 只读表单                                           |

### `<Form.Control>`

| 名称                   | 类型`(默认值)`                                        | 描述                                                                                                                        |
| ---------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| accepter               | ElementType `(Input)`                                 | 受代理的组件。                                                                                                              |
| checkAsync             | boolean                                               | 异步数据校验。                                                                                                              |
| checkTrigger           | 'change' \| 'blur' \| 'none'                          | 数据校验的触发类型,会覆盖 `<Form>`上的设置。                                                                                |
| classPrefix            | string `('form-control')`                             | 组件 CSS 类的前缀。                                                                                                         |
| errorMessage           | ReactNode                                             | 显示错误信息。                                                                                                              |
| errorPlacement         | [Placement](#code-ts-placement-code)`('bottomStart')` | 错误信息显示位置。                                                                                                          |
| name \*                | string                                                | 表单控件的名称，支持嵌套路径。例如 `address.city`，该路径将用于获取和设置表单值。                                           |
| plaintext              | boolean                                               | 使控件为纯文本。                                                                                                            |
| readOnly               | boolean                                               | 使控件为只读。                                                                                                              |
| rule                   | checkType                                             | 当前字段的校验规则，如果与`<Form>`的`model`冲突，以当前为准，[示例](/zh/components/form-validation/#field-级别的校验规则)。 |
| shouldResetWithUnmount | boolean`('false')`                                    | 卸载组件时删除字段值和错误消息。                                                                                            |

### `<Form.Group>`

| 属性名称    | 类型`(默认值)`          | 描述                                                                        |
| ----------- | ----------------------- | --------------------------------------------------------------------------- |
| classPrefix | string `('form-group')` | 组件 CSS 类的前缀                                                           |
| controlId   | string                  | 在 `<Form.Control>`上设置 `id`，在 `<Form.ControlLabel>` 上设置 `htmlFor`。 |

### `<Form.ControlLabel>`

| 属性名称    | 类型`(默认值)`                  | 描述                                                            |
| ----------- | ------------------------------- | --------------------------------------------------------------- |
| classPrefix | string `('form-control-label')` | 组件 CSS 类的前缀                                               |
| htmlFor     | string                          | 对应 html label 标签的 for 属性，默认为 Form.Group 的 controlId |

### `<Form.HelpText>`

| 属性名称    | 类型`(默认值)`              | 描述                                                            |
| ----------- | --------------------------- | --------------------------------------------------------------- |
| classPrefix | string `('form-help-text')` | 组件 CSS 类的前缀                                               |
| htmlFor     | string                      | 对应 html label 标签的 for 属性，默认为 Form.Group 的 controlId |
| tooltip     | boolean                     | 是否通过 Tooltip 组件显示                                       |

### `<Form.ErrorMessage>`

| 属性名称    | 类型`(默认值)`                                        | 描述              |
| ----------- | ----------------------------------------------------- | ----------------- |
| classPrefix | string `('form-error-message')`                       | 组件 CSS 类的前缀 |
| placement   | [Placement](#code-ts-placement-code)`('bottomStart')` | 错误信息显示位置  |
| show        | boolean                                               | 是否显示错误信息  |

<!--{include:(_common/types/placement8.md)}-->
