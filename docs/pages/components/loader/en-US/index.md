# Loader

A component that provides state during data loading.

## Import

<!--{include:(components/loader/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Custom description

<!--{include:`content.md`}-->

### Size

<!--{include:`size.md`}-->

### Speed

<!--{include:`speed.md`}-->

### Center

<!--{include:`center.md`}-->

### Backdrop

<!--{include:`backdrop.md`}-->

### Inverse

<!--{include:`inverse.md`}-->

## Props

### `<Loader>`

| Property    | Type `(Default)`                                   | Description                                     |
| ----------- | -------------------------------------------------- | ----------------------------------------------- |
| backdrop    | boolean                                            | Whether the background is displayed             |
| center      | boolean                                            | Centered in the container                       |
| classPrefix | string                                             | The prefix of the component CSS class           |
| content     | ReactNode                                          | Custom descriptive text                         |
| inverse     | boolean                                            | An alternative dark visual style for the Loader |
| size        | enum: 'lg'&#124;'md'&#124;'sm'&#124;'xs' `('md')`  | Sets the loader dimensions                      |
| speed       | enum: 'fast'&#124;'normal'&#124;'slow'`('normal')` | The speed at which the loader rotates           |
| vertical    | boolean                                            | The icon is displayed vertically with the text  |
