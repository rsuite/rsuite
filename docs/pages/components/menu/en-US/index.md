# Menu

A menu component that provides a list of options with support for icons, descriptions and keyboard shortcuts.

## Import

<!--{include:<import-guide>}-->

- `Menu` The container component that manages menu state.
- `Menu.Item` Menu option component supporting icons and descriptions.
- `Menu.Separator` A divider line to group menu items.

## Examples

### Basic

<!--{include:`basic.md`}-->

### With Shortcut

<!--{include:`shortcut.md`}-->

### With Icons

<!--{include:`icons.md`}-->

### With Description

<!--{include:`description.md`}-->

### With Separator

<!--{include:`separator.md`}-->

### Routing

The `Menu.Item` component works with frameworks and client side routers like Next.js and React Router. See the [Routing Guide](/guide/composition/#third-party-routing-library) for setup instructions.

<!--{include:`with-router.md`}-->

## Props

### `<Menu>`

| Property    | Type`(default)`                                          | Description                                          |
| ----------- | -------------------------------------------------------- | ---------------------------------------------------- |
| activeKey   | string \| number                                         | Set the active key for the menu                      |
| as          | ElementType `('ul')`                                     | You can use a custom element type for this component |
| classPrefix | string`('menu')`                                         | The prefix of the component CSS class                |
| onSelect    | (eventKey: string \| number \| undefined, event) => void | Callback function triggered when an item is selected |

### `<Menu.Item>`

| Property    | Type`(default)`                             | Description                                          |
| ----------- | ------------------------------------------- | ---------------------------------------------------- |
| active      | boolean                                     | Active the current option                            |
| as          | ElementType `('li')`                        | You can use a custom element type for this component |
| classPrefix | string `('menu-item')`                      | The prefix of the component CSS class                |
| description | ReactNode                                   | The description of the current option                |
| disabled    | boolean                                     | Disable the current option                           |
| eventKey    | string \| number                            | The value of the current option                      |
| icon        | ReactElement                                | Set the icon                                         |
| onSelect    | (eventKey: string \| number, event) => void | Select the callback function for the current option  |
| shortcut    | string                                      | The menu item keyboard shortcut                      |

### `<Menu.Separator>`

| Property    | Type`(default)`               | Description                                          |
| ----------- | ----------------------------- | ---------------------------------------------------- |
| as          | ElementType `('li')`          | You can use a custom element type for this component |
| classPrefix | string`('menu-item-divider')` | The prefix of the component CSS class                |
