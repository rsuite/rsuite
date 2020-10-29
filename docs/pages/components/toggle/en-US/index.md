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

### Disabled and read only

<!--{include:`disabled.md`}-->

## Accessibility

- `Toggle` has role `switch`.
- When "on" state, `Toggle` has `aria-checked` set to `true`.
- When "off" state, `Toggle` has `aria-checked` set to `false`.
- All form controls should have labels, which can be implemented in the form through [`Form.ControlLabel`](./form#Accessibility). If you need to use it independently, you need to directly add attributes (`arial-label`, `aria-labelledby`).

```js
<Toggle arial-label="Switch" />
```

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
