# Stack

Quickly layout components through Flexbox, support vertical and horizontal stacking, support custom spacing and wrap.

## Import

<!--{include:(components/stack/fragments/import.md)}-->

## Examples

### Default

 <!--{include:`basic.md`}-->

### Dividers

 <!--{include:`divider.md`}-->

### Wrap

 <!--{include:`wrap.md`}-->

### Interactive

 <!--{include:`interactive.md`}-->

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
