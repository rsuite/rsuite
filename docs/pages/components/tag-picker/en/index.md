# TagPicker

Multi-select by tag and support new options

- `<TagPicker>`

## Usage

```js
import { TagPicker } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<TagPicker>`

| Property             | Type`(Default)`                                                       | Description                                             |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------------------- |
| cacheData            | Array&lt;[DataItemType](#types)&gt;                                   | Option to cache `value` when searching asynchronously   |
| classPrefix          | string `('picker')`                                                   | The prefix of the component CSS class                   |
| cleanable            | boolean `(true)`                                                      | Whether the selected value can be cleared               |
| container            | HTMLElement or (() => HTMLElement)                                    | Sets the rendering container                            |
| creatable            | boolean `(true)`                                                      | Settings can create new options                         |
| data \*              | Array&lt;DataItemType&gt;                                             | The data of component                                   |
| defaultValue         | any                                                                   | Default values of the selected items                    |
| disabled             | boolean                                                               | Whether disabled componet                               |
| disabledItemValues   | string[]                                                              | Disable item by value                                   |
| groupBy              | string                                                                | Set group condition key in data                         |
| labelKey             | string `('label')`                                                    | Set label key in data                                   |
| menuClassName        | string                                                                | A css class to apply to the Menu DOM node.              |
| menuStyle            | React.CSSProperties                                                   | A style to apply to the Menu DOM node.                  |
| maxHeight            | number `(320)`                                                        | The max height of Dropdown                              |
| onChange             | (value:string, event)=>void                                           | Callback fired when value change                        |
| onClose              | ()=>void                                                              | Callback fired when close component                     |
| onClean              | (event:SyntheticEvent)=>void                                          | Callback fired when value clean                         |
| onGroupTitleClick    | (event)=>void                                                         | Callback fired when click the group title               |
| onOpen               | ()=>void                                                              | Callback fired when open component                      |
| onSearch             | (searchKeyword:string, event)=>void                                   | Callback fired when search                              |
| onSelect             | (value:string, item: [DataItemType](#types) , event)=>void            | Callback fired when item is selected                    |
| placeholder          | React.Node `('Select')`                                               | Setting placeholders                                    |
| placement            | enum: [Placement](#types)`('bottomStart')`                            | The placement of component                              |
| preventOverflow      | boolean                                                               | Prevent floating element overflow                       |
| renderExtraFooter    | ()=>React.Node                                                        | Custom render extra footer                              |
| renderMenuGroup      | (groupTitle:React.Node, item:[DataItemType](#types))=>React.Node      | Custom render menu group                                |
| renderMenuItem       | (label:React.Node, item: [DataItemType](#types))=>React.Node          | Custom render menu items                                |
| renderValue          | (value: any[], items: any[],selectedElement:React.Node) => React.Node | Custom render selected items                            |
| searchable           | boolean `(true)`                                                      | Whether dispaly search input box                        |
| sort                 | (isGroup: boolean) => (a: any, b: any) => number                      | Sort options                                            |
| size                 | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                 | A picker can have different sizes                       |
| toggleComponentClass | React.ElementType `('a')`                                             | You can use a custom element for this component         |
| value                | any                                                                   | Specifies the values of the selected items (Controlled) |
| valueKey             | string `('value')`                                                    | Set value key in data                                   |
| virtualized          | boolean `(true)`                                                      | Whether using Virtualized List                          |
