# Dropdown

A drop-down menu is a navigation that uses selectpicker if you want to select a value.

## Import

<!--{include:<import-guide>}-->

- `<Dropdown>` Drop-down menu.
- `<Dropdown.Item>` Drop-down menu options.
- `<Dropdown.Menu>` A submenu is created in the Drop-down menu.
- `<Dropdown.Separator>` A Separator in the Drop-down menu.

## Examples

### Basic

<!--{include:`basic.md`}-->

### Trigger

Set the trigger event with the `trigger` attribute, support the event:

- `click` (default)
- `hover`
- `contextMenu`

> Support multiple events: `Array<click, hover, contextMenu>`

<!--{include:`trigger.md`}-->

### Disabled

You can disable the entire component or disable individual options by configuring the `disabled` property.

<!--{include:`disabled.md`}-->

### Size

<!--{include:`size.md`}-->

### No caret variation

<!--{include:`no-caret.md`}-->

### With Shortcut

<!--{include:`shortcut.md`}-->

### With Icons

<!--{include:`icons.md`}-->

### Separator and Panel

- Use `<Dropdown.Separator>` to set the separator.
- Use the `panel` prop to set a `Dropdown.Item` as a panel.

<!--{include:`custom.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Submenu

<!--{include:`submenu.md`}-->

### Menu

<!--{include:`menu-items.md`}-->

### Custom Toggle

<!--{include:`custom-toggle.md`}-->

### Used with Popover

<!--{include:`with-popover.md`}-->

### Used with Buttons

<!--{include:`buttons.md`}-->

### Routing

The `<Dropdown.Item>` component works with frameworks and client side routers like Next.js and React Router. See the [Routing Guide](/guide/composition/#third-party-routing-library) for setup instructions.

<!--{include:`with-router.md`}-->

## Props

### `<Dropdown>`

| Property        | Type`(default)`                                        | Description                                                                             |
| --------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| activeKey       | string                                                 | The option to activate the state, corresponding to the `eventkey` in the Dropdown.item. |
| classPrefix     | string `('dropdown')`                                  | The prefix of the component CSS class                                                   |
| defaultOpen     | boolean `(false)`                                      | Whether Dropdown is initially open                                                      |
| disabled        | boolean                                                | Whether or not component is disabled                                                    |
| icon            | Element&lt;typeof Icon&gt;                             | Set the icon                                                                            |
| menuStyle       | CSSProperties                                          | The style of the menu.                                                                  |
| noCaret         | boolean                                                | Do not display the arrow icon                                                           |
| onClose         | () => void                                             | The callback function that the menu closes                                              |
| onOpen          | () => void                                             | Menu Pop-up callback function                                                           |
| onSelect        | (eventKey: string, event) => void                      | Selected callback function                                                              |
| onToggle        | (open?: boolean) => void                               | Callback function for menu state switching.                                             |
| open            | boolean                                                | Whether Dropdown is open (controlled)                                                   |
| placement       | [Placement](#code-ts-placement-code) `('bottomStart')` | The placement of Menu                                                                   |
| renderToggle    | (props, ref) => any;                                   | Custom Toggle                                                                           |
| title           | ReactNode                                              | Menu defaults to display content.                                                       |
| toggleAs        | ElementType `(Button)`                                 | You can use a custom element for this component                                         |
| toggleClassName | string                                                 | A css class to apply to the Toggle DOM node                                             |
| trigger         | [Trigger](#code-ts-trigger-code) `('click')`           | Triggering events                                                                       |

### `<Dropdown.Item>`

| Property    | Type`(default)`                   | Description                                          |
| ----------- | --------------------------------- | ---------------------------------------------------- |
| active      | boolean                           | Active the current option                            |
| as          | ElementType`('li')`               | You can use a custom element type for this component |
| children \* | ReactNode                         | The content of the component                         |
| classPrefix | string `('dropdown-item')`        | The prefix of the component CSS class                |
| disabled    | boolean                           | Disable the current option                           |
| divider     | boolean                           | Whether to display the divider                       |
| eventKey    | string                            | The value of the current option                      |
| icon        | Element&lt;typeof Icon&gt;        | Set the icon                                         |
| onSelect    | (eventKey: string, event) => void | Select the callback function for the current option  |
| panel       | boolean                           | Displays a custom panel                              |
| shortcut    | string                            | The dropdown item keyboard shortcut <br/>![][5.58.0] |

### `<Dropdown.Menu>`

| Property | Type`(default)`            | Description                   |
| -------- | -------------------------- | ----------------------------- |
| icon     | Element&lt;typeof Icon&gt; | Set the icon                  |
| title    | string                     | Define the title as a submenu |

### `<Dropdown.Separator>`

| Property | Type`(default)`      | Description                                          |
| -------- | -------------------- | ---------------------------------------------------- |
| as       | ElementType `('li')` | You can use a custom element type for this component |

<!--{include:(_common/types/placement8.md)}-->
<!--{include:(_common/types/trigger.md)}-->

[5.58.0]: https://img.shields.io/badge/>=-v5.58.0-blue
