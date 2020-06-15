# Toggle

Used to select between two values.

## Usage

```js
import { Toggle } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Toggle>`

| Property          | Type `(Default)`                                  | Description                           |
| ----------------- | ------------------------------------------------- | ------------------------------------- |
| checked           | boolean                                           | Checked（Controlled）                 |
| checkedChildren   | React.Node                                        | Checked display content               |
| classPrefix       | string `'toggle'`                                 | The prefix of the component CSS class |
| defaultChecked    | boolean                                           | Default checked                       |
| disabled          | boolean                                           | Disabled                              |
| onChange          | (checked: boolean, event: SyntheticEvent) => void | Callback function when state changes  |
| size              | enum: 'lg', 'md', 'sm'                            | Toggle size                           |
| unCheckedChildren | React.Node                                        | Unselected display content            |
