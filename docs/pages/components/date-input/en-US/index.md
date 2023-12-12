# DateInput

The DateInput component lets users select a date with the keyboard.

![Supported from version 5.48.0](https://img.shields.io/badge/version->=5.48.0-blue)

## Import

<!--{include:(components/date-input/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Customize the date format

<!--{include:`format.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Controlled vs. uncontrolled value

<!--{include:`controlled.md`}-->

## Props

### `<DateInput>`

<!-- prettier-sort-markdown-table -->

| Property     | Type`(default)`                 | Description                                               |
| ------------ | ------------------------------- | --------------------------------------------------------- |
| defaultValue | Date                            | Default value                                             |
| disabled     | boolean                         | Whether disabled the component                            |
| format       | string `('yyyy-MM-dd')`         | Format of the date when rendered in the input             |
| onChange     | (date: Date, event) => void     | Callback fired when value changed                         |
| plaintext    | boolean                         | Whether plaintext the component                           |
| readOnly     | boolean                         | Whether read only the component                           |
| size         | 'lg'〡'md'〡'sm'〡'xs' `('md')` | Date input can have different sizes                       |
| value        | Date                            | The selected value. Used when the component is controlled |
