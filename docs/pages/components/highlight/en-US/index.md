# Highlight

Used to mark or highlight matched text content. For example, used to highlight search results.

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

| Property    | Type`(Default)`                             | Description                            |
| ----------- | ------------------------------------------- | -------------------------------------- |
| children    | ReactNode                                   | The content to highlight.              |
| classPrefix | string `('highlight')`                      | The prefix of the component CSS class. |
| query       | string \| string[]                          | The keyword to highlight.              |
| renderMark  | (match: string, index: number) => ReactNode | Custom render the highlight mark.      |
