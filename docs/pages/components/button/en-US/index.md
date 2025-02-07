# Button

Commonly used operating buttons。

## Import

<!--{include:<import-guide>}-->

- `<Button>` is the most basic element in the component, you can quickly create a styled button.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

`appearance` property sets the button style, options includes: `default`, `primary`, `link`, `subtle`, `ghost`.

<!--{include:`appearance.md`}-->

### Sizes

The `size` property sets the button size, options includes: `lg`, `md`, `sm`, `xs`.

<!--{include:`size.md`}-->

### Colors

The `color` property sets the button style, Options include: `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `violet`.

<!--{include:`color.md`}-->

### Icon before

Display an icon before the text.

<!--{include:`with-icon-before.md`}-->

### Icon after

Display an icon after the text.

<!--{include:`with-icon-after.md`}-->

### Block

This is generally applicable to flow layouts, or to full rows at the top and bottom of a container.

<!--{include:`block.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Active

<!--{include:`active.md`}-->

### Toggleable

The Button is `toggleable`, allowing you to switch its state between active and inactive.

<!--{include:`toggleable.md`}-->

### Loading

<!--{include:`loading.md`}-->

## Accessibility

### ARIA Properties

- Button has role of `button`.

### Keyboard interaction

- When Button has focus, <kbd>Space</kbd> or <kbd>Enter</kbd> activates it.

## Props

### `<Button>`

| Property    | Type `(Default)`                                     | Description                                                                           |
| ----------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| active      | boolean                                              | A button can show it is currently the active user selection                           |
| appearance  | [Appearance](#code-ts-appearance-code) `('default')` | A button can have different appearances                                               |
| as          | ElementType `('button')`                             | You can use a custom element for this component                                       |
| block       | boolean                                              | Spans the full width of the Button parent                                             |
| children    | ReactNode                                            | Primary content                                                                       |
| classPrefix | string `('btn')`                                     | The prefix of the component CSS class                                                 |
| color       | [Color](#code-ts-color-code)                         | A button can have different colors                                                    |
| disabled    | boolean                                              | A button can show it is currently unable to be interacted with                        |
| endIcon     | ReactNode                                            | Display an icon after buttont text                                                    |
| href        | string                                               | Providing a `href` will render an `a` element                                         |
| loading     | boolean                                              | A button can show a loading indicator                                                 |
| onToggle    | (active: boolean, event: MouseEvent) => void         | Callback when the button is toggled between active and inactive states<br/>![][6.0.0] |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                | A button can have different sizes                                                     |
| startIcon   | ReactNode                                            | Display an icon before buttont text                                                   |
| toggleable  | boolean                                              | A button can switch between active and inactive states<br/>![][6.0.0]                 |

<!--{include:(_common/types/appearance.md)}-->
<!--{include:(_common/types/color.md)}-->

[6.0.0]: https://img.shields.io/badge/>=-v6.0.0-blue
