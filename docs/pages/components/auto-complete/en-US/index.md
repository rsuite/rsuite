# AutoComplete

Autocomplete function of input field.

## Import

<!--{include:(components/auto-complete/fragments/import.md)}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Autocomplete suffix

<!--{include:`email.md`}-->

### Custom Render Item

<!--{include:`render-item.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Combined with InputGroup

<!--{include:`input-group.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

## Props

### `<AutoComplete>`

| Property       | Type`(Default)`                                                                    | Description                                                                                 |
| -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| classPrefix    | string `('auto-complete')`                                                         | The prefix of the component CSS class                                                       |
| data \*        | [ItemDataType](#code-ts-item-data-type-code)[] &#124; string[]                     | The data of component                                                                       |
| defaultValue   | string                                                                             | Default value                                                                               |
| disabled       | boolean                                                                            | Whether disabled select                                                                     |
| filterBy       | (value: string, item: [ItemDataType](#code-ts-item-data-type-code)) => boolean     | Custom filter rules (will only display items that value is a substring of which by default) |
| menuClassName  | string                                                                             | A css class to apply to the Menu DOM                                                        |
| onChange       | (value:string, event) => void                                                      | Called when select an option or input value change, or value of input is changed            |
| onClose        | () => void                                                                         | Callback fired when hidden                                                                  |
| onEnter        | () => void                                                                         | Callback fired before the overlay transitions in                                            |
| onEntered      | () => void                                                                         | Callback fired after the overlay finishes transitioning in                                  |
| onEntering     | () => void                                                                         | Callback fired as the overlay begins to transition in                                       |
| onExit         | () => void                                                                         | Callback fired right before the overlay transitions out                                     |
| onExited       | () => void                                                                         | Callback fired after the overlay finishes transitioning out                                 |
| onExiting      | () => void                                                                         | Callback fired as the overlay begins to transition out                                      |
| onSelect       | (item: [ItemDataType](#code-ts-item-data-type-code), event) => void                | Called when a option is selected.                                                           |
| placeholder    | ReactNode                                                                          | The placeholder of input                                                                    |
| renderMenu     | (menu:ReactNode) => ReactNode                                                      | Customizing the Rendering Menu list                                                         |
| renderMenuItem | (label:ReactNode, item: [ItemDataType](#code-ts-item-data-type-code)) => ReactNode | Custom render menu items                                                                    |
| selectOnEnter  | boolean `(true)`                                                                   | When set to `false`, the Enter key selection function is invalid                            |
| value          | string                                                                             | Value (Controlled)                                                                          |

<!--{include:(_common/types/item-data-type.md)}-->
