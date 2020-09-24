# Toggle

Used to select between two values.

## Import

<!--{include:(components/toggle/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Size

The `size` property sets the switch size, and the value includes: `lg`、`md`、`sm`.

<!--{include:`size.md`}-->

### Text and icon

Can be set by the `checkedchildren`, `uncheckedchildren` two properties, respectively, the display of the toggle state.

<!--{include:`inner.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

## Props

### `<Toggle>`

| Property          | Type `(Default)`                   | Description                           |
| ----------------- | ---------------------------------- | ------------------------------------- |
| checked           | boolean                            | Checked（Controlled）                 |
| checkedChildren   | ReactNode                          | Checked display content               |
| classPrefix       | string `'toggle'`                  | The prefix of the component CSS class |
| defaultChecked    | boolean                            | Default checked                       |
| disabled          | boolean                            | Disabled                              |
| onChange          | (checked: boolean, event) => void  | Callback function when state changes  |
| size              | enum: 'lg' &#124; 'md' &#124; 'sm' | Toggle size                           |
| unCheckedChildren | ReactNode                          | Unselected display content            |
