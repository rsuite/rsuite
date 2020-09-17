# SelectPicker

For a single data selection, support grouping.

- `<SelectPicker>`

## Usage

```js
import { SelectPicker } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<SelectPicker>`

| Property             | Type `(Default)`                                                                      | Description                                                 |
| -------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| appearance           | enum: 'default', 'subtle' `('default')`                                               | Set picker appearence                                       |
| block                | boolean                                                                               | Blocking an entire row                                      |
| classPrefix          | string `('picker')`                                                                   | The prefix of the component CSS class                       |
| cleanable            | boolean `(true)`                                                                      | Whether the option can be emptied.                          |
| container            | HTMLElement or (() => HTMLElement)                                                    | Sets the rendering container                                |
| data \*              | Array&lt;[DataItemType](#types)&gt;                                                   | Selectable data                                             |
| defaultValue         | string                                                                                | Default value                                               |
| disabled             | boolean                                                                               | Whether or not component is disabled                        |
| disabledItemValues   | string[]                                                                              | Disable optional                                            |
| groupBy              | string                                                                                | Set grouping criteria 'key' in 'data'                       |
| labelKey             | string `('label')`                                                                    | Set options to display the 'key' in 'data'                  |
| listProps            | [listprops]                                                                           | List-related properties in `react-virtualized`              |
| maxHeight            | number `(320)`                                                                        | Set the max height of the Dropdown                          |
| menuClassName        | string                                                                                | A css class to apply to the Menu DOM node.                  |
| menuStyle            | React.CSSProperties                                                                   | A style to apply to the Menu DOM node.                      |
| onChange             | (value:string, event) => void                                                         | callback function when value changes                        |
| onClean              | (event:SyntheticEvent) => void                                                        | Callback fired when value clean                             |
| onClose              | () => void                                                                            | Close callback functions                                    |
| onEnter              | () => void                                                                            | Callback fired before the overlay transitions in            |
| onEntered            | () => void                                                                            | Callback fired after the overlay finishes transitioning in  |
| onEntering           | () => void                                                                            | Callback fired as the overlay begins to transition in       |
| onExit               | () => void                                                                            | Callback fired right before the overlay transitions out     |
| onExited             | () => void                                                                            | Callback fired after the overlay finishes transitioning out |
| onExiting            | () => void                                                                            | Callback fired as the overlay begins to transition out      |
| onGroupTitleClick    | (event) => void                                                                       | Click the callback function for the group header            |
| onOpen               | () => void                                                                            | Open callback function                                      |
| onSearch             | (searchKeyword:string, event) => void                                                 | callback function for Search                                |
| onSelect             | (value:string, item: [DataItemType](#types) , event) => void                          | option is clicked after the selected callback function      |
| placeholder          | React.Node `('Select')`                                                               | Setting placeholders                                        |
| placement            | enum: [Placement](#types)`('bottomStart')`                                            | The placement of component                                  |
| preventOverflow      | boolean                                                                               | Prevent floating element overflow                           |
| renderExtraFooter    | () => React.Node                                                                      | custom render extra footer                                  |
| renderMenu           | (menu:React.Node) => React.Node                                                       | Customizing the Rendering Menu list                         |
| renderMenuGroup      | (groupTitle:React.Node, item:[DataItemType](#types)) => React.Node                    | Custom Render Options Group                                 |
| renderMenuItem       | (label:React.Node, item:[DataItemType](#types)) => React.Node                         | Custom Render Options                                       |
| renderValue          | (value:string, item: [DataItemType](#types),selectedElement:React.Node) => React.Node | Custom Render selected options                              |
| searchBy             | (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean              | Custom search rules                                         |
| searchable           | boolean `(true)`                                                                      | Whether you can search for options.                         |
| size                 | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                 | A picker can have different sizes                           |
| sort                 | (isGroup: boolean) => (a: any, b: any) => number                                      | Sort options                                                |
| toggleComponentClass | React.ElementType `('a')`                                                             | You can use a custom element for this component             |
| value                | string                                                                                | Value (Controlled)                                          |
| valueKey             | string `('value')`                                                                    | Set option value 'key' in 'data'                            |
| virtualized          | boolean `(true)`                                                                      | Whether using Virtualized List                              |

[listprops]: https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
