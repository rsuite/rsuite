# Stack

A stack of children defines the flexible layout and spacing.

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

| Property       | Type`(default)`                                                                | Description                                                                                       |
| -------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| alignItems     | enum : 'flex-start' , 'center' , 'flex-end' , 'stretch' , 'baseline'           | Define the alignment of the children in the stack on the cross axis                               |
| classPrefix    | string `('stack')`                                                             | The prefix of the component CSS class                                                             |
| direction      | enum : 'row' , 'row-reverse' , 'column' , 'column-reverse'                     | The direction of the children in the stack                                                        |
| divider        | ReactNode                                                                      | Add an element between each child                                                                 |
| justifyContent | enum : 'flex-start' , 'center' , 'flex-end' , 'space-between' , 'space-around' | Define the alignment of the children in the stack on the inline axis                              |
| spacing        | number ,number[]                                                               | Define the spacing between immediate children                                                     |
| wrap           | boolean                                                                        | Define whether the children in the stack are forced onto one line or can wrap onto multiple lines |
