# Navbar

A wrapper for Nav that is generally used for the top navigation of a page.

## Import

<!--{include:<import-guide>}-->

- `Navbar` The navigation bar component.
- `Navbar.Brand` Set up your brand, which can be the name of your company, product, or project.
- `Navbar.Content` Navigation bar content container, group a set of elements together.
- `Navbar.Toggle` Button to show drawer menu on small screens.
- `Navbar.Drawer` Drawer menu container.

## Examples

### Default

The most basic usage of the navigation bar, including brand and navigation items.

<!--{include:`basic.md`}-->

### Appearance

Switch between different visual styles of the navigation bar using the `appearance` property.

<!--{include:`appearance.md`}-->

### Search

Integrate a search box into the navigation bar.

<!--{include:`search.md`}-->

### Sub Nav

Show a navigation bar with a secondary menu.

<!--{include:`subnav.md`}-->

### Mega Menu

Display a navigation bar with a large dropdown menu.

<!--{include:`mege-menu.md`}-->

### With Popover Menu

Show additional navigation items using a popover menu.

<!--{include:`with-popover.md`}-->

### With Drawer

Display navigation items in a drawer menu on small screens.

<!--{include:`with-drawer.md`}-->

## Responsive

The navigation bar supports responsive layouts and adapts to different screen sizes.

<!--{include:<example-responsive>}-->

You can use the `showFrom` and `hideFrom` props to control the visibility at different breakpoints:

```jsx
// Hide on screens larger than 'xs'
<Navbar.Content hideFrom="xs">
  {/* Content for small screens */}
</Navbar.Content>

// Hide on screens smaller than 'xs'
<Navbar.Content showFrom="xs">
  {/* Content for large screens */}
</Navbar.Content>
```

## Props

### `<Navbar>`

| Property name      | Type `(Default)`                                | Description                                               |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------- |
| appearance         | 'default' \| 'inverse' \| 'subtle'`('default')` | Navigation bar appearance                                 |
| as                 | ElementType `('div')`                           | Custom element type                                       |
| classPrefix        | string `('navbar')`                             | The prefix of the component CSS class                     |
| onDrawerOpenChange | (open: boolean) => void                         | Callback when drawer menu opens or closes<br/> ![][6.0.0] |

### `<Navbar.Brand>`

| Property name | Type `(Default)`          | Description                 |
| ------------- | ------------------------- | --------------------------- |
| as            | ElementType `('a')`       | Custom element type         |
| children      | ReactNode                 | Brand content               |
| classPrefix   | string `('navbar-brand')` | The prefix of the CSS class |
| href          | string                    | The URL of the brand link   |

### `<Navbar.Content>`

![][6.0.0]

| Property name | Type `(Default)`            | Description                          |
| ------------- | --------------------------- | ------------------------------------ |
| as            | ElementType `('div')`       | Custom element type                  |
| children      | ReactNode                   | Content                              |
| classPrefix   | string `('navbar-content')` | The prefix of the CSS class          |
| hideFrom      | [Breakpoints][breakpoints]  | Hide content at specified breakpoint |
| showFrom      | [Breakpoints][breakpoints]  | Show content at specified breakpoint |

### `<Navbar.Toggle>`

![][6.0.0]

| Property name | Type `(Default)`                         | Description                                                 |
| ------------- | ---------------------------------------- | ----------------------------------------------------------- |
| as            | ElementType `('button')`                 | Custom element type                                         |
| classPrefix   | string `('burger')`                      | The prefix of the CSS class                                 |
| color         | [Color][Color] \| CSSProperties['color'] | The color of the burger lines                               |
| lineThickness | number                                   | The thickness of the burger lines                           |
| onToggle      | (open: boolean) => void                  | Callback function that is called when the toggle is clicked |
| open          | boolean                                  | Whether the burger is in open (X) state                     |

### `<Navbar.Drawer>`

![][6.0.0]

Extends [`Drawer`](/components/drawer)

<!--{include:(_common/types/breakpoints.md)}-->
<!--{include:(_common/types/color.md)}-->

[breakpoints]: #code-ts-breakpoints-code
[Color]: #code-ts-color-code
