# Calendar

A component that displays data by calendar

- `<Calendar>`

## Usage

```js
import { Calendar } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Calendar>`

| Property     | Type`(Default)`            | Description                                                                          |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------ |
| bordered     | boolean                    | Show border                                                                          |
| compact      | boolean                    | Display a compact calendar                                                           |
| defaultValue | Date                       | Default value                                                                        |
| isoWeek      | boolean                    | ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day |
| onChange     | (date:Date) => void        | Callback fired before the value changed                                              |
| onSelect     | (date:Date) => void        | Callback fired before the date selected                                              |
| renderCell   | (date: Date) => React.Node | Custom render calendar cells                                                         |
| value        | Date                       | Controlled value                                                                     |
