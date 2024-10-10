# Button Group

A button group gives users access to frequently performed, related actions.

## Import

<!--{include:<import-guide>}-->

- `<ButtonGroup>` Button group control can put a group of buttons together and control the layout.
- `<ButtonToolbar>` Button Toolbar Controls.

## Examples

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

### Icons

<!--{include:`icon-group.md`}-->

## Accessibility

### ARIA Properties

- ButtonGroup has a `group` role.

## Props

### `<ButtonGroup>`

| Property    | Type `(Default)`                      | Description                           |
| ----------- | ------------------------------------- | ------------------------------------- |
| block       | boolean                               | Display block buttongroups            |
| classPrefix | string `('btn-group')`                | The prefix of the component CSS class |
| justified   | boolean                               | Horizontal constant width layout      |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | Set button size                       |
| vertical    | boolean                               | Vertical layouts of button            |
