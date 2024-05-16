# Highlight

Highlight the matching text in the content.

## Import

<!--{include:<import-guide>}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Highlight with multiple words

<!--{include:`multiple-words.md`}-->

### Custom Highlight

<!--{include:`custom.md`}-->

### Combine with search

<!--{include:`search.md`}-->

## Props

### `<Highlight>`

| Property    | Type`(Default)`        | Description                            |
| ----------- | ---------------------- | -------------------------------------- |
| children    | React.Node             | The content to highlight.              |
| classPrefix | string `('highlight')` | The prefix of the component CSS class. |
| query       | string[]               | The array of words to highlight.       |
| renderMark  | Function               | Custom render the highlight mark.      |
