# Sidenav

An encapsulation of the Nav for the sidebar of the page.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Sub Menu

<!--{include:`submenu.md`}-->

### Group Header

Use `Sidenav.GroupLabel` to define the group header of the navigation.

<!--{include:`group.md`}-->

### Sidenav Header

Use `Sidenav.Header` to define the content of the navigation header, such as Logo, search box, etc.

<!--{include:`header.md`}-->

### Sidenav Footer

Use `Sidenav.Footer` to define the content of the navigation footer, such as a toggle button for collapsed navigation.

<!--{include:`footer.md`}-->

### Controlled Expand and Collapse Sidenav

<!--{include:`collapsed.md`}-->

### Custom Panel and Divider in Navigation

You can customize the content of the navigation by using the `panel` and `divider` properties on the `Nav.Item`.

<!--{include:`divider-panel.md`}-->

### With Badge

Use `Badge` to display the number of items in the sub-menu.

<!--{include:`with-badge.md`}-->

### Appearance

The `appearance` prop allows you to define the appearance of the Sidenav. The available values are `default`, `inverse`, and `subtle`. The `inverse` value can be used to create a Sidenav that is visually distinct from the default appearance. The `subtle` value can be used to create a Sidenav with a minimalistic look.

> In high-contrast themes, all appearances look the same as the `default` appearance.

<!--{include:`appearance.md`}-->

### In Modal

<!--{include:`in-modal.md`}-->

## Props

### `<Sidenav>`

| Property        | Type `(Default)`                                 | Description                                                  |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| appearance      | 'default' \| 'inverse' \| 'subtle' `('default')` | Specifies the visual appearance of the side navigation       |
| as              | ElementType `('div')`                            | Custom element type for the root component                   |
| classPrefix     | string `('sidenav')`                             | Prefix for component CSS class names                         |
| defaultOpenKeys | string[]                                         | Array of keys for initially expanded dropdown items          |
| expanded        | boolean `(true)`                                 | Controls the expanded/collapsed state of the side navigation |
| onOpenChange    | (openKeys: string[], event) => void              | Callback triggered when the open state of menu items changes |
| openKeys        | string[]                                         | Array of keys for controlled expanded dropdown items         |

### `<Sidenav.Header>`

| Property    | Type `(Default)`            | Description                                  |
| ----------- | --------------------------- | -------------------------------------------- |
| as          | ElementType `('div')`       | Custom element type for the header component |
| classPrefix | string `('sidenav-header')` | Prefix for header component CSS class names  |

### `<Sidenav.Body>`

| Property    | Type `(Default)`          | Description                                |
| ----------- | ------------------------- | ------------------------------------------ |
| as          | ElementType `('div')`     | Custom element type for the body component |
| classPrefix | string `('sidenav-body')` | Prefix for body component CSS class names  |

### `<Sidenav.Footer>`

| Property    | Type `(Default)`            | Description                                  |
| ----------- | --------------------------- | -------------------------------------------- |
| as          | ElementType `('div')`       | Custom element type for the footer component |
| classPrefix | string `('sidenav-footer')` | Prefix for footer component CSS class names  |

### `<Sidenav.Toggle>`

| Property    | Type `(Default)`            | Description                                         |
| ----------- | --------------------------- | --------------------------------------------------- |
| as          | ElementType `('button')`    | Custom element type for the toggle button           |
| classPrefix | string `('sidenav-toggle')` | Prefix for toggle button CSS class names            |
| expanded    | boolean                     | Controls the expanded/collapsed state of the toggle |
| onToggle    | (expanded: boolean) => void | Callback triggered when toggle state changes        |

### `<Sidenav.GroupLabel>`

| Property    | Type `(Default)`                 | Description                                       |
| ----------- | -------------------------------- | ------------------------------------------------- |
| as          | ElementType `('div')`            | Custom element type for the group label component |
| classPrefix | string `('sidenav-group-label')` | Prefix for group label CSS class names            |
