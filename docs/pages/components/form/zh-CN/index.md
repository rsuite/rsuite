# Form 表单

一组处理表单数据的组件和模型。

## 获取组件

<!--{include:<import-guide>}-->

- **基础组件**:
  - `Form` 用于定义支持数据校验的表单。
  - `Form.Label` 表单字段对应的标题。
  - `Form.Control` 定义表单字段的控件。默认为 `Input` 组件。 可以通过 `accepter` 属性自定义组件。
- **布局相关组件**:
  - `Form.Stack` 用于布局一组表单控件。
  - `Form.Group` 用于布局单个表单控件。
- **字段状态组件**:
  - `Form.Text` 提供表单字段的帮助信息。
  - `Form.ErrorMessage` 显示表单字段的错误提示信息。

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

`<Form.Text>` 可以在表单组件下面定义一个帮助说明信息，如果设置 `tooltip` 属性，就会在表单组件显示一个图标，以 `<Tooltip>` 的方式显示帮助说明信息。

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
- 通过 `<Form.Group>` 的 `controlId` 属性，可以在 `<Form.Control>` 上设置 `id` 同时在 `<Form.Label>` 上设置 `htmlFor`。另外会为 `<Form.Control>` 生成`aria-labelledby` 和 `aria-describedby`， 对应到 `<Form.Label>` 与 `<Form.Text>` 的 `id`。

```jsx
<Form.Group controlId="name">
  <Form.Label>Username</Form.Label>
  <Form.Control />
  <Form.Text>Username is required</Form.Text>
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

| 名称             | 类型 `(默认值)`                                       | 描述                                         |
| ---------------- | ----------------------------------------------------- | -------------------------------------------- |
| checkTrigger     | 'change' \| 'blur' \| 'none' `('change')`             | 定义何时触发表单校验                         |
| disabled         | boolean `(false)`                                     | 禁用整个表单                                 |
| errorFromContext | boolean `(true)`                                      | 默认从 Context 获取 Form.Control 的错误提示  |
| fluid            | boolean                                               | 使表单控件在垂直布局中 100% 撑满容器         |
| formDefaultValue | object                                                | 表单的初始默认值（非受控组件）               |
| formError        | object                                                | 表单的错误信息                               |
| formValue        | object                                                | 表单的值（受控组件）                         |
| layout           | 'horizontal' \| 'vertical' \| 'inline' `('vertical')` | 表单布局方式                                 |
| model            | Schema                                                | SchemaModel 实例对象                         |
| nestedField      | boolean `(false)`                                     | 支持表单数据嵌套                             |
| onChange         | (formValue: object, event) => void                    | 数据改变时的回调函数                         |
| onCheck          | (formError: object) => void                           | 数据校验时的回调函数                         |
| onError          | (formError: object) => void                           | 校验出错时的回调函数                         |
| onReset          | (formValue: object, event?: FormEvent) => void        | 表单重置时的回调函数                         |
| onSubmit         | (formValue: object, event?: FormEvent) => void        | 提交表单时的回调函数，仅在数据校验通过后触发 |
| plaintext        | boolean `(false)`                                     | 将表单显示为纯文本                           |
| readOnly         | boolean `(false)`                                     | 将表单设置为只读                             |

### `<Form.Stack>`

| 名称        | 类型`(默认值)`                                        | 描述                                 |
| ----------- | ----------------------------------------------------- | ------------------------------------ |
| classPrefix | string `('form-stack')`                               | 组件的 CSS 类前缀                    |
| fluid       | boolean                                               | 使表单控件在垂直布局中 100% 撑满容器 |
| layout      | 'horizontal' \| 'vertical' \| 'inline' `('vertical')` | 表单布局方式                         |
| spacing     | number                                                | 控件之间的间距                       |

### `<Form.Control>`

| 名称                   | 类型`(默认值)`                                        | 描述                                                                                                                    |
| ---------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| accepter               | ElementType `(Input)`                                 | 被代理的组件                                                                                                            |
| checkAsync             | boolean                                               | 是否进行异步数据校验                                                                                                    |
| checkTrigger           | 'change' \| 'blur' \| 'none'                          | 数据校验触发类型，覆盖 `<Form>` 中的设置                                                                                |
| classPrefix            | string `('form-control')`                             | 组件的 CSS 类前缀                                                                                                       |
| errorMessage           | ReactNode                                             | 显示的错误信息                                                                                                          |
| errorPlacement         | [Placement](#code-ts-placement-code)`('bottomStart')` | 错误信息显示位置                                                                                                        |
| name \*                | string                                                | 控件的名称，支持嵌套路径，如 `address.city`，用于获取和设置表单值                                                       |
| plaintext              | boolean                                               | 将控件设置为纯文本                                                                                                      |
| readOnly               | boolean                                               | 将控件设置为只读                                                                                                        |
| rule                   | checkType                                             | 字段的校验规则，若与 `<Form>` 的 `model` 冲突则以当前为准，[示例](/zh/components/form-validation/#field-级别的校验规则) |
| shouldResetWithUnmount | boolean`('false')`                                    | 卸载组件时是否删除字段值和错误信息                                                                                      |

### `<Form.Group>`

| 属性名称    | 类型`(默认值)`          | 描述                                                                |
| ----------- | ----------------------- | ------------------------------------------------------------------- |
| classPrefix | string `('form-group')` | 组件的 CSS 类前缀                                                   |
| controlId   | string                  | 在 `<Form.Control>` 上设置 `id`，在 `<Form.Label>` 上设置 `htmlFor` |

### `<Form.Label>`

| 属性名称    | 类型`(默认值)`                  | 描述                                                            |
| ----------- | ------------------------------- | --------------------------------------------------------------- |
| classPrefix | string `('form-control-label')` | 组件的 CSS 类前缀                                               |
| htmlFor     | string                          | 对应 HTML label 标签的 for 属性，默认为 Form.Group 的 controlId |

### `<Form.Text>`

| 属性名称    | 类型`(默认值)`              | 描述                                                            |
| ----------- | --------------------------- | --------------------------------------------------------------- |
| classPrefix | string `('form-help-text')` | 组件的 CSS 类前缀                                               |
| htmlFor     | string                      | 对应 HTML label 标签的 for 属性，默认为 Form.Group 的 controlId |
| tooltip     | boolean                     | 是否通过 Tooltip 组件显示                                       |

### `<Form.ErrorMessage>`

| 属性名称    | 类型`(默认值)`                                        | 描述              |
| ----------- | ----------------------------------------------------- | ----------------- |
| classPrefix | string `('form-error-message')`                       | 组件的 CSS 类前缀 |
| placement   | [Placement](#code-ts-placement-code)`('bottomStart')` | 错误信息显示位置  |
| show        | boolean                                               | 是否显示错误信息  |

<!--{include:(_common/types/placement8.md)}-->
