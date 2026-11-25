# Form Validation Resolvers 🧩

The `resolver` prop allows you to integrate any third-party validation library with the rsuite `<Form>` component. You define a **resolver function** that accepts the current form values and returns (or resolves to) an object `{ errors }` where each key is a field name and each value is an error message. An empty `errors` object means the form is valid.

## How it works

```jsx
import { Form } from 'rsuite';

// A resolver is a function (or a function that returns a function) that:
// 1. receives the current form values
// 2. returns { errors: {} } on success
// 3. returns { errors: { fieldName: 'Error message' } } on failure

const myResolver = formValue => {
  const errors = {};
  if (!formValue.email) errors.email = 'Required';
  return { errors };
};

<Form resolver={myResolver} onSubmit={handleSubmit}>
  <Form.Control name="email" />
  <Button type="submit">Submit</Button>
</Form>
```

> **Note:** The `resolver` prop takes precedence over the `model` prop for form-level validation. If the resolver is asynchronous, use `checkAsync()` or rely on the `onSubmit` callback (which always awaits the resolver).

## Examples

### Yup

[Yup](https://github.com/jquense/yup) is a schema builder for runtime value parsing and validation.

<!--{include:`yup.md`}-->

### Zod

[Zod](https://zod.dev/) is a TypeScript-first schema validation library with static type inference.

<!--{include:`zod.md`}-->

### Joi

[Joi](https://joi.dev/) is the most powerful data validation library for JavaScript.

<!--{include:`joi.md`}-->

### AJV

[AJV](https://ajv.js.org/) is the fastest JSON Schema validator for Node.js and browser.

<!--{include:`ajv.md`}-->

### Superstruct

[Superstruct](https://docs.superstructjs.org/) makes it easy to define interfaces and then validate JavaScript data against them.

<!--{include:`superstruct.md`}-->

### Vest

[Vest](https://vestjs.dev/) is a validations framework inspired by unit testing libraries.

<!--{include:`vest.md`}-->

### Valibot

[Valibot](https://valibot.dev/) is a modular and type-safe schema library with a tiny bundle size.

<!--{include:`valibot.md`}-->

### class-validator

[class-validator](https://github.com/typestack/class-validator) allows you to use decorator-based validation in TypeScript classes.

> **Note:** class-validator is commonly used with TypeScript decorators. This live example uses the equivalent JavaScript decorator function calls so it can run in the browser.

<!--{include:`class-validator.md`}-->

### io-ts

[io-ts](https://gcanti.github.io/io-ts/) is a runtime type system for IO decoding/encoding.

<!--{include:`io-ts.md`}-->

### typanion

[typanion](https://github.com/arcanis/typanion) is a type-safe validation library with no dependencies.

<!--{include:`typanion.md`}-->

### TypeBox

[TypeBox](https://github.com/sinclairzx81/typebox) provides JSON Schema type builder with static type resolution for TypeScript. It pairs naturally with AJV.

<!--{include:`typebox.md`}-->

### nope

[nope](https://github.com/bvego/nope-validator) is a small, simple and fast JS validator.

<!--{include:`nope.md`}-->
