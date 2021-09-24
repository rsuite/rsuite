# Input

Instead of HTML native controls, input, textarea.

- `<Input>` The input box component.
- `<InputGroup>` The input box combination component.
- `<InputGroup.Button>` Combined with the button.
- `<InputGroup.Addon>` Custom additional elements.

## Import

<!--{include:(components/input/fragments/import.md)}-->

## Examples

### Default

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

## Props

### `<Input>`

| Property     | Type `(Default)`                      | Description                                      |
| ------------ | ------------------------------------- | ------------------------------------------------ |
| classPrefix  | string `('input')`                    | The prefix of the component CSS class            |
| defaultValue | string                                | Default value                                    |
| disabled     | boolean                               | Disabled component                               |
| onChange     | (value: string, event) => void        | The callback function in which value is changed. |
| size         | enum: 'lg', 'md', 'sm', 'xs' `('md')` | An input can have different sizes                |
| type         | string `('text' )`                    | HTML input type                                  |
| value        | string                                | Value (Controlled)                               |

### `<InputGroup>`

| Property    | Type `(Default)`                      | Description                             |
| ----------- | ------------------------------------- | --------------------------------------- |
| classPrefix | string `('input-group')`              | The prefix of the component CSS class   |
| inside      | boolean                               | Sets the composition content internally |
| size        | enum: 'lg', 'md', 'sm', 'xs' `('md')` | An input group can have different sizes |
