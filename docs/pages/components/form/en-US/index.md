# Form

A set of components and models that process form data.

## Import

<!--{include:<import-guide>}-->

- `<Form>` Define a form.
- `<Form.Group>` Define form groups, used for form layout.
- `<Form.Control>` Define form-control.
- `<Form.ControlLabel>` title of form-control.
- `<Form.HelpText>` help infomation of form-control.
- `<Form.ErrorMessage>` error infomation of form-control.

## Layouts

---

### Basic

The default is the vertical layout

<!--{include:`basic.md`}-->

### Fluid

The `fluid` property allows the Input 100% of the form to fill the container, valid only in vertical layouts.

<!--{include:`fluid.md`}-->

### Horizontal layout

<!--{include:`horizontal.md`}-->

### Inline Layout

<!--{include:`inline.md`}-->

### Layout In Modal

<!--{include:`modal-layout.md`}-->

## Status

---

### Help Text

`<Form.HelpText>` A help description can be defined below the form component. If the `tooltip` property is set, an icon will be displayed on the form component and the help description information will be displayed as `<Tooltip>`.

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

- Through the `controlId` prop of `<Form.Group>`, you can set `id` on `<Form.Control>` and set `htmlFor` on `<Form.ControlLabel>`. In addition, `aria-labelledby` and `aria-describeby` will be generated for `<Form.Control>`, corresponding to the `id` of `<Form.ControlLabel>` and `<Form.HelpText>`.

```html
<Form.Group controlId="name">
  <Form.ControlLabel>Username</Form.ControlLabel>
  <Form.Control />
  <Form.HelpText>Username is required</Form.HelpText>
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

| Property         | Type `(default)`                                      | Description                                                                                                |
| ---------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| checkTrigger     | 'change' \| 'blur' \| 'none' `('change')`             | Trigger the type of form validation                                                                        |
| classPrefix      | string `('form')`                                     | The prefix of the component CSS class                                                                      |
| disabled         | boolean `(false)`                                     | Disable the form                                                                                           |
| errorFromContext | boolean `(true)`                                      | Error reminders in Form.Control are defaulted from Context                                                 |
| fluid            | boolean                                               | The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts |
| formDefaultValue | object                                                | Default value of form                                                                                      |
| formError        | object                                                | Error message of form                                                                                      |
| formValue        | object                                                | Value of form (Controlled)                                                                                 |
| layout           | 'horizontal' \| 'vertical' \| 'inline' `('vertical')` | Set the left and right columns of the layout of the elements within the form                               |
| model            | Schema                                                | SchemaModel instance object                                                                                |
| nestedField      | boolean `(false)`                                     | Whether to support nested fields                                                                           |
| onChange         | (formValue: object, event) => void                    | Callback fired when data changing                                                                          |
| onCheck          | (formError: object) => void                           | Callback fired when data cheking                                                                           |
| onError          | (formError: object) => void                           | Callback fired when error checking                                                                         |
| onReset          | (formValue: object, event: FormEvent) => void         | Callback fired when form reset                                                                             |
| onSubmit         | (formValue: object, event: FormEvent) => void         | Callback fired when form submit, only when the form data is validated will trigger                         |
| plaintext        | boolean `(false)`                                     | Render the form as plain text                                                                              |
| readOnly         | boolean `(false)`                                     | Make the form readonly                                                                                     |

### `<Form.Control>`

| Property               | Type`(default)`                                       | Description                                                                                                                                                                   |
| ---------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accepter               | ElementType `(Input)`                                 | Proxied components.                                                                                                                                                           |
| checkAsync             | boolean                                               | Asynchronous check value.                                                                                                                                                     |
| checkTrigger           | 'change' \| 'blur' \| 'none'                          | The data validation trigger type, and it wiill overrides the setting on `<Form>`.                                                                                             |
| classPrefix            | string `('form-control')`                             | The prefix of the component CSS class.                                                                                                                                        |
| errorMessage           | ReactNode                                             | Show error messages.                                                                                                                                                          |
| errorPlacement         | [Placement](#code-ts-placement-code)`('bottomStart')` | The placement of error messages.                                                                                                                                              |
| name \*                | string                                                | The name of Form.Control, support nested path. such as `address.city`, the path will be used to get and set form values.                                                      |
| plaintext              | boolean                                               | Make the control plaintext.                                                                                                                                                   |
| readOnly               | boolean                                               | Make the control readonly.                                                                                                                                                    |
| rule                   | checkType                                             | Current field verification rule. If it conflicts with the `<Form>`'s `model`, it get higher priority, [example](/components/form-validation/#field-level-verification-rules). |
| shouldResetWithUnmount | boolean`('false')`                                    | Remove field value and error message when component is unmounted.                                                                                                             |

### `<Form.Group>`

| Property    | Type`(default)`         | Description                                                         |
| ----------- | ----------------------- | ------------------------------------------------------------------- |
| classPrefix | string `('form-group')` | The prefix of the component CSS class                               |
| controlId   | string                  | Sets id on `<Form.Control>` and `htmlFor` on `<Form.ControlLabel>`. |

### `<Form.ControlLabel>`

| Property    | Type`(default)`                 | Description                                                                  |
| ----------- | ------------------------------- | ---------------------------------------------------------------------------- |
| classPrefix | string `('form-control-label')` | The prefix of the component CSS class                                        |
| htmlFor     | string                          | Attribute of the html label tag, defaults to the controlId of the Form.Group |

### `<Form.HelpText>`

| Property    | Type`(default)`             | Description                                                                  |
| ----------- | --------------------------- | ---------------------------------------------------------------------------- |
| classPrefix | string `('form-help-text')` | The prefix of the component CSS class                                        |
| htmlFor     | string                      | Attribute of the html label tag, defaults to the controlId of the Form.Group |
| tooltip     | boolean                     | Whether to show through the Tooltip component                                |

### `<Form.ErrorMessage>`

| Property    | Type`(default)`                                       | Description                           |
| ----------- | ----------------------------------------------------- | ------------------------------------- |
| classPrefix | string `('form-error-message')`                       | The prefix of the component CSS class |
| placement   | [Placement](#code-ts-placement-code)`('bottomStart')` | The placement of error messages       |
| show        | boolean                                               | Whether to display error message      |

<!--{include:(_common/types/placement8.md)}-->
