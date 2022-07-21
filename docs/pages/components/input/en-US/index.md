# Input

Instead of HTML native controls, input, textarea.

- `<Input>` The input box component.
- `<InputGroup>` The input box combination component.
- `<InputGroup.Button>` Combined with the button.
- `<InputGroup.Addon>` Custom additional elements.
- `<MaskedInput>` The input box component with mask.

## Import

<!--{include:(components/input/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Textarea

<!--{include:`textarea.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Input Group

<!--{include:`input-group.md`}-->

### Inside

<!--{include:`input-group-inside.md`}-->

### With Button

<!--{include:`input-group-button.md`}-->

### Password

<!--{include:`input-group-password.md`}-->

### With Tooltip

<!--{include:`tooltip.md`}-->

### Masked Input

MaskedInput is an input mask component. It can create input masks for phone numbers, dates, currencies, zip codes, percentages, emails, and almost anything.

<!--{include:`masked-input.md`}-->

## Props

### `<Input>`

| Property     | Type `(Default)`                                  | Description                                      |
| ------------ | ------------------------------------------------- | ------------------------------------------------ |
| classPrefix  | string `('input')`                                | The prefix of the component CSS class            |
| defaultValue | string                                            | Default value                                    |
| disabled     | boolean                                           | Disabled component                               |
| onChange     | (value: string, event) => void                    | The callback function in which value is changed. |
| size         | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')` | An input can have different sizes                |
| type         | string `('text' )`                                | HTML input type                                  |
| value        | string                                            | Value (Controlled)                               |

### `<InputGroup>`

| Property    | Type `(Default)`                                  | Description                             |
| ----------- | ------------------------------------------------- | --------------------------------------- |
| classPrefix | string `('input-group')`                          | The prefix of the component CSS class   |
| inside      | boolean                                           | Sets the composition content internally |
| size        | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')` | An input group can have different sizes |

### `<MaskedInput>`

`MaskedInput` extends all props of `Input`. But does not have the `type` prop.

| Property          | Type `(Default)`      | Description                                                                                             |
| ----------------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| mask (\*)         | array &#124; function | Used to define how to block user input.                                                                 |
| guide             | boolean               | In guide mode or no guide mode                                                                          |
| placeholderChar   | string `('_')`        | The placeholder character represents the fillable spot in the mask                                      |
| keepCharPositions | boolean `(false)`     | When `true`, adding or deleting characters will not affect the position of existing characters.         |
| showMask          | boolean               | When the input value is empty, the mask is displayed as a placeholder instead of a regular placeholder. |
