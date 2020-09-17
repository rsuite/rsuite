# TreePicker

`<TreePicker>` Selector component, tree single selector.

## Usage

```js
import { TreePicker } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<TreePicker>`

| Property                | Type `(Default)`                                                                                        | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| appearance              | enum: 'default', 'subtle' `('default')`                                                                 | Set picker appearence                                                     |
| block                   | boolean                                                                                                 | Blocking an entire row                                                    |
| childrenKey             | string `('children')`                                                                                   | Tree data structure Children property name                                |
| classPrefix             | string`('picker')`                                                                                      | The prefix of the component CSS class                                     |
| cleanable               | boolean `(true)`                                                                                        | Set whether you can clear                                                 |
| container               | HTMLElement or (() => HTMLElement)                                                                      | Sets the rendering container                                              |
| data \*                 | Array&lt;[DataItemType](#types)&gt;                                                                     | Tree data                                                                 |
| defaultExpandAll        | boolean                                                                                                 | Expand all nodes By default                                               |
| defaultExpandItemValues | any []                                                                                                  | Set the value of the default expanded node                                |
| defaultOpen             | boolean                                                                                                 | Open by default                                                           |
| defaultValue            | string                                                                                                  | Default selected Value                                                    |
| disabled                | boolean                                                                                                 | Whether to disable Picker                                                 |
| disabledItemValues      | string[]                                                                                                | Disable item by value                                                     |
| expandItemValues        | any []                                                                                                  | Set the value of the expanded node (controlled)                           |
| height                  | number `(360px)`                                                                                        | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                                      | Tree data structure Label property name                                   |
| menuClassName           | string                                                                                                  | A css class to apply to the Menu DOM node                                 |
| menuStyle               | React.CSSProperties                                                                                     | style for Menu                                                            |
| onChange                | (value:string) => void                                                                                  | Callback function for data change                                         |
| onClean                 | (event:SyntheticEvent) => void                                                                          | Callback fired when value clean                                           |
| onClose                 | () => void                                                                                              | Close Dropdown callback functions                                         |
| onEnter                 | () => void                                                                                              | Callback fired before the overlay transitions in                          |
| onEntered               | () => void                                                                                              | Callback fired after the overlay finishes transitioning in                |
| onEntering              | () => void                                                                                              | Callback fired as the overlay begins to transition in                     |
| onExit                  | () => void                                                                                              | Callback fired right before the overlay transitions out                   |
| onExited                | () => void                                                                                              | Callback fired after the overlay finishes transitioning out               |
| onExiting               | () => void                                                                                              | Callback fired as the overlay begins to transition out                    |
| onExpand                | (expandItemValues: any [], activeNode:[DataItemType](#types), concat:(data, children) => Array) => void | Callback When tree node is displayed                                      |
| onOpen                  | () => void                                                                                              | Open Dropdown callback function                                           |
| onSearch                | (searchKeyword:string, event) => void                                                                   | Search callback function                                                  |
| onSelect                | (activeNode:[DataItemType](#types), value:any, event) => void                                           | Callback function after selecting tree node                               |
| open                    | boolean                                                                                                 | Open (Controlled)                                                         |
| placeholder             | React.Node `('Select')`                                                                                 | Placeholder                                                               |
| placement               | enum: [Placement](#types)`('bottomStart')`                                                              | Expand placement                                                          |
| renderExtraFooter       | () => React.Node                                                                                        | Customizing footer Content                                                |
| renderTreeIcon          | (nodeData:[DataItemType](#types)) => React.Node                                                         | Custom render icon                                                        |
| renderTreeNode          | (nodeData:[DataItemType](#types)) => React.Node                                                         | Custom render tree Node                                                   |
| renderValue             | (value:string,item:[DataItemType](#types), selectedElement:React.Node) => React.Node                    | Custom render selected value                                              |
| searchBy                | (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean                                | Custom search rules                                                       |
| searchable              | boolean `(true)`                                                                                        | Set whether you can search                                                |
| size                    | enum: 'lg', 'md', 'sm', 'xs' `('md')`                                                                   | A picker can have different sizes                                         |
| toggleComponentClass    | React.ElementType `('a')`                                                                               | You can use a custom element for this component                           |
| value                   | string                                                                                                  | Selected value                                                            |
| valueKey                | string `('value')`                                                                                      | Tree data Structure Value property name                                   |
| virtualized             | boolean `(false)`                                                                                       | Whether using Virtualized List                                            |

## Related components

- [`<CheckTreePicker>`](./check-tree-picker) Selector component, which supports a Checkbox on the Treepicker node for multiple selections.
- [`<Tree>`](./tree) Used to show a tree-structured data.
- [`<CheckTree>`](./check-tree) Used to show a tree-structured data while supporting Checkbox selection.
