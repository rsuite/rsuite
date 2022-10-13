# TreePicker

`<TreePicker>` Selector component, tree single selector.

## Import

<!--{include:(components/tree-picker/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Placement

<!--{include:`placement.md`}-->

### Disabled and Read only

<!--{include:`disabled.md`}-->

### Disable Search

<!--{include:`searchable.md`}-->

### Custom Option

<!--{include:`custom.md`}-->

### Async

<!--{include:`async.md`}-->

### Extra footer

<!--{include:`extra-footer.md`}-->

## Accessibility

Learn more in [Accessibility](/guide/accessibility).

## Props

### `<TreePicker>`

| Property                | Type `(Default)`                                                                                  | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| appearance              | 'default' &#124; 'subtle' `('default')`                                                           | Set picker appearence                                                     |
| block                   | boolean                                                                                           | Blocking an entire row                                                    |
| childrenKey             | string `('children')`                                                                             | Tree data structure Children property name                                |
| classPrefix             | string`('picker')`                                                                                | The prefix of the component CSS class                                     |
| cleanable               | boolean `(true)`                                                                                  | Set whether you can clear                                                 |
| container               | HTMLElement &#124; (() => HTMLElement)                                                            | Sets the rendering container                                              |
| data \*                 | [ItemDataType][item][]                                                                            | Tree data                                                                 |
| defaultExpandAll        | boolean                                                                                           | Expand all nodes By default                                               |
| defaultExpandItemValues | string[]                                                                                          | Set the value of the default expanded node                                |
| defaultOpen             | boolean                                                                                           | Open by default                                                           |
| defaultValue            | string                                                                                            | Default selected Value                                                    |
| disabled                | boolean                                                                                           | Whether to disable Picker                                                 |
| disabledItemValues      | string[]                                                                                          | Disable item by value                                                     |
| expandItemValues        | string[]                                                                                          | Set the value of the expanded node (controlled)                           |
| getChildren             | (node: [ItemDataType][item]) => Promise&lt;[ItemDataType][item]&gt;                               | load node children data asynchronously                                    |
| height                  | number `(360px)`                                                                                  | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                                | Tree data structure Label property name                                   |
| listProps               | [ListProps][listprops]                                                                            | Properties of virtualized lists.                                          |
| locale                  | [PickerLocaleType](/guide/i18n/#pickers)                                                          | Locale text                                                               |
| menuClassName           | string                                                                                            | A css class to apply to the Menu DOM node                                 |
| menuStyle               | CSSProperties                                                                                     | style for Menu                                                            |
| onChange                | (value:string) => void                                                                            | Callback function for data change                                         |
| onClean                 | (event) => void                                                                                   | Callback fired when value clean                                           |
| onClose                 | () => void                                                                                        | Close Dropdown callback functions                                         |
| onEnter                 | () => void                                                                                        | Callback fired before the overlay transitions in                          |
| onEntered               | () => void                                                                                        | Callback fired after the overlay finishes transitioning in                |
| onEntering              | () => void                                                                                        | Callback fired as the overlay begins to transition in                     |
| onExit                  | () => void                                                                                        | Callback fired right before the overlay transitions out                   |
| onExited                | () => void                                                                                        | Callback fired after the overlay finishes transitioning out               |
| onExiting               | () => void                                                                                        | Callback fired as the overlay begins to transition out                    |
| onExpand                | (expandItemValues: string[], item:[ItemDataType][item], concat:(data, children) => Array) => void | Callback When tree node is displayed                                      |
| onOpen                  | () => void                                                                                        | Open Dropdown callback function                                           |
| onSearch                | (searchKeyword: string, event) => void                                                            | Search callback function                                                  |
| onSelect                | (item:[ItemDataType][item], value: string, event) => void                                         | Callback function after selecting tree node                               |
| open                    | boolean                                                                                           | Open (Controlled)                                                         |
| placeholder             | ReactNode `('Select')`                                                                            | Placeholder                                                               |
| placement               | [Placement](#code-ts-placement-code)`('bottomStart')`                                             | Expand placement                                                          |
| renderExtraFooter       | () => ReactNode                                                                                   | Customizing footer Content                                                |
| renderTreeIcon          | (item: [ItemDataType][item]) => ReactNode                                                         | Custom render icon                                                        |
| renderTreeNode          | (item: [ItemDataType][item]) => ReactNode                                                         | Custom render tree Node                                                   |
| renderValue             | (value: string,item:[ItemDataType][item], selectedElement:ReactNode) => ReactNode                 | Custom render selected value                                              |
| searchBy                | (keyword: string, label: ReactNode, item: [ItemDataType][item]) => boolean                        | Custom search rules                                                       |
| searchable              | boolean `(true)`                                                                                  | Set whether you can search                                                |
| size                    | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                                 | A picker can have different sizes                                         |
| toggleAs                | ElementType `('a')`                                                                               | You can use a custom element for this component                           |
| value                   | string                                                                                            | Selected value                                                            |
| valueKey                | string `('value')`                                                                                | Tree data Structure Value property name                                   |
| virtualized             | boolean                                                                                           | Whether using Virtualized List                                            |
| caretAs                 | ElementType                                                                                       | Custom component for the caret icon                                       |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement.md)}-->
<!--{include:(_common/types/list-props.md)}-->

## Related components

- [`<CheckTreePicker>`](/components/check-tree-picker) Selector component, which supports a Checkbox on the Treepicker node for multiple selections.
- [`<Tree>`](/components/tree) Used to show a tree-structured data.
- [`<CheckTree>`](/components/check-tree) Used to show a tree-structured data while supporting Checkbox selection.

[listprops]: #code-ts-list-props-code
[item]: #code-ts-item-data-type-code
