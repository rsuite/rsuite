# Formik 集成 🧩

React Suite 可以与 [Formik](https://formik.org/) 无缝集成。本指南将向您展示如何在 React Suite 中使用 Formik。

## 使用

以下将使用 `useFormik` Hook 与 `Input` 组件创建一个简单的表单。

<!--{include:(components/form-formik/fragments/usage.md)}-->

## 演示

### 基础实例

<!--{include:`basic.md`}-->

### 验证

<!--{include:`validation.md`}-->

### 使用 Yup 验证

Yup 是一个用于运行时值解析和验证的模式构建器。 Formik 与 Yup 集成良好，可以轻松地将 Yup 模式与 Formik 表单一起使用。

<!--{include:`yup-schema-validation.md`}-->

> 如果您更喜欢使用 Zod，可以考虑使用社区提供的适配器 [zod-formik-adapter](https://www.npmjs.com/package/zod-formik-adapter)。

### 其他数据输入组件

React Suite 中所有的数据输入组件都可以与 Formik 一起使用。 以下将通过 `DatePicker` 和 `Rate` 组件演示如何使用 Formik。

<!--{include:`other-input-components.md`}-->
