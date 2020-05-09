# CheckTree

`<CheckTree>` is used to display a tree structure data and supports Checkbox selection.

## Usage

```js
import { CheckTree } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<CheckTree>`

| Property                | Type `(Default)`                                                                                        | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| cascade                 | boolean `(true)`                                                                                        | Whether cascade select                                                    |
| childKey                | string `('children')`                                                                                   | Set childrenKey key in data                                               |
| data \*                 | Array&lt;[DataItemType](#types)&gt;                                                                     | Tree data                                                                 |
| defaultExpandAll        | boolean                                                                                                 | Expand all tree node                                                      |
| defaultValue            | string[]                                                                                                | Default values of the selected tree node                                  |
| defaultExpandItemValues | any []                                                                                                  | Set the value of the default expanded node                                |
| disabledItemValues      | string[]                                                                                                | Values of disabled tree node                                              |
| expandItemValues        | any []                                                                                                  | Set the value of the expanded node (controlled)                           |
| height                  | number `(360px)`                                                                                        | height of menu. When `virtualize` is true, you can set the height of menu |
| labelKey                | string `('label')`                                                                                      | Set label key in data                                                     |
| onChange                | (values:string[]) => void                                                                               | Callback fired when value change                                          |
| onExpand                | (expandItemValues: any [], activeNode:[DataItemType](#types), concat:(data, children) => Array) => void | callback fired when tree node expand state changed                        |
| onSelect                | (activeNode:string, value:any, event) => void                                                           | Callback fired when tree node is selected                                 |
| renderTreeIcon          | (nodeData:[DataItemType](#types)) => React.Node                                                         | Custom render the icon in tree node                                       |
| renderTreeNode          | (nodeData:[DataItemType](#types)) => React.Node                                                         | Custom render tree node                                                   |
| searchKeyword           | string                                                                                                  | searchKeyword (Controlled)                                                |
| uncheckableItemValues   | string[]                                                                                                | Set the option value for the check box not to be rendered                 |
| value                   | string[]                                                                                                | Specifies the values of the selected tree node (Controlled)               |
| valueKey                | string `('value')`                                                                                      | Set value key in data                                                     |
| virtualized             | boolean `(false)`                                                                                       | Whether using Virtualized List                                            |

## Related components

- [`<Tree>`](./tree)
- [`<TreePicker>`](./tree-picker)
- [`<CheckTreePicker>`](./check-tree-picker)
