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

### Align Self

<!--{include:`align-self.md`}-->

### Grow

<!--{include:`grow.md`}-->

## Responsive

<!--{include:<example-responsive>}-->

## Props

### `<Stack>`

| Property    | Type`(default)`                                                 | Description                                                                                       |
| ----------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| align       | [ResponsiveCSSProperty<'alignItems'>][rcp]                     | Define the alignment of the children in the stack on the cross axis                               |
| as          | React.ElementType                                               | Custom component for the root element                                                             |
| classPrefix | string `('stack')`                                              | The prefix of the component CSS class                                                             |
| direction   | [ResponsiveCSSProperty<'flexDirection'>][rcp]                   | The direction of the children in the stack, support responsive value                              |
| divider     | ReactNode                                                       | Add an element between each child                                                                 |
| justify     | [ResponsiveCSSProperty<'justifyContent'>][rcp]                  | Define the alignment of the children in the stack on the inline axis                              |
| spacing     | [ResponsiveCSSProperty<'gap'>][rcp]                             | Define the spacing between immediate children                                                     |
| wrap        | boolean                                                         | Define whether the children in the stack are forced onto one line or can wrap onto multiple lines |

### `<HStack>`

| Property    | Type`(default)`                                | Description                                                                                       |
| ----------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| align       | [ResponsiveCSSProperty<'alignItems'>][rcp] `('flex-start')` | Define the alignment of the children in the stack on the cross axis                |
| classPrefix | string `('stack')`                             | The prefix of the component CSS class                                                             |
| divider     | ReactNode                                      | Add an element between each child                                                                 |
| justify     | [ResponsiveCSSProperty<'justifyContent'>][rcp] | Define the alignment of the children in the stack on the inline axis                              |
| reverse     | boolean                                        | Reverse the order of the children in the stack                                                    |
| spacing     | [ResponsiveCSSProperty<'gap'>][rcp]            | Define the spacing between immediate children                                                     |
| wrap        | boolean                                        | Define whether the children in the stack are forced onto one line or can wrap onto multiple lines |

### `<VStack>`

| Property    | Type`(default)`                                | Description                                                                                       |
| ----------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| align       | [ResponsiveCSSProperty<'alignItems'>][rcp] `('flex-start')` | Define the alignment of the children in the stack on the cross axis                |
| classPrefix | string `('stack')`                             | The prefix of the component CSS class                                                             |
| divider     | ReactNode                                      | Add an element between each child                                                                 |
| justify     | [ResponsiveCSSProperty<'justifyContent'>][rcp] | Define the alignment of the children in the stack on the inline axis                              |
| reverse     | boolean                                        | Reverse the order of the children in the stack                                                    |
| spacing     | [ResponsiveCSSProperty<'gap'>][rcp]            | Define the spacing between immediate children                                                     |
| wrap        | boolean                                        | Define whether the children in the stack are forced onto one line or can wrap onto multiple lines |

### `<Stack.Item>`

| Property | Type`(default)`                           | Description                                                                          |
| -------- | ----------------------------------------- | ------------------------------------------------------------------------------------ |
| self     | [ResponsiveCSSProperty<'alignSelf'>][rcp] | Define the alignment of the Item in the stack                                        |
| basis    | [ResponsiveCSSProperty<'flexBasis'>][rcp] | Define the initial main size of the item                                             |
| flex     | [ResponsiveCSSProperty<'flex'>][rcp]      | Define the item will grow or shrink to fit the space available in its flex container |
| grow     | [ResponsiveCSSProperty<'flexGrow'>][rcp]  | Define the item grow factor of a flex item main size                                 |
| order    | [ResponsiveCSSProperty<'order'>][rcp]     | Define the order of the item in the stack                                            |
| shrink   | [ResponsiveCSSProperty<'flexShrink'>][rcp]| Define the item shrink factor of a flex item                                         |

### Type Definitions

<!--{include:(_common/types/responsive-css-property.md)}-->

[rcp]: #code-ts-responsive-css-property-code
