# Cascader

Single selection of data with hierarchical relationship structure.

- `<Cascader>`

## Usage

```js
import { Cascader } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<Cascader>`

| Property             | Type`(Default)`                                                                             | Description                                                      |
| -------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| appearance           | enum: 'default', 'subtle' `('default')`                                                     | Set picker appearence                                            |
| block                | boolean                                                                                     | Blocking an entire row                                           |
| childrenKey          | string `('children')`                                                                       | Set children key in data                                         |
| classPrefix          | string `('picker')`                                                                         | The prefix of the component CSS class                            |
| cleanable            | boolean `(true)`                                                                            | Whether the selected value can be cleared                        |
| container            | HTMLElement or (() => HTMLElement)                                                          | Sets the rendering container                                     |
| data \*              | Array&lt;[DataItemType](#types)&gt;                                                         | The data of component                                            |
| defaultOpen          | boolean                                                                                     | Default value of open property                                   |
| defaultValue         | string                                                                                      | Default values of the selected items                             |
| disabled             | boolean                                                                                     | Disabled component                                               |
| disabledItemValues   | string[]                                                                                    | Disabled items                                                   |
| height               | number `(320)`                                                                              | The height of Dropdown                                           |
| inline               | boolean                                                                                     | The menu is displayed directly when the component is initialized |
| labelKey             | string `('label')`                                                                          | Set label key in data                                            |
| menuHeight           | number                                                                                      | Sets the height of the menu                                      |
| menuWidth            | number                                                                                      | Sets the width of the menu                                       |
| onChange             | (value:string, event) => void                                                               | Callback fired when value change                                 |
| onClean              | (event:SyntheticEvent) => void                                                              | Callback fired when value clean                                  |
| onClose              | () => void                                                                                  | Callback fired when close component                              |
| onEnter              | () => void                                                                                  | Callback fired before the overlay transitions in                 |
| onEntered            | () => void                                                                                  | Callback fired after the overlay finishes transitioning in       |
| onEntering           | () => void                                                                                  | Callback fired as the overlay begins to transition in            |
| onExit               | () => void                                                                                  | Callback fired right before the overlay transitions out          |
| onExited             | () => void                                                                                  | Callback fired after the overlay finishes transitioning out      |
| onExiting            | () => void                                                                                  | Callback fired as the overlay begins to transition out           |
| onGroupTitleClick    | (event) => void                                                                             | Callback fired when click the group title                        |
| onOpen               | () => void                                                                                  | Callback fired when open component                               |
| onSearch             | (searchKeyword:string, event) => void                                                       | callback function for Search                                     |
| onSelect             | (item:[DataItemType](#types), activePaths: Array, concat:(data, children) => Array) => void | Callback fired when item is selected                             |
| open                 | boolean                                                                                     | Whether open the component                                       |
| placeholder          | React.Node `('Select')`                                                                     | Setting placeholders                                             |
| placement            | enum: [PlacementStart](#types)`('bottomStart')`                                             | The placement of component                                       |
| preventOverflow      | boolean                                                                                     | Prevent floating element overflow                                |
| renderExtraFooter    | () => React.Node                                                                            | custom render extra footer                                       |
| renderMenu           | (children: object[], menu:React.Node, parentNode?: object) => React.Node                    | Customizing the Rendering Menu list                              |
| renderMenuItem       | (label:React.Node, item: [DataItemType](#types)) => React.Node                              | Custom render menu items                                         |
| renderValue          | (value: string, itemPaths:Array, selectedElement:React.Node) => React.Node                  | Custom render selected items                                     |
| searchable           | boolean `(true)`                                                                            | Whether you can search for options.                              |
| size                 | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                       | A picker can have different sizes                                |
| toggleComponentClass | React.ElementType `('a')`                                                                   | You can use a custom element for this component                  |
| value                | string                                                                                      | Specifies the values of the selected items(Controlled)           |
| valueKey             | string `('value')`                                                                          | Set value key in data                                            |
| parentSelectable     | boolean                                                                                     | Make parent node selectable                                      |
