# 表单验证解析器 🧩

`resolver` 属性允许您将任意第三方验证库与 rsuite `<Form>` 组件集成。您只需定义一个**解析器函数**，该函数接收当前表单值，并返回（或异步解析为）一个 `{ errors }` 对象，其中每个键是字段名，每个值是错误信息。`errors` 为空对象时表示校验通过。

## 工作原理

```jsx
import { Form } from 'rsuite';

// resolver 是一个函数（或返回函数的函数），它：
// 1. 接收当前表单值
// 2. 校验通过时返回 { errors: {} }
// 3. 校验失败时返回 { errors: { fieldName: '错误信息' } }

const myResolver = formValue => {
  const errors = {};
  if (!formValue.email) errors.email = '必填';
  return { errors };
};

<Form resolver={myResolver} onSubmit={handleSubmit}>
  <Form.Control name="email" />
  <Button type="submit">提交</Button>
</Form>
```

> **注意：** `resolver` 属性在表单级校验上优先于 `model` 属性。如果 resolver 是异步的，请使用 `checkAsync()` 或依赖 `onSubmit` 回调（它总是等待 resolver 完成后才触发）。

## 演示

### Yup

[Yup](https://github.com/jquense/yup) 是一个用于运行时值解析和验证的模式构建器。

<!--{include:`yup.md`}-->

### Zod

[Zod](https://zod.dev/) 是一个以 TypeScript 为先、支持静态类型推断的模式验证库。

<!--{include:`zod.md`}-->

### Joi

[Joi](https://joi.dev/) 是目前最强大的 JavaScript 数据验证库。

<!--{include:`joi.md`}-->

### AJV

[AJV](https://ajv.js.org/) 是 Node.js 和浏览器中最快的 JSON Schema 验证器。

<!--{include:`ajv.md`}-->

### Superstruct

[Superstruct](https://docs.superstructjs.org/) 让您轻松定义接口并对 JavaScript 数据进行验证。

<!--{include:`superstruct.md`}-->

### Vest

[Vest](https://vestjs.dev/) 是一个受单元测试库启发的验证框架。

<!--{include:`vest.md`}-->

### Valibot

[Valibot](https://valibot.dev/) 是一个模块化、类型安全、体积极小的模式验证库。

<!--{include:`valibot.md`}-->

### class-validator

[class-validator](https://github.com/typestack/class-validator) 允许您在 TypeScript 类中使用基于装饰器的验证。

> **注意：** 此示例需要 TypeScript 项目并在 `tsconfig.json` 中启用 `experimentalDecorators` 和 `emitDecoratorMetadata`。

<!--{include:`class-validator.md`}-->

### io-ts

[io-ts](https://gcanti.github.io/io-ts/) 是一个用于 IO 解码/编码的运行时类型系统。

<!--{include:`io-ts.md`}-->

### typanion

[typanion](https://github.com/arcanis/typanion) 是一个无依赖的类型安全验证库。

<!--{include:`typanion.md`}-->

### TypeBox

[TypeBox](https://github.com/sinclairzx81/typebox) 提供了带 TypeScript 静态类型解析的 JSON Schema 类型构建器，与 AJV 配合使用效果极佳。

<!--{include:`typebox.md`}-->

### nope

[nope](https://github.com/bvego/nope-validator) 是一个小巧、简单且快速的 JavaScript 验证器。

<!--{include:`nope.md`}-->
