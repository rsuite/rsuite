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

### Divided button

<!--{include:`divided.md`}-->

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

| Property    | Type `(Default)`                      | Description                                                                                |
| ----------- | ------------------------------------- | ------------------------------------------------------------------------------------------ |
| block       | boolean                               | Display the button group as a full-width block element spanning the entire container width |
| classPrefix | string `('btn-group')`                | Custom CSS class prefix for styling flexibility and theme customization                    |
| disabled    | boolean                               | Disable all buttons within the group                                                       |
| divided     | boolean                               | Display buttons in a divided layout                                                        |
| justified   | boolean                               | Distribute buttons evenly with equal width in horizontal layout                            |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs' `('md')` | Uniform size for all buttons in the group (large/medium/small/extra-small)                 |
| vertical    | boolean                               | Display buttons in a vertical stacked layout                                               |
