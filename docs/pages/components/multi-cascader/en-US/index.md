# MultiCascader

The `MultiCascader` component is used to select multiple values from cascading options.

## Import

<!--{include:<import-guide>}-->

## Examples

### Default

<!--{include:`basic.md`}-->

### Appearance

<!--{include:`appearance.md`}-->

### Size

<!--{include:`size.md`}-->

### Cascade

<!--{include:`cascade.md`}-->

### Default value

<!--{include:`default-value.md`}-->

### Controlled

<!--{include:`controlled.md`}-->

### Block

<!--{include:`block.md`}-->

### Placement

<!--{include:`placement.md`}-->

> Tip: When set to `auto*`, try to scroll the page, or change the browser size, it will automatically appear in the right place.

### Custom options

<!--{include:`custom.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

### Uncheckable

<!--{include:`uncheckable.md`}-->

### Async

<!--{include:`async.md`}-->

### Container and prevent overflow

<!--{include:`container.md`}-->

## Accessibility

### ARIA properties

- MultiCascader has role `combobox`.
- Has the `aria-haspopup="tree"` attribute to indicate that the combobox has a popup tree.
- Has the `aria-expanded` attribute to indicate whether the tree is open or not.
- Has the `aria-controls` attribute to indicate the ID of the tree element.
- Has the `aria-activedescendant` attribute to indicate the ID of the focused tree node.
- When `label` is set, the `aria-labelledby` attribute is added to the combobox element and the tree element and is set to the value of the `id` attribute of `label`.
- The tree has the `aria-multiselectable=true` attribute to indicate that the tree is multi-selectable.

### Keyboard interactions

- <kbd>↓</kbd> - Move focus to the next tree node.
- <kbd>↑</kbd> - Move focus to the previous tree node.
- <kbd>→</kbd> - Expand the focused tree node if it is collapsed.
- <kbd>←</kbd> - Collapse the focused tree node if it is expanded.
- <kbd>Enter</kbd> - Select the focused tree node.
- <kbd>Esc</kbd> - Close the tree.

## Props

### `<MultiCascader>`

<!-- prettier-sort-markdown-table -->

| Property              | Type`(Default)`                                                                             | Description                                                      |
| --------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| appearance            | 'default' &#124; 'subtle' `('default')`                                                     | Set picker appearence                                            |
| block                 | boolean                                                                                     | Blocking an entire row                                           |
| caretAs               | ElementType                                                                                 | Custom component for the caret icon                              |
| cascade               | boolean `(true)`                                                                            | whether cascade select                                           |
| childrenKey           | string `('children')`                                                                       | Set children key in data                                         |
| classPrefix           | string `('picker')`                                                                         | The prefix of the component CSS class                            |
| cleanable             | boolean `(true)`                                                                            | Whether the selected value can be cleared                        |
| container             | HTMLElement &#124; (() => HTMLElement)                                                      | Sets the rendering container                                     |
| countable             | boolean `(true)`                                                                            | Can count selected options                                       |
| data \*               | [ItemDataType][item][]                                                                      | The data of component                                            |
| defaultOpen           | boolean                                                                                     | Default value of open property                                   |
| defaultValue          | string[]                                                                                      | Default values of the selected items                             |
| disabled              | boolean                                                                                     | Disabled component                                               |
| disabledItemValues    | string                                                                                      | Disabled items                                                   |
| height                | number `(320)`                                                                              | The height of Dropdown                                           |
| inline                | boolean                                                                                     | The menu is displayed directly when the component is initialized |
| ~inline~              | boolean                                                                                     | ⚠️`[Deprecated]` Use the `<MultiCascadeTree>` component instead  |
| labelKey              | string `('label')`                                                                          | Set label key in data                                            |
| loading               | boolean `(false)`                                                                           | Whether to display a loading state indicator                     |
| locale                | [PickerLocaleType](/guide/i18n/#pickers)                                                    | Locale text                                                      |
| ~menuClassName~       | string                                                                                      | ⚠️`[Deprecated]` Use `popupClassName` instead                    |
| ~menuHeight~          | number                                                                                      | ⚠️`[Deprecated]` Use `columnHeight` instead                      |
| ~menuStyle~           | CSSProperties                                                                               | ⚠️`[Deprecated]` Use `popupStyle` instead                        |
| ~menuWidth~           | number                                                                                      | ⚠️`[Deprecated]` Use `columnWidth` instead                       |
| onChange              | (value: string, event) => void                                                              | Callback fired when value change                                 |
| onCheck               | (value: string, item: [ItemDataType][item], checked: boolean, event) => void;               | Called after the checkbox state changes                          |
| onClean               | (event) => void                                                                             | Callback fired when value clean                                  |
| onClose               | () => void                                                                                  | Callback fired when close component                              |
| onEnter               | () => void                                                                                  | Callback fired before the overlay transitions in                 |
| onEntered             | () => void                                                                                  | Callback fired after the overlay finishes transitioning in       |
| onEntering            | () => void                                                                                  | Callback fired as the overlay begins to transition in            |
| onExit                | () => void                                                                                  | Callback fired right before the overlay transitions out          |
| onExited              | () => void                                                                                  | Callback fired after the overlay finishes transitioning out      |
| onExiting             | () => void                                                                                  | Callback fired as the overlay begins to transition out           |
| onOpen                | () => void                                                                                  | Callback fired when open component                               |
| onSearch              | (searchKeyword:string, event) => void                                                       | callback function for Search                                     |
| onSelect              | (item: [ItemDataType][item], selectedPaths: [ItemDataType][item][], event) => void          | Callback fired when item is selected                             |
| open                  | boolean                                                                                     | Whether open the component                                       |
| placeholder           | ReactNode `('Select')`                                                                      | Setting placeholders                                             |
| placement             | [Placement](#code-ts-placement-code)`('bottomStart')`                                       | The placement of component                                       |
| popupClassName        | string                                                                                      | Custom class name for the popup                                  |
| popupStyle            | CSSProperties                                                                               | Custom style for the popup                                       |
| preventOverflow       | boolean                                                                                     | Prevent floating element overflow                                |
| ~rendeMenu~           | (node: ReactNode, column: { items, parentItem, layer}) => ReactNode                         | ⚠️`[Deprecated]` Use `renderColumn` instead                      |
| renderColumn          | (childNodes: ReactNode, column: { items, parentItem, layer}) => ReactNode                   | Customizing the Rendering Menu list                              |
| renderExtraFooter     | () => ReactNode                                                                             | custom render extra footer                                       |
| ~renderMenu~          | (children: object[], menu:ReactNode, parentNode?: object, layer?: number) => ReactNode      | ⚠️`[Deprecated]` Use `renderColumn` instead                      |
| ~renderMenuItem~      | (label:ReactNode, item: [ItemDataType][item]) => ReactNode                                  | ⚠️`[Deprecated]` Use `renderTreeNode` instead                    |
| ~renderMenuItem~      | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                                  | ⚠️`[Deprecated]` Use `renderTreeNode` instead                    |
| renderTreeNode        | (node: ReactNode, item: [ItemDataType][item]) => ReactNode                                  | Custom render menu items                                         |
| renderValue           | (value:string,selectedItems: [ItemDataType][item][],selectedElement:ReactNode) => ReactNode | Custom render selected items                                     |
| searchable            | boolean `(true)`                                                                            | Whether you can search for options.                              |
| size                  | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`                                           | A picker can have different sizes                                |
| toggleAs              | ElementType `('a')`                                                                         | You can use a custom element for this component                  |
| uncheckableItemValues | string                                                                                      | Set the option value for the check box not to be rendered        |
| value                 | string[]                                                                                      | Specifies the values of the selected items(Controlled)           |
| valueKey              | string `('value')`                                                                          | Set value key in data                                            |

<!--{include:(_common/types/item-data-type.md)}-->
<!--{include:(_common/types/placement-start.md)}-->

\

[item]: #code-ts-item-data-type-code
[value]: #code-ts-value-type-code
