# Form

A set of components and models that process form data.

- `<Form>` Define a form.
- `<Form.Group>` Define form groups, used for form layout.
- `<Form.Control>` Define form-control.
- `<Form.ControlLabel>` title of form-control.
- `<Form.HelpText>` help infomation of form-controll

## Import

<!--{include:(components/form/fragments/import.md)}-->

## Layouts

---

### Default

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

- Click the button of `type='submit'` in the Form, and the submit event of the form will be triggered automatically.

## Props

### `<Form>`

| Property         | Type `(default)`                                        | Description                                                                                                |
| ---------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| checkTrigger     | enum: 'change','blur','none' `('change')`               | Trigger the type of form validation                                                                        |
| classPrefix      | string `('form')`                                       | The prefix of the component CSS class                                                                      |
| errorFromContext | boolean `(true)`                                        | Error reminders in Form.Control are defaulted from Context                                                 |
| fluid            | boolean                                                 | The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts |
| formDefaultValue | object                                                  | Default value of form                                                                                      |
| formError        | object                                                  | Error message of form                                                                                      |
| formValue        | object                                                  | Value of form (Controlled)                                                                                 |
| layout           | enum: 'horizontal', 'vertical', 'inline' `('vertical')` | Set the left and right columns of the layout of the elements within the form                               |
| model            | Schema                                                  | SchemaModel object                                                                                         |
| onChange         | (formValue:object, event:object) => void                | Callback fired when data changing                                                                          |
| onCheck          | (formError:object) => void                              | Callback fired when data cheking                                                                           |
| onError          | (formError:object) => void                              | Callback fired when error checking                                                                         |

### Form methods

- check

Verify form data.

```js
check: (callback?: (formError: E) => void) => boolean;
```

- checkAsync

Asynchronously check form data

```js
checkAsync: () => Promise<any>;
```

- checkForField

Checklist single field value.

```js
checkForField: (
    fieldName: keyof T,
    callback?: (checkResult: CheckResult<errorMsg>) => void
  ) => boolean;
```

- checkForFieldAsync

Asynchronous check form single field value

```js
checkForFieldAsync: (fieldName: keyof T) => Promise<CheckResult>;
```

- cleanErrors

Clean error message.

```js
cleanErrors(callback: () => void) => void
```

- cleanErrorForField

Clear single field error message

```js
cleanErrorForField: (fieldName: keyof E, callback?: () => void) => void;
```

### `<Form.Control>`

| Property       | Type`(default)`                   | Description                                                                      |
| -------------- | --------------------------------- | -------------------------------------------------------------------------------- |
| accepter       | ElementType `(Input)`             | Proxied components                                                               |
| checkTrigger   | enum: 'change','blur','none'      | The data validation trigger type, and it wiill overrides the setting on `<Form>` |
| classPrefix    | string `('form-control')`         | The prefix of the component CSS class                                            |
| errorMessage   | ReactNode                         | Show error messages                                                              |
| errorPlacement | enum: Placement `('bottomStart')` | The placement of error messages                                                  |
| name \*        | string                            | The name of form-control                                                         |
| plaintext      | boolean                           | Make the control plaintext                                                       |
| readOnly       | boolean                           | Make the control readonly                                                        |

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

### `<Form.ErrorMessge>`

| Property    | Type`(default)`                   | Description                           |
| ----------- | --------------------------------- | ------------------------------------- |
| classPrefix | string `('form-error-message')`   | The prefix of the component CSS class |
| show        | boolean                           | Whether to display error message      |
| placement   | enum: Placement `('bottomStart')` | The placement of error messages       |

```js
type Placement =
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'rightStart'
  | 'leftEnd'
  | 'rightEnd';
```
