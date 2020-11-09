# Cascader

Single selection of data with hierarchical relationship structure.

## Import

<!--{include:(components/cascader/fragments/import.md)}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Block

<!--{include:`block.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Parent selectable

<!--{include:`parent-selectable.md`}-->

### Custom options

<!--{include:`custom.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Async Data

This tree allows the use of the `getChildren` option and the length of the children field on the node to be 0 to load children asynchronously.

<!--{include:`async.md`}-->

### Contorlled

<!--{include:`controlled.md`}-->

### Container and prevent overflow

<!--{include:`container.md`}-->

### Inline

<!--{include:`inline.md`}-->

## Accessibility

Learn more in [Accessibility](../guide/accessibility).

## Props

<!--{include:(_common/types/data-item-type.md)}-->

```ts
type Placement = 'bottomStart' | 'topStart' | 'autoVerticalStart';
```

### `<Cascader>`

| Property           | Type`(Default)`                                                                       | Description                                                      |
| ------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| appearance         | enum: 'default' &#124; 'subtle' `('default')`                                         | Set picker appearence                                            |
| block              | boolean                                                                               | Blocking an entire row                                           |
| childrenKey        | string `('children')`                                                                 | Set children key in data                                         |
| classPrefix        | string `('picker')`                                                                   | The prefix of the component CSS class                            |
| cleanable          | boolean `(true)`                                                                      | Whether the selected value can be cleared                        |
| container          | HTMLElement &#124; (() => HTMLElement)                                                | Sets the rendering container                                     |
| data \*            | DataItemType[]                                                                        | The data of component                                            |
| defaultValue       | string                                                                                | Default values of the selected items                             |
| disabled           | boolean                                                                               | Disabled component                                               |
| disabledItemValues | string[]                                                                              | Disabled items                                                   |
| getChildren        | (node: ItemDataType) => Promise&lt;ItemDataType[]&gt;                                 | Asynchronously load the children of the tree node.               |
| height             | number `(320)`                                                                        | The height of Dropdown                                           |
| inline             | boolean                                                                               | The menu is displayed directly when the component is initialized |
| labelKey           | string `('label')`                                                                    | Set label key in data                                            |
| menuHeight         | number                                                                                | Sets the height of the menu                                      |
| menuWidth          | number                                                                                | Sets the width of the menu                                       |
| onChange           | (value:string, event) => void                                                         | Callback fired when value change                                 |
| onClean            | (event) => void                                                                       | Callback fired when value clean                                  |
| onClose            | () => void                                                                            | Callback fired when close component                              |
| onEnter            | () => void                                                                            | Callback fired before the overlay transitions in                 |
| onEntered          | () => void                                                                            | Callback fired after the overlay finishes transitioning in       |
| onEntering         | () => void                                                                            | Callback fired as the overlay begins to transition in            |
| onExit             | () => void                                                                            | Callback fired right before the overlay transitions out          |
| onExited           | () => void                                                                            | Callback fired after the overlay finishes transitioning out      |
| onExiting          | () => void                                                                            | Callback fired as the overlay begins to transition out           |
| onOpen             | () => void                                                                            | Callback fired when open component                               |
| onSearch           | (searchKeyword:string, event) => void                                                 | callback function for Search                                     |
| onSelect           | (item:DataItemType, selectedPaths: DataItemType[], event) => void                     | Callback fired when item is selected                             |
| open               | boolean                                                                               | Whether open the component                                       |
| parentSelectable   | boolean                                                                               | Make parent node selectable                                      |
| placeholder        | ReactNode `('Select')`                                                                | Setting placeholders                                             |
| placement          | PlacementStart `('bottomStart')`                                                      | The placement of component                                       |
| preventOverflow    | boolean                                                                               | Prevent floating element overflow                                |
| renderExtraFooter  | () => ReactNode                                                                       | custom render extra footer                                       |
| renderMenu         | (items: ItemDataType[], menu: ReactNode, parentNode?: ItemDataType) => ReactNode      | Customizing the Rendering Menu list                              |
| renderMenuItem     | (label: ReactNode,item: DataItemType) => ReactNode                                    | Custom render menu items                                         |
| renderValue        | (value: string, selectedPaths:DataItemType[], selectedElement:ReactNode) => ReactNode | Custom render selected items                                     |
| searchable         | boolean `(true)`                                                                      | Whether you can search for options.                              |
| size               | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                 | A picker can have different sizes                                |
| toggleAs           | ElementType `('a')`                                                                   | You can use a custom element for this component                  |
| value              | string                                                                                | Specifies the values of the selected items(Controlled)           |
| valueKey           | string `('value')`                                                                    | Set value key in data                                            |
