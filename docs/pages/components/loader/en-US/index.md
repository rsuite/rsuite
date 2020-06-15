# Loader

A component that provides state during data loading.

* `<Loader>`

## Usage

```js
import { Loader } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Loader>`

| Property    | Type `(Default)`                        | Description                                     |
| ----------- | --------------------------------------- | ----------------------------------------------- |
| backdrop    | boolean                                 | Whether the background is displayed             |
| center      | boolean                                 | Centered in the container                       |
| classPrefix | string                                  | The prefix of the component CSS class           |
| content     | React.Node                              | Custom descriptive text                         |
| inverse     | boolean                                 | An alternative dark visual style for the Loader |
| size        | enum: 'lg', 'md', 'sm', 'xs'`('md')`    | Sets the loader dimensions                      |
| speed       | enum:'fast','normal','slow'`('normal')` | The speed at which the loader rotates           |
| vertical    | boolean                                 | The icon is displayed vertically with the text  |
