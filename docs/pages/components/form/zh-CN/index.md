# Form 表单

一组处理表单数据的组件和模型。

- `<Form>` 定义一个表单。
- `<Form.Group>` 表单控件组，用于表单控件布局。
- `<Form.Control>` 表单控件，定义一个表单字段。
- `<Form.ControlLabel>` 表单控件对应的标题。
- `<Form.HelpText>` 表单控件对应帮助信息。

## 获取组件

<!--{include:(components/form/fragments/import.md)}-->

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

## 数据校验

---

### 默认校验

在表单触发了 `submit` 事件后，会自动触发数据检查。

<!--{include:`form-check-default.md`}-->

### 数据模型

表单校验需要用到 `<Form>`, `<Form.Control>` 组件， 和 `Schema.Model` 。

- `<Form>` 定义一个表单，可以给表单设置 `value` 和 `model`，`model` 是由 `Schema.Model` 创建的数据模型。
- `<Form.Control>` 定义一个 Filed，通过 `name` 属性和 `Schema.Model` 对象的 `key` 对应, 详细参考： 自定义表单组件。
- `Schema.Model` 定义一个数据模型，详细使用参考 [schema](/components/schema)。
- 自定义触发校验： `<Form>` 实例提供 [check()](#methods) 与 [checkForField()](#methods) 方法，分别用于触发表单校验和字段校验。

<!--{include:`form-check.md`}-->

### 异步校验

在某些条件下，我们需对数据进行异步校验，比如校验用户名是否重名，下面一个示例将说明异步校验的处理。

- 在需要异步校验的 `<Form.Control>` 上设置 `checkAsync` 属性。
- 异步校验的验证规则通过 `schema` 的 `addRule` 方法添加一个返回值为 Promise 的对象。
- 通过调用 `<Form>` 的 `checkAsync` 与 `checkForFieldAsync` 的访问，可以手动触发校验。

<!--{include:`form-check-async.md`}-->

### 自定义表单组件

所有的 Data Entry 相关的组件都可以在表单中使用，例如 `Checkbox`,`SelectPicker`,`Slider` 等等。 但是需要通过 `Form.Control` 组件进行数据管理，实现与 `Form` 组件的数据关联。

- Form.Control 用于绑定 Form 中的数据字段，通过 `name` 属性和 Schema.Model 对象的 `key` 对应。
- Form.Control 默认是个 `Input` 组件，可以通过 `accepter` 设置需要的数据录入组件。

<!--{include:`custom-form-control.md`}-->

### 兼容第三方组件

以 [text-mask](https://github.com/text-mask/text-mask) 为例：

<!--{include:`custom-third-party-libraries.md`}-->

### 自定义触发校验

在某些情况下不需要对表单数据进行实时校验，可以自定义控制校验的方式，配置 `checkTrigger` 参数。

`checkTrigger` 默认值是 `'change'`， 选项包括：

- `'change'` : 数据改变 `onChange` 的时候会触发数据校验。
- `'blur'` : 组件失去焦点触发校验
- `'none'` : 不触发校验，只会在调用 `<Form>` 的 `check()` 方法的时候才会校验

在 `<Form>` 和 `<Form.Control>` 组件上都有 `checkTrigger` 属性， 在 `<Form>` 中可以定义整个表单的校验方式，如果有个表单组件需要单独处理校验方式，可以在 `<Form.Control>` 上进行设置。

<!--{include:`custom-check-trigger.md`}-->

## 无障碍设计

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

- 在 Form 内点击 `type='submit'` 的按钮，会自动触发表单的 submit 事件。

## Props

### `<Form>`

| 名称             | 类型 `(默认值)`                                         | 描述                                               |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------- |
| checkTrigger     | enum: 'change','blur','none' `('change')`               | 触发表单校验的类型                                 |
| classPrefix      | string `('form')`                                       | 组件 CSS 类的前缀                                  |
| errorFromContext | boolean `(true)`                                        | Form.Control 中的错误提醒默认从 Context 获取       |
| fluid            | boolean                                                 | 让表单中的 Input 100% 撑满容器，只在垂直布局中有效 |
| formDefaultValue | object                                                  | 表单的初始默认值 `非受控组件`                      |
| formError        | object                                                  | 表单错误信息                                       |
| formValue        | object                                                  | 表单的值 `受控组件`                                |
| layout           | enum: 'horizontal', 'vertical', 'inline' `('vertical')` | 设置表单内的元素左右两栏布局                       |
| model            | Schema                                                  | SchemaModel 对象                                   |
| onChange         | (formValue:object, event:object) => void                | 数据改变后的回调函数                               |
| onCheck          | (formError:object) => void                              | 数据校验的回调函数                                 |
| onError          | (formError:object) => void                              | 校验出错的回调函数                                 |

### Form methods

- check 检验表单数据

```js
check: (callback?: (formError: E) => void) => boolean;
```

- checkAsync 异步检验表单数据

```js
checkAsync: () => Promise<any>;
```

- checkForField 校验表单单个字段值

```js
checkForField: (
    fieldName: keyof T,
    callback?: (checkResult: CheckResult<errorMsg>) => void
  ) => boolean;
```

- checkForFieldAsync 异步校验表单单个字段值

```js
checkForFieldAsync: (fieldName: keyof T) => Promise<CheckResult>;
```

- cleanErrors 清除错误信息

```js
cleanErrors(callback: () => void) => void
```

- cleanErrorForField 清除单个字段错误信息

```js
cleanErrorForField: (fieldName: keyof E, callback?: () => void) => void;
```

### `<Form.Control>`

| 名称           | 类型`(默认值)`                    | 描述                                       |
| -------------- | --------------------------------- | ------------------------------------------ |
| accepter       | ElementType `(Input)`             | 受代理的组件                               |
| checkTrigger   | enum: 'change','blur','none'      | 数据校验的触发类型,会覆盖 `<Form>`上的设置 |
| classPrefix    | string `('form-control')`         | 组件 CSS 类的前缀                          |
| errorMessage   | ReactNode                         | 显示错误信息                               |
| errorPlacement | enum: Placement `('bottomStart')` | 错误信息显示位置                           |
| name \*        | string                            | 表单元素名称                               |
| readOnly       | boolean                           | 使控件为只读                               |
| plaintext      | boolean                           | 使控件为纯文本                             |

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

```js
type Placement =
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'rightStart'
  | 'leftEnd'
  | 'rightEnd';
```
