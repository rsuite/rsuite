# 表单校验

我们推荐使用[`schema-typed`](https://github.com/rsuite/schema-typed)对表单数据进行管理和校验。 当表单出现错误数据时候为用户提供的提示信息。

## 使用

**第一步**: 导入 `Form` 与 `Schema`。

```jsx
import Form from 'rsuite/lib/Form';
import Schema from 'rsuite/lib/Schema';
```

**第二步**: 通过 `Schema.Model` 定义数据模型。

```jsx
/** Use Schema to define the data model. */
const model = Schema.Model({
  name: Schema.Types.StringType().isRequired('This field is required.'),
  email: Schema.Types.StringType().isEmail('Please enter a valid email address.')
});
```

> [您可以阅读本指南，以了解有关 Schema 的更多信息](./components/schema)

**第三步**: 为 `<Form>` 设置 `model`。

```jsx
/** Create form fields and design the layout. */
const TextField = ({ name, label, accepter, ...rest }) => (
  <Form.Group controlId={name}>
    <Form.ControlLabel>{label} </Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...rest} />
  </Form.Group>
);

return (
  <Form model={model}>
    <TextField name="name" label="Username" />
    <TextField name="email" label="Email" />

    <Button appearance="primary" type="submit">
      Submit
    </Button>
  </Form>
);
```

## 演示

### 默认校验

在表单触发了 `submit` 事件后，会自动触发数据检查。

<!--{include:`form-check-default.md`}-->

### 数据模型

表单校验需要用到 `<Form>`, `<Form.Control>` 组件， 和 `Schema` 。

- `<Form>` 定义一个表单，可以给表单设置 `formValue` 和 `model`，`model` 是由 `Schema.Model` 创建的数据模型。
- `<Form.Control>` 定义一个 Filed，通过 `name` 属性和 `Schema.Model` 对象的 `key` 对应, 详细参考： 自定义表单组件。
- `Schema.Model` 定义一个数据模型，详细使用参考 [schema](./components/schema)。
- 自定义触发校验： `<Form>` 实例提供 [check()](#methods) 与 [checkForField()](#methods) 方法，分别用于触发表单校验和字段校验。

<!--{include:`form-check.md`}-->

### 异步校验

在某些条件下，我们需对数据进行异步校验，比如校验用户名是否重名，下面一个示例将说明异步校验的处理。

- 在需要异步校验的 `<Form.Control>` 上设置 `checkAsync` 属性。
- 异步校验的验证规则通过 `schema` 的 `addRule` 方法添加一个返回值为 Promise 的对象。
- 通过调用 `<Form>` 的 `checkAsync` 与 `checkForFieldAsync` 的访问，可以手动触发校验。

<!--{include:`form-check-async.md`}-->

### 表单输入组件

所有的 Data Entry 相关的组件都可以在表单中使用。 需要通过 `Form.Control` 组件进行数据管理，实现与 `Form` 组件的数据关联。

- Form.Control 用于绑定 Form 中的数据字段，通过 `name` 属性和 Schema.Model 对象的 `key` 对应。
- Form.Control 默认是个 `Input` 组件，可以通过 `accepter` 设置需要的数据录入组件。

<!--{include:`custom-form-control.md`}-->

### 与第三方 input 库的整合

有时候需要额外开发自定义的表单输入组件或者兼容第三方组件，例如 [react-text-mask](https://github.com/text-mask/text-mask)。

<!--{include:`custom-third-party-libraries.md`}-->

### 自定义触发校验

在某些情况下不需要对表单数据进行实时校验，可以自定义控制校验的方式，配置 `checkTrigger` 参数。

`checkTrigger` 默认值是 `'change'`， 选项包括：

- `'change'` : 数据改变 `onChange` 的时候会触发数据校验。
- `'blur'` : 组件失去焦点触发校验
- `'none'` : 不触发校验，只会在调用 `<Form>` 的 `check()` 方法的时候才会校验

在 `<Form>` 和 `<Form.Control>` 组件上都有 `checkTrigger` 属性， 在 `<Form>` 中可以定义整个表单的校验方式，如果有个表单组件需要单独处理校验方式，可以在 `<Form.Control>` 上进行设置。

<!--{include:`custom-check-trigger.md`}-->

## Props & Methods

- [Form props](/zh/components/form)
- [Schema APIs](/zh/components/schema)
