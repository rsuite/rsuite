# Stack

Quickly layout components through Flexbox, support vertical and horizontal stacking, support custom spacing and wrap.

## Import

<!--{include:<import-guide>}-->

- `Stack` Use to stack elements horizontally or vertically.
- `HStack` Use to stack elements horizontally. ![][5.65.0]
- `VStack` Use to stack elements vertically. ![][5.65.0]

## Examples

### Horizontal

<!--{include:`horizontal.md`}-->

### Vertical

<!--{include:`vertical.md`}-->

### Dividers

<!--{include:`divider.md`}-->

### Spacing

<!--{include:`space.md`}-->

### Wrap

<!--{include:`wrap.md`}-->

### Interactive

<!--{include:`interactive.md`}-->

### Adjust Single Item

<!--{include:`adjust-single-item.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

## Props

### `<Stack>`

| Property           | Type`(default)`                                                             | Description                                                                                       |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| alignItems         | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline'           | Define the alignment of the children in the stack on the cross axis                               |
| as                 | React.ElementType                                                           | Custom component for the root element                                                             |
| childrenRenderMode | 'clone' \| 'wrap'                                                           | The render mode of the children                                                                   |
| classPrefix        | string `('stack')`                                                          | The prefix of the component CSS class                                                             |
| direction          | 'row' \| 'row-reverse' \| 'column' \| 'column-reverse'                      | The direction of the children in the stack                                                        |
| divider            | ReactNode                                                                   | Add an element between each child                                                                 |
| justifyContent     | 'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' | Define the alignment of the children in the stack on the inline axis                              |
| spacing            | number \| string                                                            | Define the spacing between immediate children                                                     |
| wrap               | boolean                                                                     | Define whether the children in the stack are forced onto one line or can wrap onto multiple lines |

### `<Stack.Item>`

| Property  | Type`(default)`                                                   | Description                                                                          |
| --------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| alignSelf | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline' | Define the alignment of the Item in the stack                                        |
| basis     | string                                                            | Define the initial main size of the item                                             |
| flex      | string \| number                                                  | Define the item will grow or shrink to fit the space available in its flex container |
| grow      | string \| number                                                  | Define the item grow factor of a flex item main size                                 |
| order     | number                                                            | Define the order of the item in the stack                                            |
| shrink    | number                                                            | Define the item shrink factor of a flex item                                         |

### `<HStack>`

| Property           | Type`(default)`                                                             | Description                                                                                       |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| alignItems         | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline'           | Define the alignment of the children in the stack on the cross axis                               |
| childrenRenderMode | 'clone' \| 'wrap' `('clone')`                                               | The render mode of the children.                                                                  |
| classPrefix        | string `('stack')`                                                          | The prefix of the component CSS class                                                             |
| divider            | ReactNode                                                                   | Add an element between each child                                                                 |
| justifyContent     | 'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' | Define the alignment of the children in the stack on the inline axis                              |
| reverse            | boolean                                                                     | Reverse the order of the children in the stack                                                    |
| spacing            | number \| string `(6)`                                                      | Define the spacing between immediate children                                                     |
| wrap               | boolean                                                                     | Define whether the children in the stack are forced onto one line or can wrap onto multiple lines |

### `<VStack>`

| Property           | Type`(default)`                                                                    | Description                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| alignItems         | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline' `('flex-start')` | Define the alignment of the children in the stack on the cross axis                               |
| childrenRenderMode | 'clone' \| 'wrap' `('clone')`                                                      | The render mode of the children.                                                                  |
| classPrefix        | string `('stack')`                                                                 | The prefix of the component CSS class                                                             |
| divider            | ReactNode                                                                          | Add an element between each child                                                                 |
| justifyContent     | 'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around'        | Define the alignment of the children in the stack on the inline axis                              |
| reverse            | boolean                                                                            | Reverse the order of the children in the stack                                                    |
| spacing            | number \| string `(6)`                                                             | Define the spacing between immediate children                                                     |
| wrap               | boolean                                                                            | Define whether the children in the stack are forced onto one line or can wrap onto multiple lines |

[5.65.0]: https://img.shields.io/badge/>=-v5.65.0-blue
