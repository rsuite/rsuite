# Heading

A heading is a title or subtitle at the beginning of a page, section, or subsection.

## Import

<!--{include:<import-guide>}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Level

<!--{include:`level.md`}-->

### Heading Group

<!--{include:`subheading.md`}-->

## Props

### `<Heading>`

| Property    | Type`(Default)`      | Description                            |
| ----------- | -------------------- | -------------------------------------- |
| children    | React.Node           | The content of the heading.            |
| classPrefix | string `('heading')` | The prefix of the component CSS class. |
| level       | number`(3)`          | The level of the heading.              |

### `<HeadingGroup>`

| Property    | Type`(Default)`            | Description                            |
| ----------- | -------------------------- | -------------------------------------- |
| children    | React.Node                 | The content of the heading group.      |
| classPrefix | string `('heading-group')` | The prefix of the component CSS class. |
