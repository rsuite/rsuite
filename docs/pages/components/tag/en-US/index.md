# Tag

Tag for categorizing or markup.

## Import

<!--{include:<import-guide>}-->

- `<Tag>`
- `<TagGroup>`

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Colorful Tags

<!--{include:`color.md`}-->

### Dynamically tagging

<!--{include:`dynamic.md`}-->

## Props

### `<Tag>`

<!-- prettier-sort-markdown-table -->

| Property    | Type `(Default)`              | Description                                          |
| ----------- | ----------------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`         | You can use a custom element type for this component |
| children \* | ReactNode                     | The content of the component.                        |
| classPrefix | string `('tag')`              | The prefix of the component CSS class                |
| closable    | boolean                       | Whether to display the Close button                  |
| color       | [Color](#code-ts-color-code)  | Set the tag color                                    |
| onClose     | (event) => void               | Click the callback function for the Close button     |
| size        | 'sm' \| 'md' \| 'lg' `('md')` | Set the tag size                                     |

### `<TagGroup>`

<!-- prettier-sort-markdown-table -->

| Property    | Type `(Default)`       | Description                                          |
| ----------- | ---------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`  | You can use a custom element type for this component |
| children \* | ReactNode              | The content of the component.                        |
| classPrefix | string `('tag-group')` | The prefix of the component CSS class                |

<!--{include:(_common/types/color.md)}-->
