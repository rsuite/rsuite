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

Extends the [`Box`][boxprops] component.

| Property    | Type`(default)`                               | Description                                               |
| ----------- | --------------------------------------------- | --------------------------------------------------------- |
| as          | React.ElementType                              | Custom component for the root element                     |
| classPrefix | string `('stack')`                            | The prefix of the component CSS class                     |
| direction   | [ResponsiveCSSProperty<'flexDirection'>][rcp] | The direction of the children in the stack                |
| divider     | ReactNode                                     | Add an element between each child                         |
| wrap        | boolean                                       | Define whether the children are forced onto a single line |

### `<HStack>`

Extends the `Stack` component.

| Property | Type`(default)`                                   | Description                          |
| -------- | ------------------------------------------------- | ------------------------------------- |
| align    | [ResponsiveCSSProperty<'alignItems'>][rcp] `('center')` | Align items on the cross axis |
| reverse  | boolean                                           | Reverse the order of children        |

### `<VStack>`

Extends the `Stack` component.

| Property | Type`(default)`                                   | Description                          |
| -------- | ------------------------------------------------- | ------------------------------------- |
| align    | [ResponsiveCSSProperty<'alignItems'>][rcp] `('flex-start')` | Align items on the cross axis |
| divider  | ReactNode                                        | Add an element between each child    |
| reverse  | boolean                                           | Reverse the order of children        |

### `<Stack.Item>`

Extends the [`Box`][boxprops] component.

### Type Definitions

<!--{include:(_common/types/responsive-css-property.md)}-->

[rcp]: #code-ts-responsive-css-property-code
[boxprops]: /components/box/#props
