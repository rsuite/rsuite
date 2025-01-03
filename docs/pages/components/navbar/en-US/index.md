# Navbar

For navigation at the top of the page.

## Usage

<!--{include:<import-guide>}-->

- `<Navbar>` The navigation bar component.
- `<Navbar.Brand>` Set a brand, which can be your company, product or project name.
- `<Navbar.Content>` The navigation bar content container, which groups a set of elements together.
- `<Navbar.Toggle>` The button to show the drawer menu on small screens.
- `<Navbar.Drawer>` The drawer menu container.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

`appearance` property sets the appearance of the navigation bar:

- `default` (default) Default navigation bar.
- `inverse` Inverted navigation bar.
- `subtle` Subtle navigation bar.

<!--{include:`appearance.md`}-->

### Search

<!--{include:`search.md`}-->

### Subnav

<!--{include:`subnav.md`}-->

### With Drawer Menu

<!--{include:`with-drawer.md`}-->

### Responsive

Use `useMediaQuery` to make the navigation bar responsive.

<!--{include:`responsive.md`}-->

## Props

### `<Navbar>`

| Property           | Type `(Default)`                                        | Description                                                       |
| ------------------ | ------------------------------------------------------- | ----------------------------------------------------------------- |
| as                 | ElementType `('div')`                                   | You can use a custom element type for this component              |
| appearance         | 'default' &#124; 'inverse' &#124; 'subtle'`('default')` | The appearance of the navigation bar                              |
| classPrefix        | string `('navbar')`                                     | The prefix of the component CSS class                             |
| onDrawerOpenChange | (open: boolean) => void                                 | Callback when the drawer menu is opened or closed<br/> ![][6.0.0] |

### `<Navbar.Brand>`

| Property    | Type `(Default)`          | Description                                          |
| ----------- | ------------------------- | ---------------------------------------------------- |
| as          | ElementType `('a')`       | You can use a custom element type for this component |
| href        | string                    | The URL of the brand link                            |
| classPrefix | string `('navbar-brand')` | The prefix of the component CSS class                |
| children    | ReactNode                 | The content of the brand                             |

### `<Navbar.Content>`

![][6.0.0]

| Property    | Type `(Default)`            | Description                                          |
| ----------- | --------------------------- | ---------------------------------------------------- |
| as          | ElementType `('div')`       | You can use a custom element type for this component |
| classPrefix | string `('navbar-content')` | The prefix of the component CSS class                |
| children    | ReactNode                   | The content of the brand                             |

### `<Navbar.Toggle>`

![][6.0.0]

Exdends [`IconButton`](/components/icon-button)

### `<Navbar.Drawer>`

![][6.0.0]

Exdends [`Drawer`](/components/drawer)

[6.0.0]: https://img.shields.io/badge/>=-v6.0.0-blue
