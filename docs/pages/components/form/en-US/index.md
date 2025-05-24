# Form

A set of components and models that process form data.

## Import

<!--{include:<import-guide>}-->

- **Basic**:
  - `Form`: Used to define forms that support data validation.
  - `Form.Label`: Title corresponding to the form field.
  - `Form.Control`: Defines the control for the form field. Defaults to the `Input` component. Can customize the component through the `accepter` property.
- **Layout**:
  - `Form.Stack`: Used to layout a group of form controls.
  - `Form.Group`: Used to layout a single form control.
- **Field State**:
  - `Form.Text`: Provides help information for form fields.
  - `Form.ErrorMessage`: Displays error message for form fields.
- **Hooks**
  - `useFormControl`: A hook that provides form control functionality for custom form components, enabling seamless integration with the Form component.

## Layouts

---

### Vertical Layout

<!--{include:`basic.md`}-->

### Fluid

The `fluid` property allows the Input 100% of the form to fill the container, valid only in vertical layouts.

<!--{include:`fluid.md`}-->

### Horizontal Layout

<!--{include:`horizontal.md`}-->

### Inline Layout

<!--{include:`inline.md`}-->

### Layout In Modal

<!--{include:`modal-layout.md`}-->

## Status

---

### Help Text

`<Form.Text>` A help description can be defined below the form component. If the `tooltip` property is set, an icon will be displayed on the form component and the help description information will be displayed as `<Tooltip>`.

<!--{include:`help-block.md`}-->

### Error Message

Error message can be set in 2 ways:

- The `<Form.Control>` component passes an `errorMessage` property setting error message, and `errorPlacement` sets the location of the error message display.
- Customize a prompt message.

<!--{include:`error-message.md`}-->

### Disabled and read only

<!--{include:`status.md`}-->

## Accessibility

### ARIA properties

- You should set the `aria-label` or `aria-labelledby` property for each form so that the screen reader can read the purpose of the form correctly.

- Through the `controlId` prop of `<Form.Group>`, you can set `id` on `<Form.Control>` and set `htmlFor` on `<Form.Label>`. In addition, `aria-labelledby` and `aria-describeby` will be generated for `<Form.Control>`, corresponding to the `id` of `<Form.Label>` and `<Form.Text>`.

```jsx
<Form.Group controlId="name">
  <Form.Label>Username</Form.Label>
  <Form.Control />
  <Form.Text>Username is required</Form.Text>
</Form.Group>
```

HTML:

```html
<div class="rs-form-group" role="group">
  <label id="name-control-label" for="name" class="rs-form-control-label">Username</label>
  <div class="rs-form-control rs-form-control-wrapper">
    <input
      id="name"
      class="rs-input"
      aria-labelledby="name-control-label"
      aria-describedby="name-help-text"
    />
  </div>
  <span id="name-help-text" class="rs-form-help-text">Username is required</span>
</div>
```

### Required JavaScript features

- Click the button of `type='submit'` in the Form, and the submit event of the form will be triggered automatically.

## Props

### `<Form>`

| Property         | Type `(default)`                                      | Description                                                                    |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| checkTrigger     | 'change' \| 'blur' \| 'none' `('change')`             | Specifies when to trigger form validation                                      |
| disabled         | boolean `(false)`                                     | Disables the form                                                              |
| errorFromContext | boolean `(true)`                                      | Default error messages in Form.Control are sourced from Context                |
| fluid            | boolean                                               | Enables the Input to occupy 100% width in vertical layouts only                |
| formDefaultValue | object                                                | Initial default values for the form                                            |
| formError        | object                                                | Error messages for the form                                                    |
| formValue        | object                                                | Values of the form (controlled)                                                |
| layout           | 'horizontal' \| 'vertical' \| 'inline' `('vertical')` | The layout style of the form                                                   |
| model            | Schema                                                | Instance of SchemaModel                                                        |
| nestedField      | boolean `(false)`                                     | Allows support for nested fields                                               |
| onChange         | (formValue: object, event) => void                    | Callback triggered on data change                                              |
| onCheck          | (formError: object) => void                           | Callback triggered on data validation                                          |
| onError          | (formError: object) => void                           | Callback triggered on validation errors                                        |
| onReset          | (formValue: object, event: FormEvent) => void         | Callback triggered on form reset                                               |
| onSubmit         | (formValue: object, event: FormEvent) => void         | Callback triggered on form submission, only occurs when form data is validated |
| plaintext        | boolean `(false)`                                     | Renders the form in plain text                                                 |
| readOnly         | boolean `(false)`                                     | Sets the form to read-only mode                                                |

