# Button

Commonly used operating buttons, button combinations, button layouts.

- `<Button>` is the most basic element in the component, you can quickly create a styled button.
- `<IconButton>` Button with icon.
- `<ButtonGroup>` Button group control can put a group of buttons together and control the layout.
- `<ButtonToolbar>` Button Toolbar Controls.

## Import

```js
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';

// or
import Button from 'rsuite/lib/Button';
import IconButton from 'rsuite/lib/IconButton';
import ButtonGroup from 'rsuite/lib/ButtonGroup';
import ButtonToolbar from 'rsuite/lib/ButtonToolbar';
```

## Examples

<!--{demo}-->

## Props

### `<Button>`

| Property    | Type `(Default)`                                                         | Description                                                    |
| ----------- | ------------------------------------------------------------------------ | -------------------------------------------------------------- |
| active      | boolean                                                                  | A button can show it is currently the active user selection    |
| appearance  | enum: 'default', 'primary', 'link', 'subtle', 'ghost'<br/> `('default')` | A button can have different appearances                        |
| as          | React.ElementType `('button')`                                           | You can use a custom element for this component                |
| block       | boolean                                                                  | Spans the full width of the Button parent                      |
| children \* | React.Node                                                               | Primary content                                                |
| classPrefix | string `('btn')`                                                         | The prefix of the component CSS class                          |
| color       | enum: 'red', 'orange','yellow', 'green', <br/>'cyan', 'blue', 'violet'   | A button can have different colors                             |
| disabled    | boolean                                                                  | A button can show it is currently unable to be interacted with |
| href        | string                                                                   | Providing a `href` will render an `a` element                  |
| loading     | boolean                                                                  | A button can show a loading indicator                          |
| size        | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                    | A button can have different sizes                              |

### `<IconButton>`

`Iconbutton` extends all props of `Button`

| Property    | Type `(Default)`                 | Description                           |
| ----------- | -------------------------------- | ------------------------------------- |
| circle      | boolean                          | Set circle button                     |
| classPrefix | string `('btn-icon')`            | The prefix of the component CSS class |
| icon        | React.Element&lt;typeof Icon&gt; | Set the icon of button                |
| placement   | enum: 'left', 'right' `('left')` | The placement of icon                 |

### `<ButtonGroup>`

| Property    | Type `(Default)`             | Description                           |
| ----------- | ---------------------------- | ------------------------------------- |
| block       | boolean                      | Display block buttongroups            |
| classPrefix | string `('btn-group')`       | The prefix of the component CSS class |
| justified   | boolean                      | Horizontal constant width layout      |
| size        | enum: `lg`, `md`, `sm`, `xs` | Set button size                       |
| vertical    | boolean                      | Vertical layouts of button            |
