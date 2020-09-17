# Form

A set of components and models that process form data.

- `<Form>` Define a form.
- `<FormControl>` Define form-control.
- `<FormGroup>` Define form groups, used for form layout.
- `<ControlLabel>` title of form-control.
- `<HelpBlock>` help infomation of form-controll

## Usage

```js
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite';
```

<!--{demo}-->

## Props

### `<Form>`

| Property         | Type `(default)`                                        | Description                                                                                                |
| ---------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| checkDelay       | number `(500)`                                          | Delayed processing when data check, unit: millisecond                                                      |
| checkTrigger     | enum: 'change','blur','none' `('change')`               | Trigger the type of form validation                                                                        |
| classPrefix      | string `('form')`                                       | The prefix of the component CSS class                                                                      |
| errorFromContext | boolean `(true)`                                        | Error reminders in FormControl are defaulted from Context                                                  |
| fluid            | boolean                                                 | The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts |
| formDefaultValue | Object                                                  | Default value of form                                                                                      |
| formError        | Object                                                  | Error message of form                                                                                      |
| formValue        | Object                                                  | Value of form (Controlled)                                                                                 |
| layout           | enum: 'horizontal', 'vertical', 'inline' `('vertical')` | Set the left and right columns of the layout of the elements within the form                               |
| model            | Schema                                                  | SchemaModel Object                                                                                         |
| onChange         | (formValue:Object, event:Object) => void                | Callback fired when data changing                                                                          |
| onCheck          | (formError:Object) => void                              | Callback fired when data cheking                                                                           |
| onError          | (formError:Object) => void                              | Callback fired when error checking                                                                         |

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

- cleanErrorForFiled

Clear single field error message

```js
cleanErrorForFiled: (fieldName: keyof E, callback?: () => void) => void;
```

### `<FormControl>`

| Property       | Type`(default)`                              | Description                                                                      |
| -------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| accepter       | React.ElementType `(Input)`                  | Proxied components                                                               |
| checkTrigger   | enum: 'change','blur','none'                 | The data validation trigger type, and it wiill overrides the setting on `<Form>` |
| classPrefix    | string `('form-control')`                    | The prefix of the component CSS class                                            |
| errorMessage   | React.Node                                   | Show error messages                                                              |
| errorPlacement | enum: [Placement8](#types) `('bottomStart')` | The placement of error messages                                                  |
| name \*        | string                                       | The name of form-control                                                         |
| readOnly       | boolean                                      | Make the control readonly                                                        |
| plaintext      | boolean                                      | Make the control plaintext                                                       |

### `<FormGroup>`

| Property    | Type`(default)`         | Description                           |
| ----------- | ----------------------- | ------------------------------------- |
| classPrefix | string `('form-group')` | The prefix of the component CSS class |
| controlId   | string                  | Sets id for controlled component      |

### `<ControlLabel>`

| Property    | Type`(default)`            | Description                                                                 |
| ----------- | -------------------------- | --------------------------------------------------------------------------- |
| classPrefix | string `('control-label')` | The prefix of the component CSS class                                       |
| htmlFor     | string                     | Attribute of the html label tag, defaults to the controlId of the FormGroup |
| srOnly      | boolean                    | Screen reader only                                                          |

### `<HelpBlock>`

| Property    | Type`(default)`         | Description                                                                 |
| ----------- | ----------------------- | --------------------------------------------------------------------------- |
| classPrefix | string `('help-block')` | The prefix of the component CSS class                                       |
| htmlFor     | string                  | Attribute of the html label tag, defaults to the controlId of the FormGroup |
| tooltip     | boolean                 | Whether to show through the Tooltip component                               |
