# Input

Instead of HTML native controls, input, textarea.

## Import

<!--{include:<import-guide>}-->

- `<Input>` The input box component.
- `<InputGroup>` The input box combination component.
- `<InputGroup.Button>` Combined with the button.
- `<InputGroup.Addon>` Custom additional elements.
- `<MaskedInput>` The input box component with mask.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

If you want to use the native DOM size attribute you can use the `htmlSize` prop.
For it to work as expected you will also need to provide the `style={{ width: 'auto' }}` prop.

```jsx
<Input htmlSize={10} style={{ width: 'auto' }} />
```

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

### Search

<!--{include:`input-group-search.md`}-->

### With Loader

<!--{include:`input-group-loader.md`}-->

### With Dropdown

<!--{include:`input-group-dropdown.md`}-->

### With Tooltip

<!--{include:`tooltip.md`}-->

### Masked Input

MaskedInput is an input mask component. It can create input masks for phone numbers, dates, currencies, zip codes, percentages, emails, and almost anything.

<!--{include:`masked-input.md`}-->

## Props

### `<Input>`

| Property     | Type `(Default)`                      | Description                                                          |
| ------------ | ------------------------------------- | -------------------------------------------------------------------- |
| as           | ElementType `('input')`               | You can use a custom element type for this component                 |
| classPrefix  | string `('input')`                    | The prefix of the component CSS class                                |
| defaultValue | string                                | Default value (uncontrolled)                                         |
| disabled     | boolean                               | Render the component in a disabled state                             |
| htmlSize     | number                                | Sets the native HTML size attribute.                                 |
| id           | string                                | The HTML input id                                                    |
| inputRef     | Ref                                   | A ref that points to the input element                               |
| onChange     | (value: string, event) => void        | Callback function when value changes                                 |
| plaintext    | boolean                               | Render the input as plaintext. Shows placeholder when value is empty |
| readOnly     | boolean                               | Render the component in a read-only state                            |
| size         | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | An input can have different sizes                                    |
| type         | string `('text')`                     | HTML input type                                                      |
| value        | string                                | Current value (controlled)                                           |

### `<InputGroup>`

| Property    | Type `(Default)`                      | Description                                          |
| ----------- | ------------------------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`                 | You can use a custom element type for this component |
| classPrefix | string `('input-group')`              | The prefix of the component CSS class                |
| disabled    | boolean                               | Render the input group in a disabled state           |
| inside      | boolean                               | Sets the composition content internally              |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | An input group can have different sizes              |

### `<InputGroup.Button>`

| Property    | Type `(Default)`             | Description                                 |
| ----------- | ---------------------------- | ------------------------------------------- |
| classPrefix | string `('input-group-btn')` | The prefix of the component CSS class       |
| ...         | [ButtonProps][ButtonProps]   | Extends all props from `<Button>` component |

[ButtonProps]: /components/button/#props

### `<InputGroup.Addon>`

| Property    | Type `(Default)`               | Description                                          |
| ----------- | ------------------------------ | ---------------------------------------------------- |
| as          | ElementType `('span')`         | You can use a custom element type for this component |
| classPrefix | string `('input-group-addon')` | The prefix of the component CSS class                |

### `<MaskedInput>`

| Property          | Type `(Default)`         | Description                                                                                             |
| ----------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| guide             | boolean                  | In guide mode or no guide mode                                                                          |
| keepCharPositions | boolean `(false)`        | When `true`, adding or deleting characters will not affect the position of existing characters.         |
| mask (\*)         | array \| function        | Used to define how to block user input.                                                                 |
| placeholderChar   | string `('_')`           | The placeholder character represents the fillable spot in the mask                                      |
| showMask          | boolean                  | When the input value is empty, the mask is displayed as a placeholder instead of a regular placeholder. |
| ...               | [InputProps][InputProps] | Extends all props from `<Input>` component. But does not have the `type` prop.                          |

[InputProps]: /components/input/#props