### `<Form.Stack>`

![][6.0.0]

| Property    | Type`(default)`                                       | Description                                                     |
| ----------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| classPrefix | string `('form-stack')`                               | CSS class prefix for the component                              |
| fluid       | boolean                                               | Enables the Input to occupy 100% width in vertical layouts only |
| layout      | 'horizontal' \| 'vertical' \| 'inline' `('vertical')` | The layout style of the form                                    |
| spacing     | number                                                | Spacing between form controls                                   |

### `<Form.Control>`

| Property               | Type`(default)`                                       | Description                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accepter               | ElementType `(Input)`                                 | Component to be used as the input.                                                                                                                                    |
| checkAsync             | boolean                                               | Enables asynchronous validation.                                                                                                                                      |
| checkTrigger           | 'change' \| 'blur' \| 'none'                          | Overrides the form's validation trigger type for this control.                                                                                                        |
| classPrefix            | string `('form-control')`                             | CSS class prefix for the component.                                                                                                                                   |
| errorMessage           | ReactNode                                             | Displays error messages.                                                                                                                                              |
| errorPlacement         | [Placement](#code-ts-placement-code)`('bottomStart')` | Specifies where to display error messages.                                                                                                                            |
| name \*                | string                                                | Name attribute for the control, supports nested paths like `address.city` for form value management.                                                                  |
| plaintext              | boolean                                               | Renders the control in plain text.                                                                                                                                    |
| readOnly               | boolean                                               | Sets the control to read-only mode.                                                                                                                                   |
| rule                   | checkType                                             | Validation rule for the field. Overrides form-level `model` validation if there's a conflict, [example](/components/form-validation/#field-level-verification-rules). |
| shouldResetWithUnmount | boolean`('false')`                                    | Removes the field value and error message when the component is unmounted.                                                                                            |

### `<Form.Group>`

| Property    | Type`(default)`         | Description                                                                     |
| ----------- | ----------------------- | ------------------------------------------------------------------------------- |
| classPrefix | string `('form-group')` | CSS class prefix for the component                                              |
| controlId   | string                  | Assigns an id to the `<Form.Control>` and sets `htmlFor` on the `<Form.Label>`. |

### `<Form.Label>`

| Property    | Type`(default)`                 | Description                                                                       |
| ----------- | ------------------------------- | --------------------------------------------------------------------------------- |
| classPrefix | string `('form-control-label')` | CSS class prefix for the component                                                |
| htmlFor     | string                          | The `for` attribute of the HTML label tag, defaults to the Form.Group's controlId |

### `<Form.Text>`

| Property    | Type`(default)`             | Description                                                                       |
| ----------- | --------------------------- | --------------------------------------------------------------------------------- |
| classPrefix | string `('form-help-text')` | CSS class prefix for the component                                                |
| htmlFor     | string                      | The `for` attribute of the HTML label tag, defaults to the Form.Group's controlId |
| tooltip     | boolean                     | Shows the text through a Tooltip component                                        |

### `<Form.ErrorMessage>`

| Property    | Type`(default)`                                       | Description                                 |
| ----------- | ----------------------------------------------------- | ------------------------------------------- |
| classPrefix | string `('form-error-message')`                       | CSS class prefix for the component          |
| placement   | [Placement](#code-ts-placement-code)`('bottomStart')` | Specifies where to display error messages   |
| show        | boolean                                               | Toggles the visibility of the error message |

### Form Ref

| Name               | Type                                                                          | Description                                                   |
| ------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------- |
| check              | (callback?: (formError: E) => void) => boolean                                | Verify form data                                              |
| checkAsync         | () => Promise<CheckResult>                                                    | Asynchronously check form data                                |
| checkForField      | (fieldName: string, callback?: (checkResult: CheckResult) => void) => boolean | Checklist single field value                                  |
| checkForFieldAsync | (fieldName: string) => Promise<CheckResult>                                   | Asynchronous check form single field value                    |
| cleanErrorForField | (fieldName: string, callback?: () => void) => void                            | Clear single field error message                              |
| cleanErrors        | (callback: () => void) => void                                                | Clean error message                                           |
| reset              | () => void                                                                    | Reset form data to initial value and clear all error messages |
| resetErrors        | () => void                                                                    | Reset error message                                           |
| submit             | () => void                                                                    | Trigger form submission and verify data                       |

### Schema

Schema depends on the [schema-typed](https://github.com/rsuite/schema-typed#schema-typed) library for defining data models.

<!--{include:(_common/types/placement-error-message.md)}-->

## Hooks

### `useFormControl`

![][6.0.0]

The `useFormControl` hook provides form control functionality for custom form components. It must be used within a `<Form>` component.

```tsx
const {
  value, // Current field value
  error, // Field error message
  plaintext, // Whether the field is in plaintext mode
  readOnly, // Whether the field is read-only
  disabled, // Whether the field is disabled
  onChange, // Handler for field value changes
  onBlur, // Handler for field blur events
  onCheck, // Handler for manually triggering field validation
  setValue // Directly sets the field value
} = useFormControl(props);
```

| Property               | Type`(default)`            | Description                                                         |
| ---------------------- | -------------------------- | ------------------------------------------------------------------- |
| checkAsync             | boolean`(false)`           | Whether to perform asynchronous validation                          |
| checkTrigger           | 'change' \| 'blur' \| null | The data validation trigger type, overrides the Form's checkTrigger |
| errorMessage           | React.ReactNode            | Custom error message to display                                     |
| name                   | string                     | The name of the form field (required)                               |
| rule                   | CheckType                  | Validation rule (from Schema)                                       |
| shouldResetWithUnmount | boolean`(false)`           | Whether to remove field value and error when component unmounts     |
| value                  | any                        | The current value                                                   |

#### Return Values

| Property  | Type                                           | Description                                                                                                                                |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| disabled  | boolean                                        | Whether the field is disabled (inherited from Form)                                                                                        |
| error     | React.ReactNode                                | Field error message                                                                                                                        |
| onBlur    | () => void                                     | Handler for field blur events                                                                                                              |
| onChange  | (value: any, event: SyntheticEvent) => void    | Handler for field value changes                                                                                                            |
| onCheck   | (value: any) => void                           | Handler for manually triggering field validation                                                                                           |
| plaintext | boolean                                        | Whether the field is in plaintext mode (inherited from Form)                                                                               |
| readOnly  | boolean                                        | Whether the field is read-only (inherited from Form)                                                                                       |
| setValue  | (value: any, shouldValidate?: boolean) => void | Directly sets the field value without triggering onChange events. If shouldValidate is true, will trigger validation based on checkTrigger |
| value     | any                                            | Current field value                                                                                                                        |

#### Example

```jsx
import { useFormControl } from 'rsuite';

function CustomField({ name, label }) {
  const { value, error, onChange, onBlur } = useFormControl({ name });

  return (
    <div className="custom-field">
      <label>{label}</label>
      <input value={value || ''} onChange={e => onChange(e.target.value, e)} onBlur={onBlur} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

// Usage
<Form>
  <CustomField name="email" label="Email" />
</Form>;
```
