# Loader

A component that provides state during data loading.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

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

## Accessibility

### ARIA Roles

- Loader has `role` of `status`.
- When the Loader has a `content` attribute, the `aria-labelledby` attribute is set to the `id` of the `content` element.

## Props

### `<Loader>`

| Property    | Type `(Default)`                                     | Description                                     |
| ----------- | ---------------------------------------------------- | ----------------------------------------------- |
| backdrop    | boolean                                              | Whether the background is displayed             |
| center      | boolean                                              | Centered in the container                       |
| classPrefix | string                                               | The prefix of the component CSS class           |
| content     | ReactNode                                            | Custom descriptive text                         |
| inverse     | boolean                                              | An alternative dark visual style for the Loader |
| size        | 'lg' \| 'md' \| 'sm' \| 'xs'`('md')`                 | Sets the loader dimensions                      |
| speed       | 'fast' \| 'normal' \| 'slow' \| 'paused'`('normal')` | The speed at which the loader rotates           |
| vertical    | boolean                                              | The icon is displayed vertically with the text  |
