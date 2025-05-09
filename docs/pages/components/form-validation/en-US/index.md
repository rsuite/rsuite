# Form validation

We recommend using [`schema-typed`](https://github.com/rsuite/schema-typed) to manage and validate form data. `rsuite` integrates `schema-typed` by default, and you can define the data model of the form through the `Schema` object. It can help us define data models, validate data, and generate error messages.

## Usage

<div class="rs-doc-steps">

<h3 class="rs-doc-step-header"> Import Form and Schema </h3>

<div class="rs-doc-step-body">

```jsx
import { Form } from 'rsuite';
import { SchemaModel, StringType } from 'rsuite/Schema';
```

</div>

<h3 class="rs-doc-step-header"> Use SchemaModel to define the data model </h3>

<div class="rs-doc-step-body">

```jsx
const model = SchemaModel({
  name: StringType().isRequired('This field is required.'),
  email: StringType().isEmail('Please enter a valid email address.')
});
```

</div>

<h3 class="rs-doc-step-header"> Set model for Form </h3>

<div class="rs-doc-step-body">

```jsx
const TextField = ({ name, label, accepter, ...rest }) => (
  <Form.Group controlId={name}>
    <Form.Label>{label} </Form.Label>
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

</div>

</div>

## Examples

### Default check

The form will automatically trigger the data check after the `submit` event is triggered.

<!--{include:`form-check-default.md`}-->

### Schema Model

Form Check needs to be used `<Form>`, `<Form.Control>` and `Schema` 。

- `<Form>` To define a form, you can set `formValue` and `model` for the form, and `model` is the data model created by `SchemaModel`.
- `<Form.Control>` Define a Field that corresponds to the `key` of the `SchemaModel` object via the `name` property. For detailed reference: Custom Form Components.
- `SchemaModel` Define a data model, using the reference [schema](https://github.com/rsuite/schema-typed#schema-typed).
- Custom trigger check: `<Form>` instance provides `check` and `checkForField` methods, used to trigger form checksum field validation

<!--{include:`form-check.md`}-->

### Field level Verification rules

When there are more and more Fields, huge `model` codes or files are generated. And since in the definition at the top level, it is not flexible enough(ex: If a new Field is added or a Field is deleted, Normally you also need to manipulate the `model` at the top level)

At this time, the verification rules of the Field level may be a better choice. It adds it when the component is mounted, and delete it when the component is unmounted.

- `<Form.Control>` supports adding verification rule for the current Field via the `rule` attribute.

<!--{include:`form-control-rule.md`}-->

### Asynchronous check

Under certain conditions, we need to perform asynchronous verification on the data, such as verifying whether the username is duplicated. The following example will illustrate the processing of asynchronous verification.

- Set the `checkAsync` property on `<Form.Control>` that requires asynchronous validation.
- The validation rules for asynchronous validation add an object with a return value of Promise via the `addRule` method of `schema`.
- The check can be triggered manually by calling `checkAsync` and `checkForFieldAsync` of `<Form>`.

<!--{include:`form-check-async.md`}-->

### Form Control

All Data Entry-related components can be used in forms such as `Checkbox`, `SelectPicker`, `Slider`, and so on. But you need to use the `Form.Control` component for data management and data association with the `Form` component.

- `Form.Control` used to bind data fields in a Form, passing the `name` attribute to the `key` of the SchemaModel object.
- `Form.Control` the default is an `Input` component, which can be set through the ʻaccepter` component.

<!--{include:`custom-form-control.md`}-->

### Third-Party Libraries

Sometimes you need to customize form components or be compatible with third-party components. For example [react-select](https://github.com/JedWatson/react-select).

<!--{include:`custom-third-party-libraries.md`}-->

### Custom trigger verification

In some cases, there is no need for real-time validation of the form data. You can customize the way the control is validated and configure the `checkTrigger` parameter.

The default value of `checkTrigger` is `'change'`, options includes:

- `'change'` : trigger verification when data change
- `'blur'` : trigger verification when component blur
- `'none'` : Only valid when calling the `check()` method of `<Form>`

There are `checkTrigger` properties on the `<Form>` and `<Form.Control>` components. You can define the entire form's validation method in `<Form>`. If there is a form component that needs to handle the validation independently, you can Set it on `<Form.Control>`.

<!--{include:`custom-check-trigger.md`}-->

### Dynamic form validation

<!--{include:`dynamic-form.md`}-->

### Nested fields

<!--{include:`form-nested-fields.md`}-->

### Proxy validation

<!--{include:`form-check-proxy.md`}-->

> Note: `proxy` isn't supported when `Form` enables `nestedField`

### Custom form fields with useFormControl

![][6.0.0]

The `useFormControl` hook allows you to create custom form fields that integrate seamlessly with the Form validation system. This approach gives you complete control over your form field's UI while maintaining all validation capabilities.

<!--{include:`use-form-control.md`}-->

## Integration with other libraries

- [With Formik Integration](/components/form-formik/)
- [With React Hook Form Integration](/components/form-react-hook-form/)
