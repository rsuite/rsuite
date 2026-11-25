# Textarea

A flexible textarea component for multi-line text input. Supports autosizing to fit content, customizable size, and resize controls.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Auto resize

<!--{include:`autosize.md`}-->

### Resize

<!--{include:`resize.md`}-->

## Props

### `<Textarea>`

| Property     | Type (Default)                                          | Description                                 |
| ------------ | ------------------------------------------------------- | ------------------------------------------- |
| as           | ElementType `('textarea')`                              | Custom element type for the component       |
| autosize     | boolean                                                 | Whether to auto resize the textarea height  |
| classPrefix  | string `('textarea')`                                   | The prefix of the component CSS class       |
| defaultValue | string                                                  | Default value (uncontrolled)                |
| disabled     | boolean                                                 | Disabled state                              |
| maxRows      | number                                                  | Maximum number of rows for auto resize      |
| minRows      | number                                                  | Minimum number of rows for auto resize      |
| onChange     | (value: string, event) => void                          | Callback when value changes                 |
| placeholder  | string                                                  | Placeholder text                            |
| readOnly     | boolean                                                 | Read-only state                             |
| resize       | 'none' \| 'both' \| 'horizontal' \| 'vertical' `(none)` | Whether to allow the textarea to be resized |
| rows         | number `(3)`                                            | Number of visible text lines                |
| size         | 'xs' \| 'sm' \| 'md' \| 'lg' `(md)`                     | The size of the textarea                    |
| value        | string                                                  | Value (controlled)                          |
