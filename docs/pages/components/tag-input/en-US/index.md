# TagInput

The enhancement of Input supports input tags and management tags.

## Import

<!--{include:<import-guide>}-->

## Examples

### Basic

<!--{include:`basic.md`}-->

### Size

<!--{include:`size.md`}-->

### Block

<!--{include:`block.md`}-->

### Tag trigger

Sets the trigger for creating a tag. Options include: `Enter`, `Space`, `Comma`. and the default value `Enter`. Multiple trigger values can be set.

<!--{include:`trigger.md`}-->

### Disabled and read only

<!--{include:`disabled.md`}-->

## Accessibility

Learn more in [Accessibility](/guide/accessibility).

## Props

### `<TagInput>`

| Property     | Type`(Default)`                                              | Description                                             |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------- |
| defaultValue | string[]                                                     | Default values of the selected items                    |
| disabled     | boolean                                                      | Whether disabled component                              |
| onChange     | (value:string[], event) => void                              | Callback fired when value change                        |
| onClean      | (event) => void                                              | Callback fired when value clean                         |
| onTagRemove  | (value: string, event: MouseEvent) => void                   | Callback fired when tag remove                          |
| size         | 'lg' &#124; 'md' &#124; 'sm' &#124; 'xs' `('md')`            | A picker can have different sizes                       |
| trigger      | 'Enter' &#124; 'Space' &#124; 'Comma' `(['Enter', 'Space'])` | Set the trigger for creating tags                       |
| value        | string[]                                                     | Specifies the values of the selected items (Controlled) |
