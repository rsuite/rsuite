# CheckPicker

Used for multiple data selection, support grouping.

- `<CheckPicker>`

## Usage

```js
import { CheckPicker } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<CheckPicker>`

| Property             | Type`(Default)`                                                          | Description                                                 |
| -------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| appearance           | enum: 'default', 'subtle' `('default')`                                  | Set picker appearence                                       |
| block                | boolean                                                                  | Blocking an entire row                                      |
| classPrefix          | string `('picker')`                                                      | The prefix of the component CSS class                       |
| cleanable            | boolean `(true)`                                                         | Whether the selected value can be cleared                   |
| container            | HTMLElement or (() => HTMLElement)                                       | Sets the rendering container                                |
| data \*              | Array&lt;[DataItemType](#types)&gt;                                      | The data of component                                       |
| defaultValue         | any                                                                      | Default values of the selected items                        |
| disabled             | boolean                                                                  | Whether disabled componet                                   |
| disabledItemValues   | string[]                                                                 | Disable item by value                                       |
| groupBy              | string                                                                   | Set group condition key in data                             |
| labelKey             | string `('label')`                                                       | Set label key in data                                       |
| listProps            | [listprops]                                                              | List-related properties in `react-virtualized`              |
| maxHeight            | number `(320)`                                                           | The max height of Dropdown                                  |
| menuClassName        | string                                                                   | A css class to apply to the Menu DOM node.                  |
| menuStyle            | Object                                                                   | A style to apply to the Menu DOM node.                      |
| onChange             | (value:string, event) => void                                            | Callback fired when value change                            |
| onClean              | (event:SyntheticEvent) => void                                           | Callback fired when value clean                             |
| onClose              | () => void                                                               | Callback fired when close component                         |
| onEnter              | () => void                                                               | Callback fired before the overlay transitions in            |
| onEntered            | () => void                                                               | Callback fired after the overlay finishes transitioning in  |
| onEntering           | () => void                                                               | Callback fired as the overlay begins to transition in       |
| onExit               | () => void                                                               | Callback fired right before the overlay transitions out     |
| onExited             | () => void                                                               | Callback fired after the overlay finishes transitioning out |
| onExiting            | () => void                                                               | Callback fired as the overlay begins to transition out      |
| onGroupTitleClick    | (event) => void                                                          | Callback fired when click the group title                   |
| onOpen               | () => void                                                               | Callback fired when open component                          |
| onSearch             | (searchKeyword:string, event) => void                                    | Callback fired when search                                  |
| onSelect             | (value:string, item: [DataItemType](#types) , event) => void             | Callback fired when item is selected                        |
| placeholder          | React.Node `('Select')`                                                  | Setting placeholders                                        |
| placement            | enum: [Placement](#types)`('bottomStart')`                               | The placement of component                                  |
| preventOverflow      | boolean                                                                  | Prevent floating element overflow                           |
| renderExtraFooter    | () => React.Node                                                         | Custom render extra footer                                  |
| renderMenu           | (menu:React.Node) => React.Node                                          | Customizing the Rendering Menu list                         |
| renderMenuGroup      | (groupTitle:React.Node, item:[DataItemType](#types)) => React.Node       | Custom render menu group                                    |
| renderMenuItem       | (label:React.Node, item: [DataItemType](#types)) => React.Node           | Custom render menu items                                    |
| renderValue          | (value: any[], items: any[], selectedElement:React.Node) => React.Node   | Custom render selected items                                |
| searchBy             | (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean | Custom search rules                                         |
| searchable           | boolean `(true)`                                                         | Whether dispaly search input box                            |
| size                 | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                    | A picker can have different sizes                           |
| sort                 | (isGroup: boolean) => (a: any, b: any) => number                         | Sort options                                                |
| sticky               | boolean                                                                  | Top the selected option in the options                      |
| toggleComponentClass | React.ElementType `('a')`                                                | You can use a custom element for this component             |
| value                | any                                                                      | Specifies the values of the selected items (Controlled)     |
| valueKey             | string `('value')`                                                       | Set value key in data                                       |
| virtualized          | boolean `(true)`                                                         | Whether using Virtualized List                              |

[listprops]: https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
