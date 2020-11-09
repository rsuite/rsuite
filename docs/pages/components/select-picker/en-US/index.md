# SelectPicker

For a single data selection, support grouping.

## Import

<!--{include:(components/select-picker/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Block

<!--{include:`block.md`}-->

### Group

<!--{include:`group.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Custom Option

<!--{include:`custom.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Disable Search

<!--{include:`searchable.md`}-->

### Async

<!--{include:`async.md`}-->

### Container and prevent overflow

<!--{include:`container.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

## Accessibility

Learn more in [Accessibility](../guide/accessibility).

## Props

<!--{include:(_common/types/data-item-type.md)}-->
<!--{include:(_common/types/placement.md)}-->

```ts
type ValueType = string | number;
```

### `<SelectPicker>`

| Property           | Type `(Default)`                                                             | Description                                                 |
| ------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------- |
| appearance         | enum: 'default' &#124; 'subtle' `('default')`                                | Set picker appearence                                       |
| block              | boolean                                                                      | Blocking an entire row                                      |
| classPrefix        | string `('picker')`                                                          | The prefix of the component CSS class                       |
| cleanable          | boolean `(true)`                                                             | Whether the option can be emptied.                          |
| container          | HTMLElement &#124; (() => HTMLElement)                                       | Sets the rendering container                                |
| data \*            | DataItemType[]                                                               | Selectable data                                             |
| defaultValue       | ValueType                                                                    | Default value                                               |
| disabled           | boolean                                                                      | Whether or not component is disabled                        |
| disabledItemValues | ValueType[]                                                                  | Disable optional                                            |
| groupBy            | string                                                                       | Set grouping criteria 'key' in 'data'                       |
| labelKey           | string `('label')`                                                           | Set options to display the 'key' in 'data'                  |
| listProps          | [ListProps][listprops]                                                       | List-related properties in `react-virtualized`              |
| maxHeight          | number `(320)`                                                               | Set the max height of the Dropdown                          |
| menuClassName      | string                                                                       | A css class to apply to the Menu DOM node.                  |
| menuStyle          | CSSProperties                                                                | A style to apply to the Menu DOM node.                      |
| onChange           | (value:ValueType, event) => void                                             | callback function when value changes                        |
| onClean            | (event) => void                                                              | Callback fired when value clean                             |
| onClose            | () => void                                                                   | Close callback functions                                    |
| onEnter            | () => void                                                                   | Callback fired before the overlay transitions in            |
| onEntered          | () => void                                                                   | Callback fired after the overlay finishes transitioning in  |
| onEntering         | () => void                                                                   | Callback fired as the overlay begins to transition in       |
| onExit             | () => void                                                                   | Callback fired right before the overlay transitions out     |
| onExited           | () => void                                                                   | Callback fired after the overlay finishes transitioning out |
| onExiting          | () => void                                                                   | Callback fired as the overlay begins to transition out      |
| onGroupTitleClick  | (event) => void                                                              | Click the callback function for the group header            |
| onOpen             | () => void                                                                   | Open callback function                                      |
| onSearch           | (searchKeyword:string, event) => void                                        | callback function for Search                                |
| onSelect           | (value:ValueType, item:DataItemType, event) => void                          | option is clicked after the selected callback function      |
| placeholder        | ReactNode `('Select')`                                                       | Setting placeholders                                        |
| placement          | Placement`('bottomStart')`                                                   | The placement of component                                  |
| preventOverflow    | boolean                                                                      | Prevent floating element overflow                           |
| renderExtraFooter  | () => ReactNode                                                              | custom render extra footer                                  |
| renderMenu         | (menu:ReactNode) => ReactNode                                                | Customizing the Rendering Menu list                         |
| renderMenuGroup    | (groupTitle:ReactNode, item:DataItemType) => ReactNode                       | Custom Render Options Group                                 |
| renderMenuItem     | (label:ReactNode, item:DataItemType) => ReactNode                            | Custom Render Options                                       |
| renderValue        | (value:ValueType, item:DataItemType, selectedElement:ReactNode) => ReactNode | Custom Render selected options                              |
| searchBy           | (keyword:string, label:ReactNode, item: ItemDataType) => boolean             | Custom search rules                                         |
| searchable         | boolean `(true)`                                                             | Whether you can search for options.                         |
| size               | enum: 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                      | A picker can have different sizes                           |
| sort               | (isGroup: boolean) => (a: any, b: any) => number                             | Sort options                                                |
| toggleAs           | ElementType `('a')`                                                          | You can use a custom element for this component             |
| value              | ValueType                                                                    | Value (Controlled)                                          |
| valueKey           | string `('value')`                                                           | Set option value 'key' in 'data'                            |
| virtualized        | boolean `(true)`                                                             | Whether using Virtualized List                              |

[listprops]: https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
