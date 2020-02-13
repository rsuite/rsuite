# AutoComplete

Autocomplete function of input field.

## Usage

```js
import { AutoComplete } from 'rsuite';
```

## Examples

<!--{demo}-->

## Props

### `<AutoComplete>`

| Property      | Type`(Default)`                                          | Description                                                                      |
| ------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| classPrefix   | string `('auto-complete')`                               | The prefix of the component CSS class                                            |
| data \*       | string[], Array&lt;[DataItemType](#types)&gt; | The data of component                                                            |
| defaultValue  | string                                                   | Default value                                                                    |
| disabled      | boolean                                                  | Whether disabled select                                                          |
| onChange      | (value:string, event)=>void                              | Called when select an option or input value change, or value of input is changed |
| onClose       | ()=>void                                                 | Callback fired when hidden                                                       |
| onSelect      | (item: DataItemType, event)=>void                        | Called when a option is selected.                                                |
| placeholder   | React.Node                                               | The placeholder of input                                                         |
| renderItem    | (label:React.Node, item: DataItemType)=>React.Node       | Custom selected option                                                           |
| selectOnEnter | boolean `(true)`                                         | When set to `false`, the Enter key selection function is invalid                 |
| value         | string                                                   | Value (Controlled)                                                               |
