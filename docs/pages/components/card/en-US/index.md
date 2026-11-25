# Card

Card is a container component for displaying data, which can contain multiple child components such as images, buttons, and text. It is used to display information in a structured way.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Shadow

<!--{include:`shadow.md`}-->

### Hover Shadow

<!--{include:`hover-shadow.md`}-->

### Sizes

<!--{include:`size.md`}-->

### With Avatar

<!--{include:`with-avatar.md`}-->

### With Image

<!--{include:`with-image.md`}-->

### Horizontal

<!--{include:`horizontal.md`}-->

### Placeholder

<!--{include:`placeholder.md`}-->

### Within Form

<!--{include:`within-form.md`}-->

### Card Group

<!--{include:`group.md`}-->

## Props

### `<Card>`

| Property    | Type`(Default)`      | Description                            |
| ----------- | -------------------- | -------------------------------------- |
| as          | ElementType `(div)`  | HTML tag of the component              |
| bordered    | boolean`(true)`      | Whether the card has a border          |
| children    | ReactNode            | The children of the component          |
| classPrefix | string `('card')`    | The prefix of the component class name |
| direction   | 'row' \| 'column'    | The direction of the card              |
| shaded      | boolean \| 'hover'   | Whether there is a shadow              |
| size        | 'sm' \| 'md' \| 'lg' | The size of the card                   |
| width       | string \| number     | The width of the card                  |

### `<Card.Header>`

| Property    | Type`(Default)`          | Description                            |
| ----------- | ------------------------ | -------------------------------------- |
| as          | ElementType `(div)`      | HTML tag of the component              |
| classPrefix | string `('card-header')` | The prefix of the component class name |
| children    | ReactNode                | The children of the component          |

### `<Card.Body>`

| Property    | Type`(Default)`        | Description                            |
| ----------- | ---------------------- | -------------------------------------- |
| as          | ElementType `(div)`    | HTML tag of the component              |
| classPrefix | string `('card-body')` | The prefix of the component class name |
| children    | ReactNode              | The children of the component          |

### `<Card.Footer>`

| Property    | Type`(Default)`          | Description                            |
| ----------- | ------------------------ | -------------------------------------- |
| as          | ElementType `(div)`      | HTML tag of the component              |
| classPrefix | string `('card-footer')` | The prefix of the component class name |
| children    | ReactNode                | The children of the component          |

### `<CardGroup>`

| Property    | Type`(Default)`         | Description                            |
| ----------- | ----------------------- | -------------------------------------- |
| as          | ElementType `(div)`     | HTML tag of the component              |
| classPrefix | string `('card-group')` | The prefix of the component class name |
| children    | ReactNode               | The children of the component          |
| columns     | number                  | The number of columns of the group     |
| spacing     | number `(16)`           | The spacing between the stats          |
