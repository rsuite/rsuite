# React Hook Form integration 🧩

React Suite's form components can be used with [React Hook Form](https://react-hook-form.com/). React Hook Form is a simple, flexible and powerful form validation library that helps you easily manage form state and validation.

## Usage

<!--{include:(components/form-react-hook-form/fragments/usage.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Validation

<!--{include:`validation.md`}-->

### Validation with Yup

react-hook-form provides a [validation resolver](https://github.com/react-hook-form/resolvers) that can be integrated with popular validation libraries, including: Yup, Zod, AJV, Joi, Superstruct, Vest, class-validator, io-ts, typanion, Ajv, TypeBox, Valibot and nope.

The following is an example using Yup validation:

<!--{include:`yup-schema-validation.md`}-->

### Other data entry components

All data entry components in React Suite can be used with React Hook Form. The following example demonstrates how to use React Hook Form with the `DatePicker` and `Rate` components.

<!--{include:`other-input-components.md`}-->
