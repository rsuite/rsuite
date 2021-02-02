# Form validation

We recommend using [`schema-typed`](https://github.com/rsuite/schema-typed) to manage and verify form data. The prompt information provided to the user when there is an error data in the form.

## Usage

**Step 1**: Import `Form` and `Schema`.

```jsx
import Form from 'rsuite/lib/Form';
import Schema from 'rsuite/lib/Schema';
```

**Step 2**: Use Schema to define the data model.

```jsx
const model = Schema.Model({
  name: Schema.Types.StringType().isRequired('This field is required.'),
  email: Schema.Types.StringType().isEmail('Please enter a valid email address.')
});
```

> You can learn more about about `Schema` by [reading this guide](./components/schema).

**Step 3**: Set `model` for `<Form>`.

```jsx
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

## Examples

### Default check

The form will automatically trigger the data check after the `submit` event is triggered.

<!--{include:`form-check-default.md`}-->

### Schema Model

Form Check needs to be used `<Form>`, `<Form.Control>` and `Schema` 。

- `<Form>` To define a form, you can set `formValue` and `model` for the form, and `model` is the data model created by `Schema.Model`.
- `<Form.Control>` Define a Filed that corresponds to the `key` of the `Schema.Model` object via the `name` property. For detailed reference: Custom Form Components.
- `Schema.Model` Define a data model, using the reference [schema](/components/schema).
- Custom trigger check: `<Form>` instance provides `check` and `checkForField` methods, used to trigger form checksum field validation

<!--{include:`form-check.md`}-->

### Asynchronous check

Under certain conditions, we need to perform asynchronous verification on the data, such as verifying whether the username is duplicated. The following example will illustrate the processing of asynchronous verification.

- Set the `checkAsync` property on `<Form.Control>` that requires asynchronous validation.
- The validation rules for asynchronous validation add an object with a return value of Promise via the `addRule` method of `schema`.
- The check can be triggered manually by calling `checkAsync` and `checkForFieldAsync` of `<Form>`.

<!--{include:`form-check-async.md`}-->

### Custom Form.Control

All Data Entry-related components can be used in forms such as `Checkbox`, `SelectPicker`, `Slider`, and so on. But you need to use the `Form.Control` component for data management and data association with the `Form` component.

- `Form.Control` used to bind data fields in a Form, passing the `name` attribute to the `key` of the Schema.Model object.
- `Form.Control` the default is an `Input` component, which can be set through the ʻaccepter` component.

<!--{include:`custom-form-control.md`}-->

### Third-Party Libraries

Take [text-mask](https://github.com/text-mask/text-mask) as an example:

<!--{include:`custom-third-party-libraries.md`}-->

### Custom trigger verification

In some cases, there is no need for real-time validation of the form data. You can customize the way the control is validated and configure the `checkTrigger` parameter.

The default value of `checkTrigger` is `'change'`, options includes:

- `'change'` : trigger verification when data change
- `'blur'` : trigger verification when component blur
- `'none'` : Only valid when calling the `check()` method of `<Form>`

There are `checkTrigger` properties on the `<Form>` and `<Form.Control>` components. You can define the entire form's validation method in `<Form>`. If there is a form component that needs to handle the validation independently, you can Set it on `<Form.Control>`.

<!--{include:`custom-check-trigger.md`}-->

## Props & Methods

- [Form props](/components/form)
- [Schema APIs](/components/schema)
