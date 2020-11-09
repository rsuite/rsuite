# CheckTreePicker

CheckTreePicker are supported in multiple selectors for multiple selection of complex data structures.

## Import

<!--{include:(components/check-tree-picker/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Cascade

The cascade attribute can set whether or not CheckTreePicker can consider the cascade relationship of the parent parent when selecting. The default value is true.

<!--{include:`cascade.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Custom options

<!--{include:`custom.md`}-->

### Async

<!--{include:`async.md`}-->

## Accessibility

Learn more in [Accessibility](../guide/accessibility).

## Props

<!--{include:(_common/types/data-item-type.md)}-->
<!--{include:(_common/types/placement.md)}-->

### `<CheckTreePicker>`

| Property                | Type `(Default)`                                                                              | Description                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| appearance              | enum: 'default', 'subtle' `('default')`                                                       | Set picker appearence                                                     |
| block                   | boolean                                                                                       | Blocking an entire row                                                    |
| cascade                 | boolean                                                                                       | whether cascade select                                                    |
| childrenKey             | string `('children')`                                                                         | set children key in data                                                  |
| cleanable               | boolean `(true)`                                                                              | whether the selected value can be cleared                                 |
| container               | HTMLElement or (() => HTMLElement)                                                            | Sets the rendering container                                              |
| countable               | boolean `(true)`                                                                              | whether display counts of checkItems                                      |
| data \*                 | DataItemType[]                                                                                | tree data                                                                 |
| defaultExpandAll        | boolean                                                                                       | expand all tree node                                                      |
| defaultExpandItemValues | any []                                                                                        | Set the value of the default expanded node                                |
| defaultValue            | string[]                                                                                      | (UnControlled) default values of the selected tree node                   |
| disabled                | boolean                                                                                       | Whether to disable Picker                                                 |
| disabledItemValues      | string[]                                                                                      | Disable item by value                                                     |
| expandItemValues        | any []                                                                                        | Set the value of the expanded node (controlled)                           |
| getChildren             | (node: DataItemType) => Promise&lt;DataItemType&gt;                                           | load node children data asynchronously                                    |
| height                  | number `(360px)`                                                                              | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                            | set label key in data                                                     |
| menuClassName           | string                                                                                        | className for Menu                                                        |
| menuStyle               | CSSProperties                                                                                 | style for Menu                                                            |
| onChange                | (values:string[]) => void                                                                     | Callback fired when value change                                          |
| onClean                 | (event:SyntheticEvent) => void                                                                | Callback fired when value clean                                           |
| onClose                 | () => void                                                                                    | Callback fired when close component                                       |
| onExpand                | (expandItemValues: any [], activeNode:DataItemType, concat:(data, children) => Array) => void | Callback fired when tree node expand state changed                        |
| onEnter                 | () => void                                                                                    | Callback fired before the overlay transitions in                          |
| onEntered               | () => void                                                                                    | Callback fired after the overlay finishes transitioning in                |
| onEntering              | () => void                                                                                    | Callback fired as the overlay begins to transition in                     |
| onExit                  | () => void                                                                                    | Callback fired right before the overlay transitions out                   |
| onExited                | () => void                                                                                    | Callback fired after the overlay finishes transitioning out               |
| onExiting               | () => void                                                                                    | Callback fired as the overlay begins to transition out                    |
| onOpen                  | () => void                                                                                    | Callback fired when open component                                        |
| onSearch                | (searchKeyword:string, event) => void                                                         | Callback fired when search                                                |
| onSelect                | (activeNode:DataItemType, value:any, event) => void                                           | Callback fired when tree node is selected                                 |
| placeholder             | ReactNode `('Select')`                                                                        | Setting placeholders                                                      |
| placement               | enum: Placement `('bottomStart')`                                                             | Placement of component                                                    |
| preventOverflow         | boolean                                                                                       | Prevent floating element overflow                                         |
| renderExtraFooter       | () => ReactNode                                                                               | Custom render extra footer                                                |
| renderMenu              | (menu:ReactNode) => ReactNode                                                                 | Customizing the Rendering Menu list                                       |
| renderTreeIcon          | (nodeData:object) => ReactNode                                                                | Custom render the icon of tree node                                       |
| renderTreeNode          | (nodeData:DataItemType[]) => ReactNode                                                        | Custom render tree node                                                   |
| renderValue             | (values:any[], checkedItems:any[],selectedElement:ReactNode) => ReactNode                     | Custom render selected items                                              |
| searchBy                | (keyword: string, label: ReactNode, item: ItemDataType) => boolean                            | Custom search rules                                                       |
| searchable              | boolean `(true)`                                                                              | Whether display search input box                                          |
| size                    | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                         | A picker can have different sizes                                         |
| toggleAs                | ElementType `('a')`                                                                           | You can use a custom element for this component                           |
| uncheckableItemValues   | string[]                                                                                      | Set the option value for the check box not to be rendered                 |
| value                   | string[]                                                                                      | (Controlled) specifies the values of the selected tree node               |
| valueKey                | string `('value')`                                                                            | Set value key in data                                                     |
| virtualized             | boolean `(true)`                                                                              | Whether using Virtualized List                                            |

## Related Components

- [`<CheckTree>`](./check-tree)
- [`<Tree>`](./tree)
- [`<TreePicker>`](./tree-picker)
