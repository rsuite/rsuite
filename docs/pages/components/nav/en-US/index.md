# Nav

Provides a list of various forms of navigation menus, which can be landscape and portrait layout.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

`appearance` property sets the appearance of the navigation.

- `default` - default navigation.
- `tabs` - Tabbed navigation.
- `subtle` - Subtle navigation.
- `pills` - Pill navigation.

<!--{include:`appearance.md`}-->

### Reversed

<!--{include:`reversed.md`}-->

### Vertical

<!--{include:`vertical.md`}-->

### Disabled Item

<!--{include:`status.md`}-->

### Justified

<!--{include:`justified.md`}-->

### Multi-level navigation

<!--{include:`dropdown.md`}-->

### With Icon

<!--{include:`icon.md`}-->

### Used with `Link` in `next/link`

<!--{include:`with-router.md`}-->

> [ Used with `Link` in React Router](/guide/composition/#react-router-dom)

## Props

### `<Nav>`

| Property    | Type `(Default)`                                                     | Description                                                |
| ----------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| activeKey   | string                                                               | Active `key`, corresponding to `eventkey` in `<Nav.item>`. |
| appearance  | 'default' &#124; 'tabs' &#124; 'subtle' &#124; 'pills' `('default')` | A navigation can have different appearances                |
| children \* | ChildrenArray&lt;NavItem or Dropdown&gt;                             | The contents of the component.                             |
| classPrefix | string `('nav')`                                                     | The prefix of the component CSS class                      |
| justified   | boolean                                                              | Justified navigation                                       |
| onSelect    | (eventKey: string, event) => void                                    | Callback function triggered after selection                |
| vertical    | boolean                                                              | Stacked navigation                                         |

### `<Nav.Item>`

| Property    | Type `(Default)`                  | Description                                           |
| ----------- | --------------------------------- | ----------------------------------------------------- |
| active      | boolean                           | Activation status                                     |
| as          | ElementType `('a')`               | You can use a custom element type for this component. |
| children \* | ReactNode                         | The contents of the component                         |
| disabled    | boolean                           | Disabled status                                       |
| eventKey    | string                            | The value of the current option                       |
| href        | string                            | Link                                                  |
| icon        | Element&lt;typeof Icon&gt;        | Sets the icon for the component                       |
| onSelect    | (eventKey: string, event) => void | Select the callback function that the event triggers. |

### `<Nav.Menu>`

| Property      | Type `(Default)`                               | Description                                                    |
| ------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| icon          | ReactElement                                   | Icon of the item that opens the menu                           |
| noCaret       | boolean `(false)`                              | Whether to hide the caret icon                                 |
| onClose       | (event: SyntheticEvent) => void                | Callback when menu closes                                      |
| onOpen        | (event: SyntheticEvent) => void                | Callback when menu opens                                       |
| onToggle      | (open: boolean, event: SyntheticEvent) => void | Callback when menu opens/closes                                |
| openDirection | "start"&#124;"end" `("end")`                   | Direction that menu opens towards (only available on submenus) |
| title         | ReactNode                                      | Content of the item that opens the menu                        |
