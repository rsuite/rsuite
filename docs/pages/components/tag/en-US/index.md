# Tag

Tag for categorizing or markup.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

Adjust tag size with the `size` prop (options: 'sm', 'md', 'lg').

<!--{include:`size.md`}-->

### Colorful Tags

Customize tag colors using the `color` property. Supports preset theme colors or custom CSS colors. When setting custom colors, the text color is automatically calculated based on contrast.

<!--{include:`color.md`}-->

### Dynamically tagging

Create an interactive interface for adding and removing tags with the `closable` property and `onClose` callback.

<!--{include:`dynamic.md`}-->

## Props

### `<Tag>`

| Property    | Type `(Default)`                                       | Description                                                     |
| ----------- | ------------------------------------------------------ | --------------------------------------------------------------- |
| as          | ElementType `('div')`                                  | You can use a custom element type for this component            |
| children \* | ReactNode                                              | The content of the component.                                   |
| classPrefix | string `('tag')`                                       | The prefix of the component CSS class                           |
| closable    | boolean                                                | Whether to display the Close button                             |
| color       | [Color](#code-ts-color-code) \| CSSProperties['color'] | Set the tag color, supports preset colors and custom CSS colors |
| onClose     | (event) => void                                        | Click the callback function for the Close button                |
| size        | 'sm' \| 'md' \| 'lg' `('md')`                          | Set the tag size                                                |

### `<TagGroup>`

| Property    | Type `(Default)`       | Description                                          |
| ----------- | ---------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`  | You can use a custom element type for this component |
| children \* | ReactNode              | The content of the component.                        |
| classPrefix | string `('tag-group')` | The prefix of the component CSS class                |

### Type definitions

<!--{include:(_common/types/color.md)}-->
