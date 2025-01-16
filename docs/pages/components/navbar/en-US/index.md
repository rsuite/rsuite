# Navbar

A wrapper for Nav that is generally used for the top navigation of a page.

## Import

<!--{include:<import-guide>}-->

- `<Navbar>` The navigation bar component.
- `<Navbar.Brand>` Set up your brand, which can be the name of your company, product, or project.
- `<Navbar.Content>` Navigation bar content container, group a set of elements together.
- `<Navbar.Toggle>` Button to show drawer menu on small screens.
- `<Navbar.Drawer>` Drawer menu container.

## Examples

### Default

<!--{include:`basic.md`}-->

### Appearance

The `appearance` property sets the navigation bar appearance:

- 'default' (default value) Default navigation bar.
- 'inverse' Inverse color navigation bar.
- 'subtle' Subtle navigation bar.

<!--{include:`appearance.md`}-->

### Search

<!--{include:`search.md`}-->

### Sub Nav

<!--{include:`subnav.md`}-->

### With Drawer

<!--{include:`with-drawer.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

You can use the `visible` and `hidden` props to control visibility at different breakpoints:

```jsx
// Show on small screens
<Navbar.Content visible="sm">
  {/* Content for small screens */}
</Navbar.Content>

// Hide on small screens
<Navbar.Content hidden="sm">
  {/* Content for large screens */}
</Navbar.Content>
```

## Props

### `<Navbar>`

| Property name      | Type `(Default)`                                | Description                                               |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------- |
| as                 | ElementType `('div')`                           | Custom element type                                       |
| appearance         | 'default' \| 'inverse' \| 'subtle'`('default')` | Navigation bar appearance                                 |
| classPrefix        | string `('navbar')`                             | The prefix of the component CSS class                     |
| onDrawerOpenChange | (open: boolean) => void                         | Callback when drawer menu opens or closes<br/> ![][6.0.0] |

### `<Navbar.Brand>`

| Property name | Type `(Default)`          | Description                 |
| ------------- | ------------------------- | --------------------------- |
| as            | ElementType `('a')`       | Custom element type         |
| href          | string                    | The URL of the brand link   |
| classPrefix   | string `('navbar-brand')` | The prefix of the CSS class |
| children      | ReactNode                 | Brand content               |

### `<Navbar.Content>`

![][6.0.0]

| Property name | Type `(Default)`                              | Description                          |
| ------------- | --------------------------------------------- | ------------------------------------ |
| as            | ElementType `('div')`                         | Custom element type                  |
| classPrefix   | string `('navbar-content')`                   | The prefix of the CSS class          |
| children      | ReactNode                                     | Content                              |
| visible       | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' | Show content at specified breakpoint |
| hidden        | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl' | Hide content at specified breakpoint |

### `<Navbar.Toggle>`

![][6.0.0]

Extends [`IconButton`](/components/icon-button)

### `<Navbar.Drawer>`

![][6.0.0]

Extends [`Drawer`](/components/drawer)

[6.0.0]: https://img.shields.io/badge/>=-v6.0.0-blue
