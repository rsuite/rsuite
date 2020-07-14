# CheckTreePicker

CheckTreePicker are supported in multiple selectors for multiple selection of complex data structures.

- `<CheckTreePicker>` The selector component supports Checkbox on the TreePicker node for multiple selection.

## Usage

```js
import { CheckTreePicker } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### <CheckTreePicker>

| Property                | Type `(Default)`                                                                                        | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| appearance              | enum: 'default', 'subtle' `('default')`                                                                 | Set picker appearence                                                     |
| block                   | boolean                                                                                                 | Blocking an entire row                                                    |
| cascade                 | boolean                                                                                                 | whether cascade select                                                    |
| childrenKey             | string `('children')`                                                                                   | set children key in data                                                  |
| cleanable               | boolean `(true)`                                                                                        | whether the selected value can be cleared                                 |
| container               | HTMLElement or (() => HTMLElement)                                                                      | Sets the rendering container                                              |
| countable               | boolean `(true)`                                                                                        | whether display counts of checkItems                                      |
| data \*                 | Array&lt;[DataItemType](#types)&gt;                                                                     | tree data                                                                 |
| defaultExpandAll        | boolean                                                                                                 | expand all tree node                                                      |
| defaultExpandItemValues | any []                                                                                                  | Set the value of the default expanded node                                |
| defaultValue            | string[]                                                                                                | (UnControlled) default values of the selected tree node                   |
| disabled                | boolean                                                                                                 | Whether to disable Picker                                                 |
| disabledItemValues      | string[]                                                                                                | Disable item by value                                                     |
| expandItemValues        | any []                                                                                                  | Set the value of the expanded node (controlled)                           |
| height                  | number `(360px)`                                                                                        | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                                      | set label key in data                                                     |
| menuClassName           | string                                                                                                  | className for Menu                                                        |
| menuStyle               | React.CSSProperties                                                                                     | style for Menu                                                            |
| onChange                | (values:string[]) => void                                                                               | Callback fired when value change                                          |
| onClean                 | (event:SyntheticEvent) => void                                                                          | Callback fired when value clean                                           |
| onClose                 | () => void                                                                                              | Callback fired when close component                                       |
| onExpand                | (expandItemValues: any [], activeNode:[DataItemType](#types), concat:(data, children) => Array) => void | Callback fired when tree node expand state changed                        |
| onEnter                 | () => void                                                                                              | Callback fired before the overlay transitions in                          |
| onEntered               | () => void                                                                                              | Callback fired after the overlay finishes transitioning in                |
| onEntering              | () => void                                                                                              | Callback fired as the overlay begins to transition in                     |
| onExit                  | () => void                                                                                              | Callback fired right before the overlay transitions out                   |
| onExited                | () => void                                                                                              | Callback fired after the overlay finishes transitioning out               |
| onExiting               | () => void                                                                                              | Callback fired as the overlay begins to transition out                    |
| onOpen                  | () => void                                                                                              | Callback fired when open component                                        |
| onSearch                | (searchKeyword:string, event) => void                                                                   | Callback fired when search                                                |
| onSelect                | (activeNode:[DataItemType](#types), value:any, event) => void                                           | Callback fired when tree node is selected                                 |
| placeholder             | React.Node `('Select')`                                                                                 | Setting placeholders                                                      |
| placement               | enum: [Placement](#types) `('bottomStart')`                                                             | Placement of component                                                    |
| preventOverflow         | boolean                                                                                                 | Prevent floating element overflow                                         |
| renderExtraFooter       | () => React.Node                                                                                        | Custom render extra footer                                                |
| renderMenu              | (menu:React.Node) => React.Node                                                                         | Customizing the Rendering Menu list                                       |
| renderTreeIcon          | (nodeData:Array&lt;Object&gt;) => React.Node                                                            | Custom render the icon of tree node                                       |
| renderTreeNode          | (nodeData:Array&lt;[DataItemType](#types)&gt;) => React.Node                                            | Custom render tree node                                                   |
| renderValue             | (values:any[], checkedItems:any[],selectedElement:React.Node) => React.Node                             | Custom render selected items                                              |
| searchBy                | (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean                                | Custom search rules                                                       |
| searchable              | boolean `(true)`                                                                                        | Whether display search input box                                          |
| size                    | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                                   | A picker can have different sizes                                         |
| toggleComponentClass    | React.ElementType `('a')`                                                                               | You can use a custom element for this component                           |
| uncheckableItemValues   | string[]                                                                                                | Set the option value for the check box not to be rendered                 |
| value                   | string[]                                                                                                | (Controlled) specifies the values of the selected tree node               |
| valueKey                | string `('value')`                                                                                      | Set value key in data                                                     |
| virtualized             | boolean `(false)`                                                                                       | Whether using Virtualized List                                            |

## Related Components

- [`<CheckTree>`](./check-tree)
- [`<Tree>`](./tree)
- [`<TreePicker>`](./tree-picker)
