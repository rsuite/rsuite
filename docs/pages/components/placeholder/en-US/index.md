# Placeholder

Placeholder before component loaded.

## Import

<!--{include:<import-guide>}-->

- `<Placeholder.Paragraph>` Paragraph placeholder
- `<Placeholder.Graph>` Graph placeholder
- `<Placeholder.Grid>` Grid placeholder

## Examples

### Paragraph

<!--{include:`paragraph.md`}-->

### Paragraph with Image

<!--{include:`paragraph-image.md`}-->

### Paragraph with Circle

<!--{include:`paragraph-graph.md`}-->

### Paragraph with Square

<!--{include:`paragraph-square.md`}-->

### Grid or Table

<!--{include:`grid.md`}-->

### Graph

<!--{include:`graph.md`}-->

### Square Graph

<!--{include:`graph-square.md`}-->

## Props

### `<Placeholder.Paragraph>`

| Property    | Type `(Default)`                           | Description                            |
| ----------- | ------------------------------------------ | -------------------------------------- |
| as          | ElementType `('div')`                      | You can use a custom element type.     |
| className   | string                                     | The class name of the component.       |
| classPrefix | string `('placeholder')`                   | The prefix of the component CSS class. |
| rows        | number `(2)`                               | The number of rows.                    |
| rowHeight   | number `(10)`                              | The height of the row.                 |
| rowSpacing  | number `(20)`                              | The spacing between rows.              |
| graph       | boolean \| 'circle' \| 'square' \| 'image' | The shape of the graph.                |
| active      | boolean                                    | Whether the placeholder is active.     |

### `<Placeholder.Grid>`

| Property    | Type `(Default)`         | Description                            |
| ----------- | ------------------------ | -------------------------------------- |
| as          | ElementType              | You can use a custom element type.     |
| className   | string                   | The class name of the component.       |
| classPrefix | string `('placeholder')` | The prefix of the component CSS class. |
| rows        | number `(5)`             | The number of rows.                    |
| columns     | number `(5)`             | The number of columns.                 |
| rowHeight   | number `(10)`            | The height of the row.                 |
| rowSpacing  | number `(20)`            | The spacing between rows.              |
| active      | boolean                  | Whether the placeholder is active.     |

### `<Placeholder.Graph>`

| Property    | Type `(Default)`          | Description                            |
| ----------- | ------------------------- | -------------------------------------- |
| as          | ElementType               | You can use a custom element type.     |
| className   | string                    | The class name of the component.       |
| classPrefix | string `('placeholder')`  | The prefix of the component CSS class. |
| width       | number \| string `(100%)` | The graph width.                       |
| height      | number `(200)`            | The graph height.                      |
| active      | boolean                   | Whether the placeholder is active.     |
