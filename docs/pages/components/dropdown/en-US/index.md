# Dropdown

A drop-down menu is a navigation that uses selectpicker if you want to select a value.

- `<Dropdown>` Drop-down menu.
- `<Dropdown.Item>` Drop-down menu options.
- `<Dropdown.Menu>` A submenu is created in the Drop-down menu.

## Usage

```js
import { Dropdown } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Dropdown>`

| Property             | Type`(default)`                                           | Description                                                                             |
| -------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| activeKey            | any                                                       | The option to activate the state, corresponding to the `eventkey` in the Dropdown.item. |
| classPrefix          | string `('dropdown')`                                     | The prefix of the component CSS class                                                   |
| disabled             | boolean                                                   | Whether or not component is disabled                                                    |
| icon                 | React.Element&lt;typeof Icon&gt;                          | Set the icon                                                                            |
| menuStyle            | React.CSSProperties                                       | The style of the menu.                                                                  |
| onClose              | () => void                                                | The callback function that the menu closes                                              |
| onOpen               | () => void                                                | Menu Pop-up callback function                                                           |
| onSelect             | (eventKey: any, event: SyntheticEvent&lt;any&gt;) => void | Selected callback function                                                              |
| onToggle             | (open?: boolean) => void                                  | Callback function for menu state switching.                                             |
| open                 | boolean                                                   | Controlled open state                                                                   |
| placement            | enum: [Placement8](#types) `('bottomStart')`              | The placement of Menu                                                                   |
| renderTitle          | (children?: React.Node) => React.Node                     | Custom title                                                                            |
| title                | React.Node                                                | Menu defaults to display content.                                                       |
| toggleClassName      | string                                                    | A css class to apply to the Toggle DOM node                                             |
| toggleComponentClass | React.ElementType `(Button)`                              | You can use a custom element for this component                                         |
| trigger              | union: [Trigger](#types) `('click')`                      | Triggering events                                                                       |

### `<Dropdown.Item>`

| Property       | Type`(default)`                                           | Description                                          |
| -------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| active         | boolean                                                   | Active the current option                            |
| children \*    | React.Node                                                | The content of the component                         |
| classPrefix    | string `('dropdown-item')`                                | The prefix of the component CSS class                |
| componentClass | React.ElementType`('a')`                                  | You can use a custom element type for this component |
| disabled       | boolean                                                   | Disable the current option                           |
| divider        | boolean                                                   | Whether to display the divider                       |
| eventKey       | any                                                       | The value of the current option                      |
| icon           | React.Element&lt;typeof Icon&gt;                          | Set the icon                                         |
| onSelect       | (eventKey: any, event: SyntheticEvent&lt;any&gt;) => void | Select the callback function for the current option  |
| panel          | boolean                                                   | Displays a custom panel                              |
| renderItem     | (item:React.Node) => React.Node                           | Custom rendering item                                |

### `<Dropdown.Menu>`

| Property | Type`(default)`                  | Description                                                 |
| -------- | -------------------------------- | ----------------------------------------------------------- |
| icon     | React.Element&lt;typeof Icon&gt; | Set the icon                                                |
| pullLeft | boolean                          | The submenu expands from the left and defaults to the right |
| title    | string                           | Define the title as a submenu                               |
