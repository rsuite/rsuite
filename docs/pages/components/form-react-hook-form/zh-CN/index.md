# React Hook Form 集成 🧩

React Suite 的表单组件可以与 [React Hook Form](https://react-hook-form.com/) 一起使用。React Hook Form 是一个简单、灵活且强大的表单验证库，它可以帮助你轻松地管理表单状态和验证。

## 使用

<!--{include:(components/form-react-hook-form/fragments/usage.md)}-->

## 演示

### 基础实例

<!--{include:`basic.md`}-->

### 验证

<!--{include:`validation.md`}-->

### 使用 Yup 验证

react-hook-form 提供一个验证解析器，可以和主流的验证库集成，包括: Yup, Zod, AJV, Joi, Superstruct, Vest, class-validator, io-ts, typanion, Ajv, TypeBox, Valibot and nope.

以下是使用 Yup 验证的示例：

<!--{include:`yup-schema-validation.md`}-->

### 其他数据输入组件

React Suite 中所有的数据输入组件都可以与 React Hook Form 一起使用。以下示例将演示如何使用 React Hook Form 与 `DatePicker` 和 `Rate` 组件。

<!--{include:`other-input-components.md`}-->
