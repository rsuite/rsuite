# Link

Used to create a link.

## Import

<!--{include:<import-guide>}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Disabled

<!--{include:`disabled.md`}-->

### External Link

Set the `external` prop on Link to open in a new tab/window with `rel="noopener noreferrer"`. Use `showAnchorIcon` to display an external link icon.

<!--{include:`external.md`}-->

### Custom Anchor Icon

<!--{include:`custom-icon.md`}-->

### Underline

<!--{include:`underline.md`}-->

### Within Text

<!--{include:`within-text.md`}-->

### Routing Library

The Link component can be used with other routing libraries (such as Next.js, React Router) through the `as` prop. See the [Composition Guide](https://rsuitejs.com/guide/composition/#react-router-dom) for details.

<!--{include:`routing-library.md`}-->

## Props

### `<Link>`

| Property       | Type`(Default)`                               | Description                             |
| -------------- | --------------------------------------------- | --------------------------------------- |
| anchorIcon     | ReactNode                                     | The icon to be displayed after the link |
| as             | ElementType                                   | Custom element for component            |
| children       | ReactNode                                     | The content of the link                 |
| classPrefix    | string `('link')`                             | The prefix of the component CSS class   |
| disabled       | boolean                                       | Whether the link is disabled            |
| external       | boolean                                       | Whether it's an external link           |
| href           | string                                        | The URL of the link                     |
| showAnchorIcon | boolean                                       | Whether to display an anchor icon       |
| target         | string                                        | The target attribute of the link        |
| underline      | 'always' \| 'hover' \| 'not-hover' \| 'never' | Underline style                         |
