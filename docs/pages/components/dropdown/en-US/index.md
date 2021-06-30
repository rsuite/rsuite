# Dropdown

A drop-down menu is a navigation that uses selectpicker if you want to select a value.

- `<Dropdown>` Drop-down menu.
- `<Dropdown.Item>` Drop-down menu options.
- `<Dropdown.Menu>` A submenu is created in the Drop-down menu.

## Import

<!--{include:(components/dropdown/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Trigger

Set the trigger event with the `trigger` attribute, support the event:

- `click` (default)
- `hover`
- `contextMenu`

> Support multiple events: `Array<click, hover, contextMenu>`

<!--{include:`trigger.md`}-->

### Option Active State

<!--{include:`active.md`}-->

### Disabled State

You can disable the entire component or disable individual options by configuring the `disabled` property.

<!--{include:`disabled.md`}-->

### With Button

The default value of the `toggleAs` property of`Dropdown` is `Button`. You can set the button-related props (eg. size, appearance) and display it in the style of a button.

<!--{include:`toggle-as.md`}-->

### No caret variation

<!--{include:`no-caret.md`}-->

### Dropdown with Icon

<!--{include:`icons.md`}-->

### Divider and Panel

- `divider` Sets the divider options.
- `panel` Set up a panel.

<!--{include:`divider.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Submenu

<!--{include:`submenu.md`}-->

### Menu items

<!--{include:`menu-items.md`}-->

### Used with Popover

<!--{include:`with-popover.md`}-->

### Used with Buttons

<!--{include:`buttons.md`}-->

### Used with `next/link`

<!--{include:`with-router.md`}-->

## Props

<!--{include:(_common/types/placement8.md)}-->
<!--{include:(_common/types/trigger.md)}-->

### `<Dropdown>`

| Property        | Type`(default)`                     | Description                                                                             |
| --------------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| activeKey       | string                              | The option to activate the state, corresponding to the `eventkey` in the Dropdown.item. |
| classPrefix     | string `('dropdown')`               | The prefix of the component CSS class                                                   |
| disabled        | boolean                             | Whether or not component is disabled                                                    |
| icon            | Element&lt;typeof Icon&gt;          | Set the icon                                                                            |
| menuStyle       | CSSProperties                       | The style of the menu.                                                                  |
| onClose         | () => void                          | The callback function that the menu closes                                              |
| onOpen          | () => void                          | Menu Pop-up callback function                                                           |
| onSelect        | (eventKey: string, event) => void   | Selected callback function                                                              |
| onToggle        | (open?: boolean) => void            | Callback function for menu state switching.                                             |
| open            | boolean                             | Controlled open state                                                                   |
| placement       | Placement `('bottomStart')`         | The placement of Menu                                                                   |
| renderTitle     | (children?: ReactNode) => ReactNode | Custom title                                                                            |
| title           | ReactNode                           | Menu defaults to display content.                                                       |
| toggleAs        | ElementType `(Button)`              | You can use a custom element for this component                                         |
| toggleClassName | string                              | A css class to apply to the Toggle DOM node                                             |
| trigger         | Trigger `('click')`                 | Triggering events                                                                       |

### `<Dropdown.Item>`

| Property    | Type`(default)`                   | Description                                          |
| ----------- | --------------------------------- | ---------------------------------------------------- |
| active      | boolean                           | Active the current option                            |
| as          | ElementType`('a')`                | You can use a custom element type for this component |
| children \* | ReactNode                         | The content of the component                         |
| classPrefix | string `('dropdown-item')`        | The prefix of the component CSS class                |
| disabled    | boolean                           | Disable the current option                           |
| divider     | boolean                           | Whether to display the divider                       |
| eventKey    | string                            | The value of the current option                      |
| icon        | Element&lt;typeof Icon&gt;        | Set the icon                                         |
| onSelect    | (eventKey: string, event) => void | Select the callback function for the current option  |
| panel       | boolean                           | Displays a custom panel                              |

### `<Dropdown.Menu>`

| Property | Type`(default)`            | Description                                                 |
| -------- | -------------------------- | ----------------------------------------------------------- |
| icon     | Element&lt;typeof Icon&gt; | Set the icon                                                |
| title    | string                     | Define the title as a submenu                               |
