# Button

Commonly used operating buttons, button combinations, button layouts.

## Import

<!--{include:<import-guide>}-->

- `<Button>` is the most basic element in the component, you can quickly create a styled button.
- `<ButtonGroup>` Button group control can put a group of buttons together and control the layout.
- `<ButtonToolbar>` Button Toolbar Controls.

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

### Custom combination button

<!--{include:`custom.md`}-->

### Block

This is generally applicable to flow layouts, or to full rows at the top and bottom of a container.

<!--{include:`block.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### Active

<!--{include:`active.md`}-->

### Loading

<!--{include:`loading.md`}-->

### Button group

<!--{include:`group.md`}-->

### Vertical group

<!--{include:`vertical.md`}-->

### Split button

<!--{include:`split-button.md`}-->

### Button toolbar

<!--{include:`toolbar.md`}-->

### Justified

The buttons are laid out horizontally in the button set and are equally wide.

<!--{include:`justified.md`}-->

## Accessibility

### ARIA Properties

- Button has role of `button`.

### Keyboard interaction

- When Button has focus, <kbd>Space</kbd> or <kbd>Space</kbd> activates it.

## Props

### `<Button>`

| Property    | Type `(Default)`                                     | Description                                                    |
| ----------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| active      | boolean                                              | A button can show it is currently the active user selection    |
| appearance  | [Appearance](#code-ts-appearance-code) `('default')` | A button can have different appearances                        |
| as          | ElementType `('button')`                             | You can use a custom element for this component                |
| block       | boolean                                              | Spans the full width of the Button parent                      |
| children    | ReactNode                                            | Primary content                                                |
| classPrefix | string `('btn')`                                     | The prefix of the component CSS class                          |
| color       | [Color](#code-ts-color-code)                         | A button can have different colors                             |
| disabled    | boolean                                              | A button can show it is currently unable to be interacted with |
| endIcon     | ReactNode                                            | Display an icon after buttont text                             |
| href        | string                                               | Providing a `href` will render an `a` element                  |
| loading     | boolean                                              | A button can show a loading indicator                          |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')`                | A button can have different sizes                              |
| startIcon   | ReactNode                                            | Display an icon before buttont text                            |

### `<ButtonGroup>`

| Property    | Type `(Default)`                      | Description                           |
| ----------- | ------------------------------------- | ------------------------------------- |
| block       | boolean                               | Display block buttongroups            |
| classPrefix | string `('btn-group')`                | The prefix of the component CSS class |
| justified   | boolean                               | Horizontal constant width layout      |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | Set button size                       |
| vertical    | boolean                               | Vertical layouts of button            |

<!--{include:(_common/types/appearance.md)}-->
<!--{include:(_common/types/color.md)}-->
