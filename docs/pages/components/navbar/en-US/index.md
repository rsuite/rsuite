# Navbar

For navigation at the top of the page.

## Usage

<!--{include:<import-guide>}-->

- `<Navbar>` The navigation bar component.
- `<Navbar.Brand>` Set a brand, which can be your company, product or project name.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

`appearance` values include: `default`,`inverse`,`subtle`.

> In high-contrast theme, all appearances looks the same as `default`.

<!--{include:`appearance.md`}-->

## Props

### `<Navbar>`

| Property    | Type `(Default)`                                        | Description                                          |
| ----------- | ------------------------------------------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`                                   | You can use a custom element type for this component |
| appearance  | 'default' &#124; 'inverse' &#124; 'subtle'`('default')` | The appearance of the navigation bar                 |
| classPrefix | string `('navbar')`                                     | The prefix of the component CSS class                |
