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

When validations overlap, a superseded request cannot replace the current errors or trigger `onCheck` or `onError` after its replacement. Each asynchronous method still resolves its own validation result. Schema checks for unrelated fields can complete independently. With `nestedField`, checking a parent or child path supersedes earlier checks of overlapping paths. A whole-form check or resolver result represents the entire form. Validators continue running to completion.

Calling `reset` or `resetErrors` also invalidates pending validation results. Removing a `Form.Control` with `shouldResetWithUnmount` invalidates older checks for that field, overlapping nested paths, and the whole form. Unrelated schema field checks can still finish, and an older proxy check cannot restore the removed field's error. New checks remain available after reset or removal, including explicit checks for an unmounted schema field. Without `shouldResetWithUnmount`, removing a control retains its pending validation.

When Form manages its own errors, `cleanErrors` clears them and invalidates pending results without calling `onCheck`, `onError`, or `onChange`. Each pending Promise still returns its own result, and new checks remain available. When `formError` is controlled, clear errors through the owning state: `cleanErrors` leaves the supplied errors and pending validations unchanged.

Consecutive `cleanErrorForField` calls in one event use the latest accepted errors, including after `resetErrors` or `cleanErrors`. Clearing a field preserves other fields' messages and native invalidity without calling `onCheck`, `onError`, or `onChange`. A saved cleanup method uses the committed `nestedField` setting, including in child layout effects. With a controlled `formError`, update the owning state to clear errors.

When Form manages its own errors, `cleanErrorForField` also invalidates older checks for that field, overlapping nested paths (including equivalent numeric paths), and whole-form or resolver checks. Unrelated schema field checks can still finish. Each pending Promise returns its own result, and new checks remain available. Cleanup inside `onCheck` prevents the older result from being published afterward or triggering a stale `onError`. With a controlled `formError`, rejected field cleanup leaves pending validations unchanged.

Form field checks and asynchronous checks keep their results separate from the supplied model's `getCheckResult()` history. Read Form validation results from its methods or `onCheck`. A synchronous `checkForField` returns validity for the fields checked by that call, including proxy fields.

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

With `nestedField`, resolver errors can use field names such as `products[0].name` or equivalent numeric paths such as `products.0.name`. An own entry matching the exact field name takes priority, including `undefined`, `null`, or an empty string. Otherwise, Form checks numeric aliases and then the structured schema error path. Quoted or escaped literal names remain separate from numeric aliases.

Cleaning a field removes its exact entry, numeric aliases, and structured error leaf while preserving sibling errors and aggregate messages. A new native field check also replaces older resolver aliases for that field. A literal key such as `profile.object.name` belongs to that exact field name and does not replace the structured error for `profile.name`.

Treat native error payloads as immutable. Once Form observes changes to an original payload's keys or validated entries, selecting that object again does not restore its original native validity; run a new validation to obtain a new result.

With `nestedField`, field validation and error cleanup copy the changed object or array path. Earlier `onCheck` and `onError` payloads and supplied `formError` objects remain unchanged. Unchanged sibling errors retain their identity and native validation state, including invalid results with an empty message. For controlled errors, the displayed state changes only when the owner supplies the next `formError`.

### Proxy validation

<!--{include:`form-check-proxy.md`}-->

> Note: `proxy` isn't supported when `Form` enables `nestedField`

### Custom form fields with useFormControl

![][6.0.0]

The `useFormControl` hook allows you to create custom form fields that integrate seamlessly with the Form validation system. This approach gives you complete control over your form field's UI while maintaining all validation capabilities.

When Form manages its own values, consecutive `setValue` or `onChange` calls in one event build on earlier updates, including nested fields. Field validation receives those updated values, so cross-field rules can read the latest sibling values. With controlled `formValue`, each change is a proposal based on the owner's committed values; proposals that the owner has not accepted do not become the basis for later changes.

<!--{include:`use-form-control.md`}-->

## Integration with other libraries

- [With Formik Integration](/components/form-formik/)
- [With React Hook Form Integration](/components/form-react-hook-form/)
- [With Third-Party Validation Resolvers (Yup, Zod, Joi, AJV, Valibot…)](/components/form-resolvers/)
