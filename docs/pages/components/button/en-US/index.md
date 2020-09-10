# Button

Commonly used operating buttons, button combinations, button layouts.

- `<Button>` is the most basic element in the component, you can quickly create a styled button.
- `<IconButton>` Button with icon.
- `<ButtonGroup>` Button group control can put a group of buttons together and control the layout.
- `<ButtonToolbar>` Button Toolbar Controls.

## Import

<!--{include:(components/button/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Appearance

`appearance` property can set appearance of button:

- 'default'(default) default button.
- 'primary' Emphasi, guide button.
- 'link' Button like link.
- 'subtle' Weakened button.
- 'ghost' Ghost button, background transparent, place button on background element.

<!--{include:`appearance.md`}-->

### Size

The `size` property sets the button size, options includes: 'lg', 'md', 'sm', 'xs'.

<!--{include:`size.md`}-->

### Colorful button

The `color` property sets the button style, Options include: 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'.

<!--{include:`color.md`}-->

### Custom combination button

<!--{include:`custom.md`}-->

### Icon button

`<IconButton>` is a component designed for icon buttons that sets the icon required for the `Icon` property definition. Only the icon button can be set to a round button.

<!--{include:`icon-button.md`}-->

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

<!--{include:`group-basic.md`}-->

### Vertical

<!--{include:`vertical.md`}-->

### Button toolbar

<!--{include:`toolbar.md`}-->

### Justified

The buttons are laid out horizontally in the button set and are equally wide.

<!--{include:`justified.md`}-->

## Props

<!--{include:(_common/types/appearance.md)}-->
<!--{include:(_common/types/color.md)}-->

### `<Button>`

| Property    | Type `(Default)`                                  | Description                                                    |
| ----------- | ------------------------------------------------- | -------------------------------------------------------------- |
| active      | boolean                                           | A button can show it is currently the active user selection    |
| appearance  | Appearance `('default')`                          | A button can have different appearances                        |
| as          | ElementType `('button')`                          | You can use a custom element for this component                |
| block       | boolean                                           | Spans the full width of the Button parent                      |
| children \* | ReactNode                                         | Primary content                                                |
| classPrefix | string `('btn')`                                  | The prefix of the component CSS class                          |
| color       | Color                                             | A button can have different colors                             |
| disabled    | boolean                                           | A button can show it is currently unable to be interacted with |
| href        | string                                            | Providing a `href` will render an `a` element                  |
| loading     | boolean                                           | A button can show a loading indicator                          |
| size        | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | A button can have different sizes                              |

### `<IconButton>`

`Iconbutton` extends all props of `Button`

| Property    | Type `(Default)`                     | Description                           |
| ----------- | ------------------------------------ | ------------------------------------- |
| circle      | boolean                              | Set circle button                     |
| classPrefix | string `('btn-icon')`                | The prefix of the component CSS class |
| icon        | Element&lt;typeof Icon&gt;           | Set the icon of button                |
| placement   | enum: 'left'&#124;'right' `('left')` | The placement of icon                 |

### `<ButtonGroup>`

| Property    | Type `(Default)`                                  | Description                           |
| ----------- | ------------------------------------------------- | ------------------------------------- |
| block       | boolean                                           | Display block buttongroups            |
| classPrefix | string `('btn-group')`                            | The prefix of the component CSS class |
| justified   | boolean                                           | Horizontal constant width layout      |
| size        | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')` | Set button size                       |
| vertical    | boolean                                           | Vertical layouts of button            |
