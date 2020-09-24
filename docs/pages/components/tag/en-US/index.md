# Tag

Tag for categorizing or markup.

## Import

<!--{include:(components/tag/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Colorful Tags

<!--{include:`color.md`}-->

### Dynamically tagging

<!--{include:`dynamic.md`}-->

## Props

### `<Tag>`

| Property    | Type `(Default)`      | Description                                          |
| ----------- | --------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')` | You can use a custom element type for this component |
| children \* | ReactNode             | The content of the component.                        |
| classPrefix | string `('tag')`      | The prefix of the component CSS class                |
| closable    | boolean               |
| onClose     | (event) => void       | Click the callback function for the Close button     |
