# Placeholder

Placeholder before component loaded.

- `<Placeholder.Paragraph>` Paragraph placeholder
- `<Placeholder.Graph>` Graph placeholder
- `<Placeholder.Grid>` Grid placeholder

## Usage

```js
import { Placeholder } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Placeholder.Paragraph>`

| Property  | Type `(Default)`                           | Description    |
| --------- | ------------------------------------------ | -------------- |
| rows      | number `(2)`                               | number of rows |
| rowHeight | number `(10)`                              | height of rows |
| rowMargin | number `(20)`                              | margin of rows |
| graph     | boolean / enums: 'circle','square','image' | show graph     |
| active    | boolean                                    | play animation |

### `<Placeholder.Grid>`

| Property  | Type `(Default)` | Description       |
| --------- | ---------------- | ----------------- |
| rows      | number `(5)`     | number of rows    |
| columns   | number `(5)`     | number of columns |
| rowHeight | number `(10)`    | height of rows    |
| rowMargin | number `(20)`    | margin of rows    |
| active    | boolean          | play animation    |

### `<Placeholder.Graph>`

| Property | Type `(Default)`       | Description    |
| -------- | ---------------------- | -------------- |
| width    | number/string `(100%)` | graph width    |
| height   | number `(200)`         | graph height   |
| active   | boolean                | play animation |
