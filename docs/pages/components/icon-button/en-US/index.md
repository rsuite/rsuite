# IconButton

Icon button renders an icon within in a button.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### With text

<!--{include:`with-text.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Circle

<!--{include:`circle.md`}-->

### Sizes

<!--{include:`size.md`}-->

### Colors

<!--{include:`color.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Active

<!--{include:`active.md`}-->

### Loading

<!--{include:`loading.md`}-->

### Button group

<!--{include:`group.md`}-->

## Accessibility

### ARIA Properties

- IconButton has role of `button`.

### Keyboard interaction

- When IconButton has focus, <kbd>Space</kbd> or <kbd>Space</kbd> activates it.

## Props

### `<IconButton>`

| Property    | Type `(Default)`                                     | Description                                                    |
| ----------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| active      | boolean                                              | A button can show it is currently the active user selection    |
| appearance  | [Appearance](#code-ts-appearance-code) `('default')` | A button can have different appearances                        |
| as          | ElementType `('button')`                             | You can use a custom element for this component                |
| children    | ReactNode                                            | Primary content                                                |
| circle      | boolean                                              | Set circle button                                              |
| classPrefix | string `('btn-icon')`                                | The prefix of the component CSS class                          |
| color       | [Color](#code-ts-color-code)                         | A button can have different colors                             |
| disabled    | boolean                                              | A button can show it is currently unable to be interacted with |
| href        | string                                               | Providing a `href` will render an `a` element                  |
| icon        | Element&lt;typeof Icon&gt;                           | Set the icon of button                                         |
| loading     | boolean                                              | A button can show a loading indicator                          |
| placement   | 'left' \| 'right' `('left')`                         | The placement of icon                                          |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                | A button can have different sizes                              |

<!--{include:(_common/types/appearance.md)}-->
<!--{include:(_common/types/color.md)}-->
