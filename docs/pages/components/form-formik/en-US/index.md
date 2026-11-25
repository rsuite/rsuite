# Formik integration 🧩

React Suite can be coupled smoothly with [Formik](https://formik.org/). This guide will show you how to use Formik with React Suite.

## Usage

The following will use the `useFormik` hook to create a simple form with the `Input` component.

<!--{include:(components/form-formik/fragments/usage.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Validation

<!--{include:`validation.md`}-->

### Validation with Yup

Yup is a schema builder for runtime value parsing and validation. Formik integrates well with Yup, making it easy to use Yup schemas with Formik forms.

<!--{include:`yup-schema-validation.md`}-->

> If you prefer to use Zod, consider using the community-provided adapter [zod-formik-adapter](https://www.npmjs.com/package/zod-formik-adapter).

### Other data entry components

All data entry components in React Suite can be used with Formik. The following will demonstrate how to use Formik with the `DatePicker` and `Rate` components.

<!--{include:`other-input-components.md`}-->
