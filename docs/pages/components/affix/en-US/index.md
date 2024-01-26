# Affix

Components such as navigation, buttons, etc. can be fixed in the visible range. Commonly used for pages with long content, fixed the specified elements in the visible range of the page to assist in quick operation.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Top

<!--{include:`top.md`}-->

### Container

When the container is in the visible range, the element is fixed. When the scrolling page container is not in the visible range, the element is unfixed.

<!--{include:`container.md`}-->

## Props

### `<Affix>`

| Property    | Type`(Default)`                        | Description                                                                                     |
| ----------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| children    | ReactNode                              | Fixed element.                                                                                  |
| classPrefix | string `('affix')`                     | The prefix of the component CSS class.                                                          |
| container   | HTMLElement &#124; (() => HTMLElement) | Specify the container. An element can only be fixed when the container is in the visible range. |
| onChange    | (fixed: boolean) => voide              | Callback function when non-fixed and fixed state changes.                                       |
| top         | number `(0)`                           | Set the fixed top height.                                                                       |
