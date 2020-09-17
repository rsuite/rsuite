# Sidenav

An encapsulation of the Nav for the sidebar of the page.

* `<Sidenav>` Side navigation component.
* `<Sidenav.Header>` Navigates the header content.
* `<Sidenav.Body>` Navigation body content.


## Usage

```js
import { Sidenav } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Sidenav>`

| Property        | Type `(Default)`                                   | Description                                                |
| --------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| activeKey       | any                                                | Activation option, corresponding menu eventkey             |
| appearance      | enum: 'default', 'inverse', 'subtle' `('default')` | Menu style                                                 |
| classPrefix     | string `('sidenav')`                               | The prefix of the component CSS class                      |
| componentClass  | React.ElementType `('div')`                        | You can use a custom element type for this component       |
| defaultOpenKeys | any[]                                              | Open menu, corresponding to Dropdown eventkey              |
| expanded        | boolean `(true)`                                   | Whether to expand the Sidenav                              |
| onOpenChange    | (openKeys: any[], event: SyntheticEvent) => void   | Menu opening callback function that changed                |
| onSelect        | (eventKey: any[], event: SyntheticEvent) => void   | Select the callback function for the menu.                 |
| openKeys        | any[]                                              | Open menu, corresponding to Dropdown eventkey (controlled) |
