# Stack

Quickly layout components through Flexbox, support vertical and horizontal stacking, support custom spacing and wrap.

## Import

<!--{include:(components/stack/fragments/import.md)}-->

## Examples

### Basic

 <!--{include:`basic.md`}-->

### Dividers

 <!--{include:`divider.md`}-->

### Space

 <!--{include:`space.md`}-->

### Wrap

 <!--{include:`wrap.md`}-->

### Interactive

 <!--{include:`interactive.md`}-->

### Adjust Single Item

 <!--{include:`adjust-single-item.md`}-->

## Props

### `<Stack>`

| Property       | Type`(default)`                                                                             | Description                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| alignItems     | 'flex-start' &#124; 'center' &#124; 'flex-end' &#124; 'stretch' &#124; 'baseline'           | Define the alignment of the children in the stack on the cross axis                               |
| classPrefix    | string `('stack')`                                                                          | The prefix of the component CSS class                                                             |
| direction      | 'row' &#124; 'row-reverse' &#124; 'column' &#124; 'column-reverse'                          | The direction of the children in the stack                                                        |
| divider        | ReactNode                                                                                   | Add an element between each child                                                                 |
| justifyContent | 'flex-start' &#124; 'center' &#124; 'flex-end' &#124; 'space-between' &#124; 'space-around' | Define the alignment of the children in the stack on the inline axis                              |
| spacing        | number &#124; string                                                                        | Define the spacing between immediate children                                                     |
| wrap           | boolean                                                                                     | Define whether the children in the stack are forced onto one line or can wrap onto multiple lines |

### `<Stack.Item>`

| Property  | Type`(default)`                                                                   | Description                                                                          |
| --------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| alignSelf | 'flex-start' &#124; 'center' &#124; 'flex-end' &#124; 'stretch' &#124; 'baseline' | Define the alignment of the Item in the stack                                        |
| flex      | string &#124; number                                                              | Define the item will grow or shrink to fit the space available in its flex container |
| grow      | string &#124; number                                                              | Define the item grow factor of a flex item main size                                 |
| shrink    | number                                                                            | Define the item shrink factor of a flex item                                         |
| basis     | string                                                                            | Define the initial main size of the item                                             |
| order     | number                                                                            | Define the order of the item in the stack                                            |
