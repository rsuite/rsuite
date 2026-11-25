# Box

Box component is the base component for all components, providing shorthand for style properties.

## Import

<!--{include:<import-guide>}-->

## Usage

<!--{include:`usage.md`}-->

## Examples

### Color and Background

<!--{include:`background.md`}-->

### Border and Rounded

<!--{include:`border.md`}-->

### Shadow

<!--{include:`shadow.md`}-->

## Responsive

Box component supports responsive values for all shorthand CSS properties. This allows you to define different styles for different breakpoints.

```jsx
<Box
  w={{ xs: '100%', md: '80%', lg: '60%' }}
  p={{ xs: '10px', md: '20px' }}
  display={{ xs: 'block', md: 'flex' }}
>
  This box has responsive width, padding and display
</Box>
```

<!--{include:<example-responsive>}-->

## Props

### `<Box>`

| Property  | Type`(default)`            | Description                                                         |
| --------- | -------------------------- | ------------------------------------------------------------------- |
| as        | ElementType `('div')`      | Custom element type for the component                               |
| children  | ReactNode                  | The content of the component                                        |
| className | string                     | Additional CSS class                                                |
| display   | CSSProperties['display']   | CSS display property                                                |
| hideFrom  | [Breakpoints][breakpoints] | Breakpoint above which the component is hidden with `display: none` |
| showFrom  | [Breakpoints][breakpoints] | Breakpoint below which the component is hidden with `display: none` |
| style     | CSSProperties              | Inline style                                                        |

### `Style Props`

The Box component provides a series of shorthand properties for more concise style settings. These properties directly map to their corresponding CSS properties.

See the [Style Props](/guide/style-props) documentation for a complete reference of style properties.

- **Theme Values**: Provided theme presets, such as `<Box bg='blue.600' />`, `<Box rounded='lg' />`, etc.
- **Responsive Values**: Provided responsive values, such as `<Box w={{ xs: '100%', md: '80%', lg: '60%' }} />`, etc.
- **CSS Native Properties**: Provided CSS native properties, such as `<Box aspectRatio='9/16' />`, `<Box borderRadius='6px' />`, etc.

### Type Definitions

<!--{include:(_common/types/breakpoints.md)}-->

[breakpoints]: #code-ts-breakpoints-code
