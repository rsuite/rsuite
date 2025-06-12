# Button Group

A button group gives users access to frequently performed, related actions.

## Import

<!--{include:<import-guide>}-->

- `ButtonGroup` Button group control can put a group of buttons together and control the layout.
- `ButtonToolbar` Button Toolbar Controls.

## Examples

### Group

Group related buttons together for better visual organization.

<!--{include:`group.md`}-->

### Sizes

Set the size for all buttons in the group with the `size` prop.

<!--{include:`size.md`}-->

### Appearance

Customize the button style using the `appearance` prop.

<!--{include:`appearance.md`}-->

### Vertical

Stack buttons vertically using the `vertical` prop.

<!--{include:`vertical.md`}-->

### Divided

Add dividers between buttons with the `divided` prop.

<!--{include:`divided.md`}-->

### Split Button

Create a split button dropdown by combining Button and Menu components.

<!--{include:`split-button.md`}-->

### Button Toolbar

Group multiple button groups together using the `ButtonToolbar` component.

<!--{include:`toolbar.md`}-->

### Justified

The buttons are laid out horizontally in the button set and are equally wide.

<!--{include:`justified.md`}-->

### Icons

Use icons within button groups for better visual hierarchy and recognition.

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

### `<ButtonToolbar>`

| Property | Type `(Default)`          | Description                                           |
| -------- | ------------------------- | ----------------------------------------------------- |
| ...      | [StackProps][stack-props] | Inherit all properties from [Stack][stack] component. |

[stack-props]: https://rsuitejs.com/components/stack/#code-lt-stack-gt-code
[stack]: https://rsuitejs.com/components/stack
